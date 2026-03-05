import { useEffect, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function MetricDrop({ from, to, label, sublabel }) {
  const [ref, isVisible] = useScrollReveal(0.3);
  const [phase, setPhase] = useState('idle'); // idle → showing-from → transitioning → showing-to

  useEffect(() => {
    if (!isVisible) return;
    setPhase('showing-from');
    const t1 = setTimeout(() => setPhase('transitioning'), 800);
    const t2 = setTimeout(() => setPhase('showing-to'), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible]);

  return (
    <div className="max-w-prose mx-auto px-6">
      <div ref={ref} className="rounded-lg overflow-hidden" style={{ background: '#1A1A1A' }}>
      <div className="px-8 py-10">
        {label && (
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: '#9A9A8A' }}>
            {label}
          </p>
        )}

        <div className="space-y-3">
          {/* FROM value */}
          <div
            style={{
              opacity: phase === 'idle' ? 0 : 1,
              transition: 'opacity 300ms ease-out',
            }}
          >
            <span
              className="text-5xl font-mono"
              style={{
                color: phase === 'showing-to' ? '#9A9A8A' : '#E8E4DF',
                textDecoration: phase === 'showing-to' ? 'line-through' : 'none',
                transition: 'color 200ms, text-decoration 200ms',
              }}
            >
              {from}
            </span>
          </div>

          {/* Arrow / transition indicator */}
          {phase !== 'idle' && phase !== 'showing-from' && (
            <div
              style={{
                opacity: phase === 'showing-to' ? 1 : 0,
                transition: 'opacity 200ms',
              }}
            >
              <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                <path d="M0 8H28M28 8L22 2M28 8L22 14" stroke="#C8470D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* TO value */}
          <div
            style={{
              opacity: phase === 'showing-to' ? 1 : 0,
              transform: phase === 'showing-to' ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 300ms ease-out, transform 300ms ease-out',
            }}
          >
            <span
              className="text-5xl font-mono"
              style={{
                color: '#C8470D',
                animation: phase === 'showing-to' ? 'metricPulse 600ms ease-out forwards' : 'none',
              }}
            >
              {to}
            </span>
          </div>
        </div>

        {sublabel && (
          <p
            className="text-sm mt-6 leading-relaxed"
            style={{
              color: '#9A9A8A',
              opacity: phase === 'showing-to' ? 1 : 0,
              transition: 'opacity 400ms ease-out 200ms',
            }}
          >
            {sublabel}
          </p>
        )}
      </div>

        <style>{`
          @keyframes metricPulse {
            0% { opacity: 0.6; transform: scale(0.97); }
            60% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
