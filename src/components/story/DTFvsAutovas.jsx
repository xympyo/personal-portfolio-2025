import { useScrollReveal } from '../../hooks/useScrollReveal';

// Simple SVG shape paths
function CatHead({ cx, cy, r }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="currentColor" />
      <polygon points={`${cx - r * 0.6},${cy - r * 0.9} ${cx - r * 0.2},${cy - r * 1.5} ${cx + r * 0.1},${cy - r * 0.9}`} fill="currentColor" />
      <polygon points={`${cx + r * 0.2},${cy - r * 0.9} ${cx + r * 0.5},${cy - r * 1.5} ${cx + r * 0.8},${cy - r * 0.9}`} fill="currentColor" />
    </g>
  );
}

function StarShape({ cx, cy, r }) {
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const a1 = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const a2 = ((i + 0.5) * 2 * Math.PI) / 5 - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)}`);
    pts.push(`${cx + r * 0.4 * Math.cos(a2)},${cy + r * 0.4 * Math.sin(a2)}`);
  }
  return <polygon points={pts.join(' ')} fill="currentColor" />;
}

function HeartShape({ cx, cy, size }) {
  const s = size;
  return (
    <path
      d={`M ${cx} ${cy + s * 0.3}
         C ${cx} ${cy - s * 0.1} ${cx - s * 0.5} ${cy - s * 0.6} ${cx - s * 0.5} ${cy - s * 0.15}
         C ${cx - s * 0.5} ${cy + s * 0.2} ${cx} ${cy + s * 0.55} ${cx} ${cy + s * 0.7}
         C ${cx} ${cy + s * 0.55} ${cx + s * 0.5} ${cy + s * 0.2} ${cx + s * 0.5} ${cy - s * 0.15}
         C ${cx + s * 0.5} ${cy - s * 0.6} ${cx} ${cy - s * 0.1} ${cx} ${cy + s * 0.3} Z`}
      fill="currentColor"
    />
  );
}

// Manual layout with visible gaps and bounding boxes
const manualShapes = [
  { type: 'cat', cx: 55, cy: 55, r: 22, bx: 22, by: 22, bw: 66, bh: 66 },
  { type: 'star', cx: 160, cy: 55, r: 22, bx: 127, by: 22, bw: 66, bh: 66 },
  { type: 'heart', cx: 265, cy: 60, size: 28, bx: 232, by: 22, bw: 66, bh: 66 },
  { type: 'cat', cx: 55, cy: 165, r: 22, bx: 22, by: 132, bw: 66, bh: 66 },
  { type: 'heart', cx: 160, cy: 165, size: 28, bx: 127, by: 132, bw: 66, bh: 66 },
  { type: 'star', cx: 265, cy: 165, r: 22, bx: 232, by: 132, bw: 66, bh: 66 },
  { type: 'star', cx: 55, cy: 265, r: 22, bx: 22, by: 232, bw: 66, bh: 66 },
  { type: 'cat', cx: 160, cy: 265, r: 22, bx: 127, by: 232, bw: 66, bh: 66 },
  { type: 'heart', cx: 265, cy: 265, size: 28, bx: 232, by: 232, bw: 66, bh: 66 },
];

// Algorithm-packed layout — same shapes, tighter
const packedShapes = [
  { type: 'cat', cx: 38, cy: 44, r: 20 },
  { type: 'star', cx: 88, cy: 40, r: 18 },
  { type: 'heart', cx: 136, cy: 44, size: 24 },
  { type: 'cat', cx: 186, cy: 42, r: 20 },
  { type: 'star', cx: 234, cy: 40, r: 18 },
  { type: 'heart', cx: 278, cy: 44, size: 22 },
  { type: 'cat', cx: 38, cy: 100, r: 20 },
  { type: 'star', cx: 86, cy: 98, r: 18 },
  { type: 'heart', cx: 134, cy: 100, size: 24 },
  { type: 'cat', cx: 184, cy: 98, r: 20 },
  { type: 'star', cx: 232, cy: 96, r: 18 },
  { type: 'heart', cx: 278, cy: 100, size: 22 },
  { type: 'cat', cx: 38, cy: 156, r: 20 },
  { type: 'star', cx: 86, cy: 154, r: 18 },
  { type: 'heart', cx: 134, cy: 156, size: 24 },
  { type: 'cat', cx: 184, cy: 154, r: 20 },
  { type: 'star', cx: 232, cy: 152, r: 18 },
  { type: 'heart', cx: 278, cy: 156, size: 22 },
  { type: 'cat', cx: 38, cy: 212, r: 20 },
  { type: 'star', cx: 86, cy: 210, r: 18 },
  { type: 'heart', cx: 134, cy: 212, size: 24 },
  { type: 'cat', cx: 184, cy: 210, r: 20 },
  { type: 'star', cx: 232, cy: 208, r: 18 },
  { type: 'heart', cx: 278, cy: 212, size: 22 },
  { type: 'cat', cx: 38, cy: 266, r: 20 },
  { type: 'star', cx: 86, cy: 264, r: 18 },
  { type: 'heart', cx: 134, cy: 266, size: 24 },
  { type: 'cat', cx: 184, cy: 264, r: 20 },
  { type: 'star', cx: 232, cy: 262, r: 18 },
];

function renderShape(s, color) {
  if (s.type === 'cat') return <CatHead key={`${s.cx}-${s.cy}`} cx={s.cx} cy={s.cy} r={s.r} />;
  if (s.type === 'star') return <StarShape key={`${s.cx}-${s.cy}`} cx={s.cx} cy={s.cy} r={s.r} />;
  if (s.type === 'heart') return <HeartShape key={`${s.cx}-${s.cy}`} cx={s.cx} cy={s.cy} size={s.size} />;
  return null;
}

export default function DTFvsAutovas() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div ref={ref} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT — Manual DTF */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            borderColor: '#E0DDD8',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 600ms ease-out',
          }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: '#E0DDD8', background: '#F5F2EE' }}>
            <p className="text-xs font-mono font-medium" style={{ color: '#1A1A1A' }}>DTF Print Layout — Arranged by eye</p>
            <p className="text-xs mt-0.5" style={{ color: '#9A9A8A' }}>Gaps are wasted material</p>
          </div>
          <div style={{ background: '#fafafa', padding: 8 }}>
            <svg width="100%" viewBox="0 0 310 310" style={{ display: 'block' }}>
              {/* Bounding box rectangles */}
              {manualShapes.map((s, i) => (
                <rect
                  key={`bb-${i}`}
                  x={s.bx} y={s.by} width={s.bw} height={s.bh}
                  fill="none"
                  stroke="#9A9A8A"
                  strokeWidth="0.8"
                  strokeDasharray="4,3"
                  opacity={0.6}
                />
              ))}
              {/* Shapes */}
              <g color="#1A1A1A" fill="currentColor" opacity={0.5}>
                {manualShapes.map((s, i) => (
                  <g key={i} style={{
                    opacity: isVisible ? 0.6 : 0,
                    transition: `opacity 300ms ease-out ${i * 60 + 200}ms`,
                  }}>
                    {renderShape(s)}
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* RIGHT — Autovas packed */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            borderColor: '#C8470D',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 600ms ease-out 300ms',
          }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: '#C8470D', background: '#FFF5F2' }}>
            <p className="text-xs font-mono font-medium" style={{ color: '#C8470D' }}>Autovas — Algorithm packed</p>
            <p className="text-xs mt-0.5" style={{ color: '#9A9A8A' }}>Same shapes. Less waste.</p>
          </div>
          <div style={{ background: '#fafafa', padding: 8 }}>
            <svg width="100%" viewBox="0 0 310 310" style={{ display: 'block' }}>
              <g color="#C8470D" fill="currentColor">
                {packedShapes.map((s, i) => (
                  <g key={i} style={{
                    opacity: isVisible ? 0.7 : 0,
                    transition: `opacity 200ms ease-out ${i * 40 + 600}ms`,
                  }}>
                    {renderShape(s)}
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>

        <div className="text-center">
          <span className="text-sm font-mono" style={{ color: '#9A9A8A' }}>Same problem.</span>
        </div>
      </div>
    </div>
  );
}
