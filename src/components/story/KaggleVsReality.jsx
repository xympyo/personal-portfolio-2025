import { useScrollReveal } from '../../hooks/useScrollReveal';

const fakeCleanRows = [
  ['001', 'Product A', '142.50', 'Electronics', '2024-01-15'],
  ['002', 'Product B', '89.00', 'Apparel', '2024-01-16'],
  ['003', 'Product C', '230.00', 'Home', '2024-01-16'],
  ['004', 'Product D', '55.75', 'Electronics', '2024-01-17'],
];

const chaosFiles = [
  { name: 'Dept A · John · 2023.xlsx', rotate: -4, x: 20, y: 30, color: '#fff' },
  { name: 'Dept A · John · 2024.xlsx', rotate: 3, x: 40, y: 70, color: '#FFF8F4' },
  { name: 'Dept A · Sarah · 2023.xlsx', rotate: -2, x: 15, y: 110, color: '#fff' },
  { name: 'Dept B · Various · Q1.xlsx', rotate: 5, x: 35, y: 150, color: '#FFF8F4' },
  { name: 'Master File FINAL v3 REAL.xlsx', rotate: -6, x: 10, y: 190, color: '#fff' },
  { name: 'Master File FINAL v3 REAL (2).xlsx', rotate: 2, x: 30, y: 228, color: '#FFEFEA' },
];

export default function KaggleVsReality() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-prose mx-auto px-6">
      <div ref={ref} className="grid md:grid-cols-2 gap-6">
      {/* LEFT — Clean Kaggle */}
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: '#22c55e',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 500ms ease-out',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#dcfce7', background: '#f0fdf4' }}>
          <span style={{ color: '#22c55e', fontSize: 16 }}>✓</span>
          <span className="text-xs font-mono font-medium" style={{ color: '#16a34a' }}>Kaggle Dataset</span>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['ID', 'Name', 'Value', 'Category', 'Date'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-xs font-mono" style={{ color: '#9A9A8A' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fakeCleanRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2 text-xs font-mono" style={{ color: '#1A1A1A' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT — Chaos */}
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: '#ef4444',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 500ms ease-out 150ms',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#fee2e2', background: '#fef2f2' }}>
          <span style={{ color: '#ef4444', fontSize: 16 }}>✕</span>
          <span className="text-xs font-mono font-medium" style={{ color: '#dc2626' }}>Factory Reality</span>
        </div>
        <div className="relative p-4" style={{ minHeight: 280 }}>
          {chaosFiles.map((file, i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                left: `${file.x}px`,
                top: `${file.y}px`,
                transform: `rotate(${file.rotate}deg)`,
                width: 'calc(100% - 50px)',
                opacity: isVisible ? 1 : 0,
                transition: `opacity 300ms ease-out ${i * 120 + 400}ms, transform 300ms ease-out ${i * 120 + 400}ms`,
              }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded border text-xs font-mono shadow-sm"
                style={{ background: file.color, borderColor: '#E0DDD8', color: '#1A1A1A' }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <rect x="1" y="1" width="8" height="12" rx="1" stroke="#9A9A8A" strokeWidth="1" />
                  <path d="M3 4h4M3 6.5h4M3 9h2" stroke="#9A9A8A" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: '10px' }}>{file.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
