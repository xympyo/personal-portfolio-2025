import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function NegotiationTimeline({ contracts, total }) {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div ref={ref} className="space-y-4">
      {contracts.map((contract, i) => (
        <div
          key={i}
          className="rounded-lg border p-6"
          style={{
            borderColor: '#E0DDD8',
            background: '#ffffff',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 500ms ease-out ${i * 150}ms, transform 500ms ease-out ${i * 150}ms`,
          }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.15em] mb-4" style={{ color: '#9A9A8A' }}>
            {contract.label}
          </p>
          <div className="flex items-center gap-4">
            {/* From */}
            <div className="text-center min-w-[80px]">
              <p className="text-xl font-mono" style={{ color: '#9A9A8A' }}>{contract.from}</p>
              <p className="text-xs mt-1" style={{ color: '#9A9A8A' }}>{contract.fromLabel}</p>
            </div>

            {/* Growing arrow */}
            <div className="flex-1 flex items-center relative" style={{ minHeight: 32 }}>
              <div
                className="h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #9A9A8A, #C8470D)',
                  width: isVisible ? '100%' : '0%',
                  transition: `width 600ms ease-out ${i * 150 + 300}ms`,
                }}
              />
              <svg
                className="absolute right-0 shrink-0"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 200ms ease-out ${i * 150 + 850}ms`,
                }}
              >
                <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="#C8470D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* To */}
            <div className="text-center min-w-[80px]">
              <p className="text-xl font-mono font-medium" style={{ color: '#C8470D' }}>{contract.to}</p>
              <p className="text-xs mt-1" style={{ color: '#9A9A8A' }}>{contract.toLabel}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Total row */}
      {total && (
        <div
          className="rounded-lg p-6"
          style={{
            background: '#1A1A1A',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 500ms ease-out ${contracts.length * 150 + 200}ms`,
          }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.15em] mb-2" style={{ color: '#9A9A8A' }}>
            {total.label}
          </p>
          <p className="text-4xl font-mono" style={{ color: '#C8470D' }}>{total.value}</p>
        </div>
      )}
      </div>
    </div>
  );
}
