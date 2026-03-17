import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ScrollRevealBlock({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
