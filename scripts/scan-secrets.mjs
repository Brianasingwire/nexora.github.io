#!/usr/bin/env node
// Secret scanner. Deterministic on purpose: this is the gate that blocks pushes,
// so it has to be fast, offline, and give the same answer every time. Judgment
// calls (placeholder vs. real key, publishable vs. secret) belong to the
// security-reviewer agent in .claude/agents/, which runs this first.
//
// Usage:
//   node scripts/scan-secrets.mjs pre-push [remote] [url]   (reads git's pre-push stdin)
//   node scripts/scan-secrets.mjs range <rev-range>          e.g. origin/main..HEAD
//   node scripts/scan-secrets.mjs tree                       all tracked files at HEAD
//   node scripts/scan-secrets.mjs dir <path>                 files on disk, e.g. dist
//
// Exits 1 if anything is found. Matched values are redacted in output so a
// finding never re-leaks the secret into terminal scrollback or CI logs.
// Silence a verified false positive by adding `secret-scan:allow` to that line.

import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ZERO = /^0+$/;

// High: specific, well-known credential formats. Near-zero false-positive rate.
// Medium: shape-based heuristics that need a human (or the agent) to confirm.
const RULES = [
  { id: 'private-key', sev: 'high', re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----/ },
  { id: 'aws-access-key-id', sev: 'high', re: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { id: 'github-token', sev: 'high', re: /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b/ },
  { id: 'google-api-key', sev: 'high', re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { id: 'slack-token', sev: 'high', re: /\bxox[abprs]-[0-9A-Za-z-]{10,}\b/ },
  { id: 'stripe-live-secret', sev: 'high', re: /\b(?:sk|rk)_live_[0-9A-Za-z]{20,}\b/ },
  { id: 'anthropic-api-key', sev: 'high', re: /\bsk-ant-[A-Za-z0-9_-]{20,}/ },
  { id: 'openai-api-key', sev: 'high', re: /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/ },
  { id: 'sendgrid-api-key', sev: 'high', re: /\bSG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}\b/ },
  { id: 'npm-auth-token', sev: 'high', re: /_authToken\s*=\s*[^\s$]{8,}/ },

  // Vite inlines every VITE_* variable into the client bundle, and this site is
  // static — anything in the bundle is served publicly from GitHub Pages.
  { id: 'vite-secret-env', sev: 'high', re: /\bVITE_[A-Z0-9_]*(?:SECRET|PASSWORD|PASSWD|PRIVATE|TOKEN)[A-Z0-9_]*\s*[=:]\s*\S{4,}/ },

  { id: 'generic-assignment', sev: 'medium', placeholderCheck: true,
    re: /[\w.-]*(?:password|passwd|secret|token|api[_-]?key|access[_-]?key|private[_-]?key|client[_-]?secret)[\w.-]*["']?\s*[:=]\s*["'`]([^"'`\s]{8,})["'`]/i },
  { id: 'env-file-assignment', sev: 'medium', placeholderCheck: true,
    re: /^\s*(?:export\s+)?[A-Z0-9_]*(?:PASSWORD|PASSWD|SECRET|TOKEN|API_KEY|APIKEY|ACCESS_KEY|PRIVATE_KEY)[A-Z0-9_]*\s*=\s*([^\s#'"]{8,})/ },
  { id: 'credentials-in-url', sev: 'medium', placeholderCheck: true,
    re: /\b[a-z][a-z0-9+.-]*:\/\/[^\s\/:@'"]+:([^\s\/@'"]{3,})@[^\s'"]+/i },
  { id: 'jwt', sev: 'medium', re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ },
];

// Files whose mere presence in a commit is the problem, regardless of content.
const SENSITIVE_FILES = [
  { id: 'env-file', re: /(?:^|\/)\.env(?:\.(?!example$|sample$|template$)[^/]+)?$/ },
  { id: 'key-file', re: /\.(?:pem|key|p12|pfx|keystore|jks)$/i },
  { id: 'ssh-private-key-file', re: /(?:^|\/)id_(?:rsa|dsa|ecdsa|ed25519)$/ },
  { id: 'cloud-credentials-file', re: /(?:^|\/)(?:credentials\.json|service-account[^/]*\.json|\.git-credentials)$/i },
];

const PLACEHOLDER = /example|sample|placeholder|your[_-]?|x{3,}|changeme|dummy|redacted|<[^>]*>|\$\{|process\.env|import\.meta\.env|\*{3,}|(?:user(?:name)?):(?:pass(?:word)?)@/i;

function redact(value) {
  const v = value.trim();
  return v.length <= 8 ? '[redacted]' : `${v.slice(0, 4)}…[${v.length} chars]`;
}

function scanLine(line, loc, findings) {
  if (line.includes('secret-scan:allow')) return;
  for (const rule of RULES) {
    const m = line.match(rule.re);
    if (!m) continue;
    const value = m[1] ?? m[0];
    if (rule.placeholderCheck && PLACEHOLDER.test(m[0])) continue;
    findings.push({ ...loc, rule: rule.id, sev: rule.sev, match: redact(value) });
  }
}

function checkFileName(path, loc, findings) {
  for (const f of SENSITIVE_FILES) {
    if (f.re.test(path)) findings.push({ ...loc, file: path, rule: f.id, sev: 'high', match: '(file committed)' });
  }
}

function git(args, input) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, input });
}

// Walks every commit's patch rather than the net diff: a secret added in one
// commit and deleted in a later one is still in the history being pushed.
function scanLog(revArgs, findings) {
  const out = git(['log', '-p', '-U0', '--no-color', '--no-ext-diff', '--no-textconv', '--format=%x00commit %H', ...revArgs]);
  let commit = null, file = null, lineNo = 0;
  for (const line of out.split('\n')) {
    if (line.startsWith('\0commit ')) { commit = line.slice(8, 15); file = null; continue; }
    if (line.startsWith('diff --git ')) { file = null; continue; }
    if (line.startsWith('+++ ')) {
      file = line === '+++ /dev/null' ? null : line.replace(/^\+\+\+ b\//, '');
      if (file) checkFileName(file, { commit }, findings);
      continue;
    }
    if (line.startsWith('--- ')) continue;
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) { lineNo = Number(hunk[1]); continue; }
    if (file && line.startsWith('+')) {
      scanLine(line.slice(1), { commit, file, line: lineNo }, findings);
      lineNo++;
    }
  }
}

function scanText(path, text, findings) {
  checkFileName(path, {}, findings);
  if (text.includes('\0')) return; // binary
  text.split('\n').forEach((l, i) => scanLine(l, { file: path, line: i + 1 }, findings));
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function readStdin() {
  try { return readFileSync(0, 'utf8'); } catch { return ''; }
}

const [mode, ...rest] = process.argv.slice(2);
const findings = [];
let scope = '';

switch (mode) {
  case 'pre-push': {
    // git writes: <local ref> <local sha> <remote ref> <remote sha>, one per ref pushed.
    const remote = rest[0];
    for (const entry of readStdin().split('\n').filter(Boolean)) {
      const [, localSha, , remoteSha] = entry.split(' ');
      if (ZERO.test(localSha)) continue; // deleting a remote branch pushes no content
      const revArgs = ZERO.test(remoteSha)
        ? [localSha, '--not', remote ? `--remotes=${remote}` : '--remotes'] // new branch
        : [`${remoteSha}..${localSha}`];
      scanLog(revArgs, findings);
    }
    scope = 'commits being pushed';
    break;
  }
  case 'range':
    if (!rest[0]) { console.error('usage: scan-secrets.mjs range <rev-range>'); process.exit(2); }
    scanLog([rest[0]], findings);
    scope = `commits in ${rest[0]}`;
    break;
  case 'tree':
    for (const path of git(['ls-files', '-z']).split('\0').filter(Boolean)) {
      scanText(path, git(['show', `HEAD:${path}`]), findings);
    }
    scope = 'tracked files at HEAD';
    break;
  case 'dir': {
    const root = rest[0] ?? 'dist';
    for (const p of walk(root)) scanText(relative(process.cwd(), p), readFileSync(p, 'utf8'), findings);
    scope = `files under ${root}/`;
    break;
  }
  default:
    console.error('usage: scan-secrets.mjs <pre-push|range <rev-range>|tree|dir <path>>');
    process.exit(2);
}

if (findings.length === 0) {
  console.log(`secret scan: clean (${scope})`);
  process.exit(0);
}

const order = { high: 0, medium: 1 };
findings.sort((a, b) => order[a.sev] - order[b.sev]);
console.error(`\nsecret scan: ${findings.length} finding(s) in ${scope}\n`);
for (const f of findings) {
  const where = [f.file, f.line].filter(Boolean).join(':');
  const commit = f.commit ? `  (commit ${f.commit})` : '';
  console.error(`  ${f.sev.toUpperCase().padEnd(6)} ${f.rule.padEnd(24)} ${where}${commit}\n         ${f.match}`);
}
console.error(`
If a real secret was committed, ROTATE IT FIRST — removing it from history does
not un-leak a value that already left this machine. Then remove it from the
commits (not just the working tree) before pushing.

Verified false positive: add \`secret-scan:allow\` to that line, or bypass once
with \`git push --no-verify\`.
`);
process.exit(1);
