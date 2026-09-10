export default function Footer() {
  return (
    <footer className="border-t border-ink/25">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-4 text-sm text-ink/80">
        <div>
          <p className="font-display text-ink font-semibold">Nexora</p>
          <p>AI Automation & IT Solutions</p>
        </div>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-ink">Services</a>
          <a href="#work" className="hover:text-ink">Work</a>
          <a href="#about" className="hover:text-ink">About</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </div>
        <p>© 2026 Nexora. All rights reserved.</p>
      </div>
    </footer>
  );
}
