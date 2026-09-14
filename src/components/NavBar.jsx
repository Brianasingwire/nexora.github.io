import { useState } from 'react';
import { about, contact, section, services, work } from '../links.js';

const links = [
  { href: services, label: 'Services' },
  { href: work, label: 'Work' },
  { href: about, label: 'About' },
  { href: contact, label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-mint/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={section('top')} className="flex items-center gap-2">
          <span className="size-2.5 shrink-0 animate-aurora-drift rounded-full bg-mint" aria-hidden="true" />
          <span className="font-display text-sm font-semibold tracking-tight text-white">Nexora</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-mint">{l.label}</a>
          ))}
        </nav>
        <a href={contact} className="hidden rounded-md bg-mint px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-mintbright md:inline-block">
          Book a Free Audit
        </a>
        <button type="button" className="text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-mint/10 bg-ink px-6 py-4 text-sm text-white/70 md:hidden">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition-colors hover:text-mint">{l.label}</a>
          ))}
          <a href={contact} onClick={() => setOpen(false)} className="font-semibold text-mint">Book a Free Audit →</a>
        </div>
      )}
    </header>
  );
}
