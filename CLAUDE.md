# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A five-page marketing site for Nexora (AI automation / IT solutions), deployed to GitHub Pages from
`https://github.com/Brianasingwire/nexora.github.io`. React 18 + Vite + Tailwind CSS v4.

## Commands

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
```

There is **no test suite and no linter configured**. Don't invent commands for them — verify changes with
`npm run dev` and a browser.

Local Node is v20.11, below Vite 7's floor (20.19+), so Vite is pinned to v6. Bumping to Vite 7 requires
upgrading Node first.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/` to Pages. This depends on the
repo's **Settings → Pages → Source** being set to "GitHub Actions"; if the site goes stale after a push,
check that setting before debugging the build.

This is a *project* site, not a user site (the owner is `Brianasingwire`, so a user site would need a repo
named `brianasingwire.github.io`). It is therefore served from `/nexora.github.io/`, which is why
`vite.config.js` sets `base`. Moving to a custom domain means changing `base` to `'/'`.

## Architecture

**This is a multi-page app, not an SPA — there is no router.** Each page is a separate HTML entry
declared in `vite.config.js` under `build.rollupOptions.input`, and Vite emits a separate bundle per
page sharing a common vendor chunk:

| Entry | Mounts | URL |
|---|---|---|
| `index.html` | `src/main.jsx` → `App.jsx` | `/` |
| `services/index.html` | `src/services-main.jsx` → `Page` + `Services` | `/services/` |
| `work/index.html` | `src/work-main.jsx` → `Page` + `Work` | `/work/` |
| `about/index.html` | `src/about-main.jsx` → `Page` + `About` | `/about/` |
| `contact/index.html` | `src/contact-main.jsx` → `Page` + `Contact` | `/contact/` |

That choice is deliberate: GitHub Pages serves static files, so real pages give working deep links and
refreshes with no 404 fallback shim, and the contact page doesn't ship the home page's code. Adding a page
means a new HTML shell, an `src/<name>-main.jsx` entry, and a line in `rollupOptions.input` — not a
route table. Every page except home wraps its content in `src/Page.jsx` (nav + main + footer + theme);
home composes its own sections because it has many.

Each HTML shell is thin: meta tags, Google Fonts, the pre-paint theme script, `#root`, and the module
entry. Page components live in `src/`, section components in `src/components/`. Sections are
self-contained: their copy and data live as literals inside their own file.

**All inter-page links come from `src/links.js`**, which builds hrefs from `import.meta.env.BASE_URL`.
Never hand-write a bare `#section` href in a component — it would break when followed from `/contact/`,
and it would break again if `base` changes. `section(id)` resolves to a same-document scroll on the home page
and a navigation-plus-scroll from anywhere else. `#top` is the only home-page anchor left — Services,
Work, About and Contact are all their own pages.

The pre-paint theme script lives in `src/theme-init.js` and is injected into every page's `<head>` by the
`inject-theme-script` plugin in `vite.config.js`. It cannot be bundled — it has to run before first paint,
before the module scripts — so it is read as raw text and inlined. Don't paste copies into the HTML
shells; edit that one file.

### Theming and palette (the part that's easy to break)

The design system is taken from a reference design, **Pulseflow**: its saved page supplied the
composition, spacing, type scale and component patterns, and its source stylesheet supplied the exact
values. Both reference files were deleted once their contents were captured here and in `src/index.css`,
so this section is now the record of what was taken.

Values, all verbatim from the Pulseflow stylesheet and kept in oklch as that file required:

- `--ink` `oklch(0.2177 0.0356 251.2935)` (≈ `#0D1B2A`) — a **deep navy**, not a green-black. Page ground
  and every dark section. White text sits on it.
- `--pine` `oklch(0.3484 0.0547 163.3594)` (≈ `#1B4332`) — the band behind Problem, and glow orbs.
- `--mint` `oklch(0.778 0.1454 169.7485)` (≈ `#2DD4A8`) — primary buttons (ink text), eyebrows, accents
  on ink.
- `--mintbright` `oklch(0.9041 0.1584 158.6761)` (≈ `#73FFB8`) — hovers, the hero pill, highlighted rows.
- Fonts: **Sora** (`--font-display`) and **Manrope** (`--font-body`), loaded from Google Fonts in each HTML
  shell.
- Radius: one base, `--radius: 0.625rem`, with `rounded-md` … `rounded-3xl` derived from it in `@theme`.
- `animate-aurora-drift`: an 11s horizontal sway (±40px) with a breathing opacity. Pulseflow applies it to
  the small logo and "live" dots, and so does this site — which means those dots travel sideways past
  their labels. That is faithful to the reference; revisit if it reads as a bug.

Tokens live under `:root` / `.dark` in `src/index.css` and are mapped into Tailwind's `@theme` —
**the codebase deliberately uses no dark-variant classes**. Opacity modifiers resolve through `color-mix`,
so the variables must hold complete color values.

- `--surface` / `--on-surface` — the light sections (Process, the CTA wrapper, Services). This is the only
  thing the theme toggle flips: white with ink text in light mode, a raised navy surface in dark mode. The
  dark surface (`oklch(0.275 …)`, ink's hue and chroma a step lighter) is **derived** — Pulseflow has no dark
  theme to take it from. The `.dark` block overrides nothing else.
- `--accent-on-surface` — accent text on light surfaces. Pine in light mode, mint in dark mode.

Composition rule: **dark sections are always ink** (hero, Work, About, Contact, the CTA panel, nav,
footer); **light sections use `surface`**. Don't use literal `bg-white` / `text-ink` for a light section —
it will not respond to the theme toggle.

Deliberate deviations from Pulseflow, all for contrast:

- Pulseflow sets small mint text on white: 1.89:1. Accent text on light surfaces uses
  `accent-on-surface` (pine, 11.08:1) instead.
- Pulseflow uses `white/35`–`white/40` for fine print on ink (3.20–3.78:1) and `ink/55` for card body on
  white (3.91:1). The floor here is `white/55` on ink and `on-surface/70` on surfaces.
- Pulseflow's stats band and stat cards show metrics (throughput, team size). Nexora has no real figures,
  so those slots carry the problem statement and facts instead. Don't fill them with invented numbers.

Every text pairing clears WCAG AA in both themes; the lowest is `white/55` on ink at 6.00:1.
`scratchpad/pulse.mjs` (regenerate if missing) converts the oklch values and measures every pairing. Run it
after any palette change.

The Pulseflow stylesheet also defined a full set of UI-library tokens (`background`, `primary`, `sidebar`, `chart-*`…).
Pulseflow's page never uses them, so they were not carried over.

`.dark` and `:root` have equal specificity and both match `<html>`, so `.dark` must stay *after* `:root` in
`index.css` to win.

Tailwind v4 scans markdown as well as source, so utility class names written in docs get compiled into the
stylesheet. `@source not "../*.md"` in `index.css` suppresses that.

Dark mode is applied from two places, and both are needed:
1. `src/theme-init.js`, injected into every page's `<head>` before first paint, reads
   `localStorage['nexora-theme']` (falling back to `prefers-color-scheme`) and sets the class.
2. `useTheme` toggles the class and writes `localStorage` when the user clicks the toggle. It seeds its
   state by *reading the class off the DOM*, so step 1 is the source of truth on load.

## Secrets and pushing

Every push is gated by a secret scan. **Before any `git push`, run the `security-reviewer` agent**
(`.claude/agents/security-reviewer.md`) and only push on a **SAFE TO PUSH** verdict, or after the owner
has confirmed any items it marks as needing confirmation.

- `.githooks/pre-push` runs `scripts/scan-secrets.mjs` and blocks the push on any finding. It scans the
  patch of *every commit being pushed*, not the net diff, so a secret added and then deleted within the
  push is still caught. `npm install` enables it via the `prepare` script (`core.hooksPath`).
- The scanner is deterministic regex matching — no model, no network — because it is the blocking gate.
  The agent layers judgment on top: real key vs. placeholder, publishable vs. secret, and what Vite bakes
  into the bundle. The agent runs the scanner itself as its first step.
- Manual scans: `npm run scan:secrets` (tracked tree), or
  `node scripts/scan-secrets.mjs range origin/main..HEAD` / `dir dist`.
- **Never use `git push --no-verify`.** That bypass exists for the owner to use on a false positive they
  have personally verified. Silence a confirmed false positive with a `secret-scan:allow` comment on that
  line instead, so the exception is visible in review.
- The scanner redacts matched values in its output. Keep it that way — findings get pasted into chat and
  CI logs.

Why this matters more here than usual: the site is static and the repo is almost certainly public, so
there is nowhere private to put a credential. Anything in `src/` is served to every visitor, any
`VITE_*` variable is inlined into `dist/` at build time, and anything committed is published even if later
deleted. `.env` and `.env.*` are gitignored; `.env.example` is allowed.

Keys designed to be public are fine in client code — relevant when wiring the contact form. Web3Forms
access keys, Formspree form IDs, Turnstile *site* keys, and Stripe `pk_` keys are safe. Their secret
counterparts are not.

## Placeholders to be aware of

The `EDIT GUIDE` comment at the top of `index.html` lists what's still stubbed. Currently unresolved:

- `hello@nexora.io` is a placeholder address.
- "Book a Free Audit" buttons point at the `/contact/` page. Swapping to Calendly is a one-line change
  to `contact` in `src/links.js`.
- The contact form still has **no backend** — `handleSubmit` in `Contact.jsx` only calls
  `setSubmitted(true)` locally. Wiring a form service goes in that function.
- Case studies are marked with `{/* CASE STUDY n */}` comments in `Work.jsx` and need real client details.
