import PipelineDiagram from './PipelineDiagram.jsx';

export default function Hero() {
  return (
    <section id="top" className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-sm text-slate mb-4">IT Solutions for Growing Businesses</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
          Stop losing leads and hours to manual work.
        </h1>
        <p className="text-lg text-ink/75 mb-8 max-w-md">
          Nexora builds AI-powered automation systems that capture, qualify, and follow up with your leads — so nothing falls through the cracks and your team focuses on closing, not admin.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#contact" className="bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-ink/85 transition-colors">
            Book a Free Automation Audit
          </a>
          <a href="#services" className="text-ink/70 hover:text-ink text-sm underline underline-offset-4">
            See how it works
          </a>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <PipelineDiagram />
      </div>
    </section>
  );
}
