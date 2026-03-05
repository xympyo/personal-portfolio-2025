import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PullQuote({ quote, attribution, dark = false }) {
  const [ref, isVisible] = useScrollReveal(0.2);

  const bg = dark ? '#1A1A1A' : '#F0EBE3';
  const textColor = dark ? '#F5F2EE' : '#1A1A1A';
  const attrColor = '#9A9A8A';

  // Dark variant is full-width, light variant is contained
  const containerClass = dark ? '' : 'max-w-prose mx-auto px-6';

  return (
    <div className={containerClass}>
      <div
        ref={ref}
        style={{
          background: bg,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms ease-out, transform 600ms ease-out',
        }}
        className="px-8 py-12 md:px-16 md:py-14"
      >
        <div className='max-w-prose mx-auto'>

          <p
            className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3]"
            style={{ color: textColor }}
          >
            {quote}
          </p>
          {attribution && (
            <p
              className="mt-6 text-sm font-mono"
              style={{
                color: attrColor,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 500ms ease-out 400ms',
              }}
            >
              {attribution}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
