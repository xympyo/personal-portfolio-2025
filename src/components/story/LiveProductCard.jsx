import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function LiveProductCard() {
  const [ref, isVisible] = useScrollReveal(0.3);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        ref={ref}
        className="rounded-lg border p-8"
        style={{
          borderColor: '#E0DDD8',
          background: '#ffffff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms ease-out, transform 600ms ease-out',
        }}
      >
      {/* LIVE badge */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: '#22c55e',
            animation: 'livePulse 2s ease-in-out infinite',
          }}
        />
        <span className="text-xs font-mono font-medium" style={{ color: '#22c55e', letterSpacing: '0.15em' }}>LIVE</span>
      </div>

      <p className="font-serif text-2xl" style={{ color: '#1A1A1A' }}>homize.id</p>
      <p className="text-sm mt-2" style={{ color: '#9A9A8A' }}>Real-time home services marketplace</p>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mt-8">
        {[
          '47 service categories',
          'Real-time chat',
          'Live since 2025',
        ].map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: '#C8470D' }} />
            <span className="text-sm font-mono" style={{ color: '#1A1A1A' }}>{stat}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8">
        <a
          href="https://homize.id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono"
          style={{ color: '#C8470D' }}
        >
          Visit homize.id
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="#C8470D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

        <style>{`
          @keyframes livePulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
          }
        `}</style>
      </div>
    </div>
  );
}
