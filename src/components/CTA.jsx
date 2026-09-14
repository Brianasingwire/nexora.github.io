import { contact, services } from '../links.js';

// The home page's closing ask. Pulseflow sets an ink panel on a white section;
// with no white sections on this site, the panel is glass on ink instead — a mint
// border and inner glow keep it reading as a distinct object. Follows Process
// (also ink), so it has no top padding of its own.
export default function CTA() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-mint/20 bg-white/[0.03] p-8 ring-1 ring-white/5 sm:p-14">
          <div className="pointer-events-none absolute -top-24 right-0 size-[360px] rounded-full bg-mint/15 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 size-[260px] rounded-full bg-mintbright/10 blur-[90px]" aria-hidden="true" />
          <div className="relative max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Free audit</span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance text-white lg:text-5xl">
              Let's find what you can automate.
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg text-pretty text-white/60">
              A free 30-minute call. We'll map your current workflow and tell you exactly where automation would save you the most time — no obligation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={contact} className="inline-flex items-center justify-center rounded-md bg-mint px-6 py-3 text-center text-sm font-semibold text-ink ring-1 ring-mint/40 transition-colors hover:bg-mintbright">
                Book a Free Automation Audit
              </a>
              <a href={services} className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/[0.06] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/[0.1]">
                Explore services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
