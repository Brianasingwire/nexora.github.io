import { useState } from 'react';

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
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-10">
        <h2 className="font-display text-3xl font-semibold mb-3">Let's Find What You Can Automate</h2>
        <p className="text-ink/70">
          Book a free 30-minute audit call. We'll look at your current workflow and tell you exactly where automation would save you the most time — no obligation.
        </p>
      </div>

      {submitted ? (
        <div className="border border-signal/40 bg-signal/10 text-ink px-6 py-8 max-w-lg rounded-sm">
          <p className="font-medium mb-1">Thanks — that's in.</p>
          <p className="text-sm text-ink/70">We'll get back to you shortly. In the meantime feel free to email hello@nexora.io directly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name</label>
            <input required id="name" name="name" value={form.name} onChange={handleChange}
              className="w-full border border-ink/20 bg-transparent px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-signal" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input required type="email" id="email" name="email" value={form.email} onChange={handleChange}
              className="w-full border border-ink/20 bg-transparent px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-signal" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="company">Company</label>
            <input id="company" name="company" value={form.company} onChange={handleChange}
              className="w-full border border-ink/20 bg-transparent px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-signal" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="need">What are you looking to automate?</label>
            <textarea id="need" name="need" rows="3" value={form.need} onChange={handleChange}
              className="w-full border border-ink/20 bg-transparent px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-signal" />
          </div>
          <button type="submit" className="bg-ink text-paper px-6 py-3 rounded-sm font-medium hover:bg-ink/85 transition-colors">
            Book My Free Audit
          </button>
          <p className="text-sm text-ink/60 pt-1">
            Prefer email? Reach us directly at <a className="underline" href="mailto:hello@nexora.io">hello@nexora.io</a>
          </p>
        </form>
      )}
    </section>
  );
}
