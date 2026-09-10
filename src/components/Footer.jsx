import { about, contact, services, work } from '../links.js';

const links = [
  { href: services, label: 'Services' },
  { href: work, label: 'Work' },
  { href: about, label: 'About' },
  { href: contact, label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/25">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-4 text-sm text-ink/80">
        <div>
          <p className="font-display text-ink font-semibold">Nexora</p>
          <p>AI Automation & IT Solutions</p>
        </div>
        <div className="flex gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-ink">{l.label}</a>
          ))}
        </div>
        <p>© 2026 Nexora. All rights reserved.</p>
      </div>
    </footer>
  );
}
