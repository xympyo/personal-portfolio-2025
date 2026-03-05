export default function CleaningLoop({ steps }) {
  const count = steps.length;
  const radius = 110;
  const cx = 160;
  const cy = 160;

  const angleStep = (2 * Math.PI) / count;

  const positions = steps.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <div className="max-w-prose mx-auto px-6">
      <div className="flex flex-col items-center">
      <div style={{ width: 320, height: 320, position: 'relative' }}>
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          style={{ animation: 'loopRotate 8s linear infinite', transformOrigin: '50% 50%' }}
        >
          {/* Connecting arcs between nodes */}
          {positions.map((pos, i) => {
            const next = positions[(i + 1) % count];
            const midX = (pos.x + next.x) / 2;
            const midY = (pos.y + next.y) / 2;
            // Pull control point toward center to make arcs curve outward
            const ctrlX = cx + (midX - cx) * 1.3;
            const ctrlY = cy + (midY - cy) * 1.3;
            return (
              <path
                key={i}
                d={`M ${pos.x} ${pos.y} Q ${ctrlX} ${ctrlY} ${next.x} ${next.y}`}
                fill="none"
                stroke="#E0DDD8"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#C8470D" />
            </marker>
          </defs>

          {/* Step boxes */}
          {steps.map((step, i) => {
            const pos = positions[i];
            const boxW = 90;
            const boxH = 32;
            return (
              <g key={i}>
                <rect
                  x={pos.x - boxW / 2}
                  y={pos.y - boxH / 2}
                  width={boxW}
                  height={boxH}
                  rx="6"
                  fill="#F0EBE3"
                  stroke="#E0DDD8"
                  strokeWidth="1"
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: '10px', fontFamily: 'var(--font-mono, monospace)', fill: '#1A1A1A' }}
                >
                  {step}
                </text>
              </g>
            );
          })}

          {/* Center label */}
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            style={{ fontSize: '9px', fontFamily: 'var(--font-mono, monospace)', fill: '#9A9A8A', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            week 1–3
          </text>
        </svg>
      </div>

        <style>{`
          @keyframes loopRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
