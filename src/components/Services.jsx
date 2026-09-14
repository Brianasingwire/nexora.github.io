function Status({ available, children }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${available ? 'border-mint/20 bg-mint/10 text-mintbright' : 'border-white/10 bg-white/[0.06] text-white/70'}`}>
      {children}
    </span>
  );
}

const upcoming = [
  { title: 'Cloud Computing', description: 'Infrastructure setup, migration, and management to keep your systems reliable and scalable as you grow.' },
  { title: 'Web Design', description: 'Clean, fast, conversion-focused websites — built to work seamlessly with the automation systems we design.' },
];

const automationItems = ['Lead capture & scoring systems', 'Automated follow-up sequences (email / WhatsApp / SMS)', 'CRM & Google Workspace integration', 'Custom chatbots (WhatsApp, web)', 'Document & data processing automation'];

export default function Services() {
  return (
    <section className="relative flex-1 overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[460px] rounded-full bg-mint/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-10 size-[340px] rounded-full bg-pine/40 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Services</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance text-white lg:text-5xl">What We Do</h1>
          <p className="mt-5 max-w-[48ch] text-lg text-pretty text-white/60">
            We're an IT solutions company built to grow with you — starting with AI automation, expanding into the infrastructure and web presence you'll need next.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-mint/30 bg-white/[0.04] p-6 ring-1 ring-white/5 backdrop-blur-xl md:col-span-2 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-white">AI Automation</h2>
              <Status available>Available now</Status>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <p className="text-pretty text-white/70">
                We design and build automated systems that handle lead capture, scoring, follow-up sequencing, and CRM integration — end to end. If it's a repeatable manual process, we can likely automate it.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                {automationItems.map(it => (
                  <li key={it} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {upcoming.map(s => (
            <article key={s.title} className="rounded-2xl border border-mint/15 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-white">{s.title}</h2>
                <Status>Coming soon</Status>
              </div>
              <p className="mt-3 text-sm text-pretty text-white/70">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
