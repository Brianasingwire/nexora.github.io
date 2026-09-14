import { about, contact, home, services, work } from '../links.js';

const links = [
  { href: services, label: 'Services' },
  { href: work, label: 'Work' },
  { href: about, label: 'About' },
  { href: contact, label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-mint/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <a href={home} className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-mint" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-white">Nexora</span>
        </a>
        <p className="text-xs text-white/55">© 2026 Nexora. AI Automation & IT Solutions.</p>
        <div className="flex items-center gap-6 text-xs text-white/60">
          {links.map(l => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-mint">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
