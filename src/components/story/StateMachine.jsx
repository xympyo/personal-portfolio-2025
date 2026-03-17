import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function StateMachine({ states }) {
  const [ref, isVisible] = useScrollReveal(0.3);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div ref={ref} className="overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max py-4">
        {states.map((state, i) => (
          <div key={i} className="flex items-start">
            {/* State box */}
            <div className="flex flex-col items-center">
              <div
                className="px-5 py-3 rounded-lg border-2 text-sm font-mono font-medium whitespace-nowrap"
                style={{
                  borderColor: isVisible ? '#C8470D' : '#E0DDD8',
                  background: isVisible ? '#C8470D' : 'transparent',
                  color: isVisible ? '#ffffff' : '#9A9A8A',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all 400ms ease-out ${i * 400}ms`,
                }}
              >
                {state.label}
              </div>
              {state.description && (
                <p
                  className="text-xs mt-2 text-center max-w-[90px]"
                  style={{
                    color: '#9A9A8A',
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 300ms ease-out ${i * 400 + 200}ms`,
                  }}
                >
                  {state.description}
                </p>
              )}
            </div>

            {/* Arrow between states */}
            {i < states.length - 1 && (
              <div
                className="flex items-center mt-3 mx-1"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 300ms ease-out ${i * 400 + 300}ms`,
                }}
              >
                <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                  <path d="M2 8H26M26 8L20 3M26 8L20 13" stroke="#C8470D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
