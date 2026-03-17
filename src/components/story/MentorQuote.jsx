import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function MentorQuote() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        ref={ref}
        className="rounded-lg px-8 py-12 md:px-14 md:py-14"
        style={{
          background: '#1A1A1A',
          borderLeft: '4px solid #C8470D',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms ease-out, transform 600ms ease-out',
        }}
      >
      <p
        className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2]"
        style={{ color: '#F5F2EE' }}
      >
        "Too good to be true."
      </p>
      <p
        className="text-sm font-mono mt-6 text-right"
        style={{
          color: '#9A9A8A',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 500ms ease-out 400ms',
        }}
      >
        — My mentor. Before it worked.
      </p>
      </div>
    </div>
  );
}
