const nodes = [
  { x: 40, y: 60, label: 'Capture' },
  { x: 180, y: 20, label: 'Score' },
  { x: 320, y: 60, label: 'Follow Up' },
  { x: 460, y: 20, label: 'Close' },
];

export default function PipelineDiagram() {
  return (
    <svg viewBox="0 0 500 120" className="w-full max-w-md" role="img" aria-label="Diagram showing lead flow from Capture to Score to Follow Up to Close">
      <line x1="40" y1="60" x2="180" y2="20" stroke="var(--slate)" strokeWidth="1.5" className="pipeline-line" pathLength="1" />
      <line x1="180" y1="20" x2="320" y2="60" stroke="var(--slate)" strokeWidth="1.5" className="pipeline-line" pathLength="1" style={{ animationDelay: '0.7s' }} />
      <line x1="320" y1="60" x2="460" y2="20" stroke="var(--signal)" strokeWidth="1.5" className="pipeline-line" pathLength="1" style={{ animationDelay: '1.1s' }} />
      {nodes.map((n, i) => (
        <g key={n.label} className="pipeline-node" style={{ animationDelay: `${0.2 + i * 0.4}s` }}>
          <circle cx={n.x} cy={n.y} r="7" fill={i === nodes.length - 1 ? 'var(--signal)' : 'var(--ink)'} />
          <text x={n.x} y={n.y - 16} textAnchor="middle" fontSize="12" fontFamily="Inter" fill="var(--ink)">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
