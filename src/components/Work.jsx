function CaseStudy({ title, problem, solution, result }) {
  return (
    <div className="border-t border-ink/25 py-10 grid md:grid-cols-[1fr_2fr] gap-6">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <div className="space-y-3 text-sm text-ink/85 max-w-2xl">
        <p><span className="text-ink font-medium">The problem: </span>{problem}</p>
        <p><span className="text-ink font-medium">The solution: </span>{solution}</p>
        <p><span className="text-ink font-medium">The result: </span>{result}</p>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4">Real Systems, Real Results</h1>
      <p className="text-ink/85 mb-6 max-w-xl">A few of the systems we've built. More case studies coming as we take on new clients.</p>

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
    </section>
  );
}
