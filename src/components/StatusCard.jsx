// The hero's pipeline card, in the style of Pulseflow's "pipeline.status" panel.
// It shows Nexora's own lead flow — the Capture → Score → Follow up → Close
// sequence the site sells — as pipeline states rather than metrics, because
// there are no real throughput figures to put here yet.
const stages = [
  { label: 'Capture · web form', state: 'new lead' },
  { label: 'Score · intent', state: 'qualified' },
  { label: 'Follow up · WhatsApp + email', state: 'sent' },
];

export default function StatusCard() {
  return (
    <div className="rounded-2xl border border-mint/15 bg-white/[0.03] p-5 ring-1 ring-white/5 backdrop-blur-xl" aria-label="Example lead pipeline">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs font-medium text-white/70">lead.pipeline</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-mintbright">
          <span className="size-1.5 animate-aurora-drift rounded-full bg-mintbright" aria-hidden="true" />
          live
        </span>
      </div>
      <ol className="mt-5 space-y-4">
        {stages.map(s => (
          <li key={s.label} className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.04] px-3 py-2.5">
            <span className="text-sm text-white/70">{s.label}</span>
            <span className="font-display text-xs text-mint">{s.state}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-4 rounded-lg border border-mint/25 bg-mint/10 px-3 py-2.5">
          <span className="text-sm text-mintbright">Close · call booked</span>
          <span className="font-display text-xs text-mintbright">done</span>
        </li>
      </ol>
    </div>
  );
}
