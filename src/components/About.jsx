export default function About() {
  return (
    <section className="bg-ink text-paper flex-1 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-[1fr_2fr] gap-8">
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">Why Nexora</h1>
        <div className="space-y-4 text-paper/85 max-w-xl">
          <p>
            Nexora was founded to help businesses — wherever they are in the world — stop losing time and revenue to manual work. We started with AI automation because it delivers the fastest, most measurable impact, and we're building toward full-spectrum IT solutions: cloud infrastructure and web design included.
          </p>
          <p>
            We work hands-on with every client, building and testing systems incrementally so what you get is reliable, not just impressive in a demo.
          </p>
          <p className="text-signal-soft text-sm">Based in Kampala, Uganda — built for clients anywhere.</p>
        </div>
      </div>
    </section>
  );
}
