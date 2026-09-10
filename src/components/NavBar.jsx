import { useState } from 'react';
import { about, contact, section, services, work } from '../links.js';

const links = [
  { href: services, label: 'Services' },
  { href: work, label: 'Work' },
  { href: about, label: 'About' },
  { href: contact, label: 'Contact' },
];

export default function NavBar({ dark, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-scrim backdrop-blur border-b border-ink/25">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href={section('top')} className="font-display font-bold text-lg tracking-tight">
          Nexora<span className="text-signal">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/90">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button type="button" onClick={onThemeToggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} aria-pressed={dark} className="w-9 h-9 inline-flex items-center justify-center border border-ink/35 rounded-sm hover:bg-ink/10 transition-colors">
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
            )}
          </button>
          <a href={contact} className="text-sm font-medium bg-ink text-paper px-4 py-2 rounded-sm hover:bg-ink/85 transition-colors">
            Book a Free Audit
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-ink/25 bg-scrim backdrop-blur px-6 py-4 flex flex-col gap-4 text-sm">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button type="button" onClick={onThemeToggle} className="text-left text-ink/85">Switch to {dark ? 'light' : 'dark'} mode</button>
          <a href={contact} onClick={() => setOpen(false)} className="font-medium text-signal">Book a Free Audit →</a>
        </div>
      )}
    </header>
  );
}
