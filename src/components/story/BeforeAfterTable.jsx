import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function BeforeAfterTable({ rows, summary }) {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div ref={ref} className="rounded-lg overflow-hidden border" style={{ borderColor: '#E0DDD8' }}>
      {/* Header */}
      <div className="grid grid-cols-3 px-6 py-3 border-b" style={{ borderColor: '#E0DDD8', background: '#F5F2EE' }}>
        <span className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#9A9A8A' }}>Metric</span>
        <span className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#9A9A8A' }}>Before</span>
        <span className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: '#9A9A8A' }}>After</span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-3 px-6 py-4 border-b"
          style={{
            borderColor: '#E0DDD8',
            background: i % 2 === 0 ? '#ffffff' : '#FAFAF8',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
            transition: `opacity 400ms ease-out ${i * 60}ms, transform 400ms ease-out ${i * 60}ms`,
          }}
        >
          <span className="text-sm font-mono" style={{ color: '#1A1A1A' }}>{row.metric}</span>
          <span className="text-sm" style={{ color: '#9A9A8A' }}>{row.before}</span>
          <span className="text-sm font-medium" style={{ color: '#C8470D' }}>{row.after}</span>
        </div>
      ))}

      {/* Summary */}
      {summary && summary.length > 0 && (
        <div
          className="grid border-t-2 px-6 py-8"
          style={{
            borderColor: '#1A1A1A',
            background: '#1A1A1A',
            gridTemplateColumns: `repeat(${summary.length}, 1fr)`,
            opacity: isVisible ? 1 : 0,
            transition: `opacity 500ms ease-out ${rows.length * 60 + 200}ms`,
          }}
        >
          {summary.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl md:text-6xl font-mono" style={{ color: '#C8470D' }}>{s.number}</p>
              <p className="text-xs font-mono mt-2 uppercase tracking-[0.15em]" style={{ color: '#9A9A8A' }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
