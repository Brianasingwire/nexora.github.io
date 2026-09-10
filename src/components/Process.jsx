const steps = [
  { n: '01', title: 'Audit', body: "We map your current workflow on a free 30-minute call and identify exactly where automation saves you the most time and money." },
  { n: '02', title: 'Build', body: 'We design and build your custom automation system, testing each component before it touches your live operations.' },
  { n: '03', title: 'Launch & Support', body: 'We deploy, train you or your team on it, and stay on to monitor and refine as your business changes.' },
];

export default function Process() {
  return (
    <section className="border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl font-semibold mb-10">How We Work</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map(s => (
            <div key={s.n}>
              <p className="font-display text-signal text-sm mb-2">{s.n}</p>
              <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
