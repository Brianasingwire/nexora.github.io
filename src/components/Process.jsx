const steps = [
  { n: '01', title: 'Audit', body: "We map your current workflow on a free 30-minute call and identify exactly where automation saves you the most time and money." },
  { n: '02', title: 'Build', body: 'We design and build your custom automation system, testing each component before it touches your live operations.' },
  { n: '03', title: 'Launch & Support', body: 'We deploy, train you or your team on it, and stay on to monitor and refine as your business changes.' },
];

export default function Process() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-on-surface">Process</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance text-on-surface lg:text-5xl">
            How We Work
          </h2>
        </div>
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map(s => (
            <li key={s.n} className="rounded-2xl bg-surface p-6 ring-1 ring-on-surface/10 transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span className="inline-grid size-10 place-items-center rounded-xl bg-mint/15 font-display text-lg font-semibold text-accent-on-surface">{s.n}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-balance text-on-surface">{s.title}</h3>
              <p className="mt-2 text-sm text-pretty text-on-surface/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
