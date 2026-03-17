import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function TheBrief() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 600ms ease-out, transform 600ms ease-out',
        }}
      >
      <div
        className="rounded-lg mx-auto max-w-md"
        style={{
          background: '#FDFCFB',
          border: '1px solid #E0DDD8',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}
      >
        {/* Document header */}
        <div className="px-8 pt-8 pb-4 border-b" style={{ borderColor: '#E0DDD8' }}>
          <p className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: '#9A9A8A' }}>Client Brief — Homize</p>
          <p className="text-xs font-mono mt-1" style={{ color: '#C0BDB8' }}>Early 2025</p>
        </div>

        {/* Body — sparse */}
        <div className="px-8 py-10 space-y-6">
          <p className="font-serif text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>
            "Build us a real-time marketplace."
          </p>
          <p className="font-serif text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>
            "Home services."
          </p>
          <p className="font-serif text-lg leading-relaxed" style={{ color: '#1A1A1A' }}>
            "Buyers and providers."
          </p>
          <p className="font-serif text-lg leading-relaxed" style={{ color: '#9A9A8A' }}>
            "Something like that."
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 pt-2 border-t" style={{ borderColor: '#E0DDD8' }}>
          <p className="text-sm font-mono" style={{ color: '#9A9A8A' }}>
            Budget: <span style={{ color: '#1A1A1A' }}>IDR 12,000,000</span>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
