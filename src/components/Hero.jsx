import StatusCard from './StatusCard.jsx';
import { contact, services } from '../links.js';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[500px] rounded-full bg-mint/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute top-20 right-10 size-[380px] rounded-full bg-pine/40 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-[300px] rounded-full bg-mintbright/5 blur-[90px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-28 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-3 py-1 text-xs font-semibold tracking-wide text-mintbright">
            <span className="size-1.5 rounded-full bg-mintbright" aria-hidden="true" />
            IT Solutions for Growing Businesses
          </span>
          <h1 className="mt-6 max-w-[20ch] font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-balance text-white lg:text-6xl">
            Stop losing leads and hours to manual work.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-pretty text-white/60">
            Nexora builds AI-powered automation systems that capture, qualify, and follow up with your leads — so nothing falls through the cracks and your team focuses on closing, not admin.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={contact} className="inline-flex items-center gap-2 rounded-md bg-mint px-6 py-3 text-sm font-semibold text-ink ring-1 ring-mint/40 transition-colors hover:bg-mintbright">
              Book a Free Automation Audit
              <span aria-hidden="true" className="text-ink/70">→</span>
            </a>
            <a href={services} className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-mint hover:underline">
              See how it works
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <StatusCard />
        </div>
      </div>
    </section>
  );
}
