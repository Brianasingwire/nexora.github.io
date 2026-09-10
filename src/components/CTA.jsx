import { contact } from '../links.js';

// The home page's closing ask. The form itself lives at /contact/ — this is the
// handoff to it, so the page doesn't end on the About section with no next step.
export default function CTA() {
  return (
    <section className="border-t border-ink/25">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl font-semibold mb-3 max-w-xl">
          Let's find what you can automate.
        </h2>
        <p className="text-ink/85 max-w-xl mb-8">
          A free 30-minute call. We'll map your current workflow and tell you exactly where automation would save you the most time — no obligation.
        </p>
        <a href={contact} className="inline-block bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-ink/85 transition-colors">
          Book a Free Automation Audit
        </a>
      </div>
    </section>
  );
}
