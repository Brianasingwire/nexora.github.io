import { contact } from '../links.js';

// Pulseflow's "The studio" layout. Its stat cards (team size, automations in
// production) have no Nexora equivalent yet, so they carry facts instead of numbers.
export default function About() {
  return (
    <section className="relative flex-1 overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[460px] rounded-full bg-mint/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-10 size-[340px] rounded-full bg-pine/40 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">About</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance text-white lg:text-5xl">Why Nexora</h1>
          <p className="mt-5 max-w-[44ch] text-lg text-pretty text-white/60">
            Nexora was founded to help businesses — wherever they are in the world — stop losing time and revenue to manual work.
          </p>
          <div className="mt-8">
            <a href={contact} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">
              Book a Free Audit →
            </a>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-2xl border border-mint/15 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="font-display font-semibold text-white">Automation first, full IT to follow</div>
            <p className="mt-2 text-sm text-pretty text-white/60">
              We started with AI automation because it delivers the fastest, most measurable impact, and we're building toward full-spectrum IT solutions: cloud infrastructure and web design included.
            </p>
          </div>
          <div className="rounded-2xl border border-mint/15 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="font-display font-semibold text-white">How we build</div>
            <p className="mt-2 text-sm text-pretty text-white/60">
              We work hands-on with every client, building and testing systems incrementally so what you get is reliable, not just impressive in a demo.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-mint/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="font-display text-2xl font-semibold text-mintbright">Kampala</div>
              <p className="mt-1 text-sm text-white/60">Based in Uganda — built for clients anywhere.</p>
            </div>
            <div className="rounded-2xl border border-mint/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="font-display text-2xl font-semibold text-mintbright">AI automation</div>
              <p className="mt-1 text-sm text-white/60">Available now. Cloud and web design coming next.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
