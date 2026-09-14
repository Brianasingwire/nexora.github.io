import { useState } from 'react';

const field = 'w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white transition-colors focus:border-mint/60 focus:outline-none focus:ring-2 focus:ring-mint/40';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', need: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired yet — this just confirms the form works.
    // Once you have a form service (e.g. Tally, Formspree) or your own endpoint,
    // send `form` there inside this function.
    setSubmitted(true);
  };

  return (
    <section className="relative flex-1 overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -top-32 right-1/4 size-[420px] rounded-full bg-mint/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Contact</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance text-white lg:text-5xl">Let's Find What You Can Automate</h1>
          <p className="mt-5 max-w-[44ch] text-lg text-pretty text-white/60">
            Book a free 30-minute audit call. We'll look at your current workflow and tell you exactly where automation would save you the most time — no obligation.
          </p>
          <p className="mt-6 text-sm text-white/60">
            Prefer email? Reach us directly at <a className="font-semibold text-mint underline-offset-4 hover:underline" href="mailto:hello@nexora.io">hello@nexora.io</a>
          </p>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="rounded-2xl border border-mint/25 bg-mint/10 p-6">
              <p className="font-display font-semibold text-mintbright">Thanks — that's in.</p>
              <p className="mt-2 text-sm text-white/70">We'll get back to you shortly. In the meantime feel free to email hello@nexora.io directly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-mint/15 bg-white/[0.03] p-6 ring-1 ring-white/5 backdrop-blur-xl sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-white/70" htmlFor="name">Name</label>
                  <input required id="name" name="name" value={form.name} onChange={handleChange} className={field} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-white/70" htmlFor="email">Email</label>
                  <input required type="email" id="email" name="email" value={form.email} onChange={handleChange} className={field} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-white/70" htmlFor="company">Company</label>
                <input id="company" name="company" value={form.company} onChange={handleChange} className={field} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-white/70" htmlFor="need">What are you looking to automate?</label>
                <textarea id="need" name="need" rows="4" value={form.need} onChange={handleChange} className={field} />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-mint px-6 py-3 text-sm font-semibold text-ink ring-1 ring-mint/40 transition-colors hover:bg-mintbright">
                Book My Free Audit
                <span aria-hidden="true" className="text-ink/70">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
