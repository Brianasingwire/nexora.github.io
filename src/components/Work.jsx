function CaseStudy({ title, problem, solution, result }) {
  return (
    <article className="flex flex-col rounded-2xl border border-mint/15 bg-white/[0.04] p-6 backdrop-blur-xl">
      <h2 className="font-display text-lg font-semibold text-balance text-white">{title}</h2>
      <dl className="mt-5 flex flex-1 flex-col gap-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">The problem</dt>
          <dd className="mt-1.5 text-pretty text-white/70">{problem}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">The solution</dt>
          <dd className="mt-1.5 text-pretty text-white/70">{solution}</dd>
        </div>
        <div className="mt-auto rounded-lg border border-mint/25 bg-mint/10 p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-mintbright">The result</dt>
          <dd className="mt-1.5 text-pretty text-mintbright">{result}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function Work() {
  return (
    <section className="relative flex-1 overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -top-40 right-1/4 size-[460px] rounded-full bg-mint/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Work</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance text-white lg:text-5xl">Real Systems, Real Results</h1>
          <p className="mt-5 max-w-[48ch] text-lg text-pretty text-white/60">A few of the systems we've built. More case studies coming as we take on new clients.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* CASE STUDY 1 — rewrite with real client details once confirmed shareable */}
          <CaseStudy
            title="Lead Capture & Sales Follow-Up System"
            problem="A growing IT solutions business had no structured way to capture, score, or follow up with inbound leads — inquiries were tracked manually and often went cold before a reply went out."
            solution="Built an end-to-end automation pipeline: leads submitted via form are automatically scored, assigned a sequential ID, logged into a CRM, and routed into a follow-up sequence — with zero manual data entry."
            result="Leads are now captured, scored, and followed up with automatically within minutes of submission — eliminating lost inquiries and manual tracking work entirely."
          />
          {/* CASE STUDY 2 */}
          <CaseStudy
            title="WhatsApp Customer Automation"
            problem="A business needed to handle incoming customer messages on WhatsApp without hiring a dedicated support team."
            solution="Built a WhatsApp-based automation system using the Meta Cloud API to handle incoming messages, send structured template responses, and route conversations automatically."
            result="Customer messages are now answered instantly, 24/7, without manual intervention."
          />
          {/* CASE STUDY 3 */}
          <CaseStudy
            title="AI-Powered Candidate Screening"
            problem="Manually reviewing every incoming CV/resume was slow and inconsistent."
            solution="Built an automated pipeline that pulls submitted resumes, analyzes them with AI against defined criteria, and outputs structured, comparable candidate summaries."
            result="Screening time cut dramatically, with consistent, structured output for every candidate."
          />
        </div>
      </div>
    </section>
  );
}
