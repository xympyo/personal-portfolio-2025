import { useEffect, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ImprovementCounter({ value, prefix = '', suffix = '', label, sublabel }) {
  const [ref, isVisible] = useScrollReveal(0.3);
  const [displayed, setDisplayed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1200;
    const fps = 60;
    const frames = (duration / 1000) * fps;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      // ease-out: fast start, slow finish
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      const current = Math.min(progress * value, value);
      setDisplayed(current);
      if (frame >= frames) {
        setDisplayed(value);
        setDone(true);
        clearInterval(interval);
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        ref={ref}
        className="rounded-lg px-8 py-12 text-center"
        style={{ background: '#F5F2EE', border: '1px solid #E0DDD8' }}
      >
      <p
        className="font-mono leading-none"
        style={{
          fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          color: '#C8470D',
          animation: done ? 'counterPulse 600ms ease-out forwards' : 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 300ms ease-out',
        }}
      >
        {prefix}{displayed.toFixed(1)}{suffix}
      </p>

      {label && (
        <p
          className="text-base font-mono mt-6"
          style={{
            color: '#1A1A1A',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 400ms ease-out 200ms',
          }}
        >
          {label}
        </p>
      )}

      {sublabel && (
        <p
          className="text-sm mt-2"
          style={{
            color: '#9A9A8A',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 400ms ease-out 400ms',
          }}
        >
          {sublabel}
        </p>
      )}

        <style>{`
          @keyframes counterPulse {
            0% { transform: scale(1); }
            40% { transform: scale(1.04); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
