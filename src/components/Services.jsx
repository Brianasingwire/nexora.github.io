function ServiceRow({ title, status, available, description, items }) {
  return (
    <div className={`grid md:grid-cols-[1fr_2fr] gap-6 py-8 border-t border-ink/25 ${available ? '' : 'opacity-80'}`}>
      <div>
        <h3 className="font-display text-xl font-semibold mb-1">{title}</h3>
        <p className={`text-sm ${available ? 'text-signal' : 'text-slate'}`}>{status}</p>
      </div>
      <div>
        <p className="text-ink/85 mb-3 max-w-lg">{description}</p>
        {items && (
          <ul className="text-sm text-ink/80 space-y-1">
            {items.map(it => <li key={it}>— {it}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-xl mb-6">
        <h2 className="font-display text-3xl font-semibold mb-3">What We Do</h2>
        <p className="text-ink/85">
          We're an IT solutions company built to grow with you — starting with AI automation, expanding into the infrastructure and web presence you'll need next.
        </p>
      </div>
      <ServiceRow
        title="AI Automation"
        status="Available now"
        available={true}
        description="We design and build automated systems that handle lead capture, scoring, follow-up sequencing, and CRM integration — end to end. If it's a repeatable manual process, we can likely automate it."
        items={['Lead capture & scoring systems', 'Automated follow-up sequences (email / WhatsApp / SMS)', 'CRM & Google Workspace integration', 'Custom chatbots (WhatsApp, web)', 'Document & data processing automation']}
      />
      <ServiceRow
        title="Cloud Computing"
        status="Coming soon"
        available={false}
        description="Infrastructure setup, migration, and management to keep your systems reliable and scalable as you grow."
      />
      <ServiceRow
        title="Web Design"
        status="Coming soon"
        available={false}
        description="Clean, fast, conversion-focused websites — built to work seamlessly with the automation systems we design."
      />
    </section>
  );
}
