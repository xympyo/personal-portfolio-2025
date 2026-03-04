import { useEffect, useState, useRef } from 'react';
import {
  getBounds,
  normalizePoly,
  beamSearchPack,
  PRESETS,
} from '../lib/geometry';

function polyToSvgPath(poly) {
  if (!poly || poly.length === 0) return '';
  return poly.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';
}

export default function PackingAnimation() {
  const [placements, setPlacements] = useState([]);
  const [poly, setPoly] = useState(null);
  const [orientations, setOrientations] = useState([]);
  const [canvasSize] = useState({ w: 300, h: 400 });
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState('idle');
  const cycleRef = useRef(null);

  const runPacking = () => {
    const shapeNames = Object.keys(PRESETS).filter(
      name => name !== 'Rectangle' && name !== 'Circle (approx)'
    );
    const randomShape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
    const shapePoly = normalizePoly(PRESETS[randomShape]);
    
    setVisibleCount(0);
    setPhase('packing');

    setTimeout(() => {
      const result = beamSearchPack(shapePoly, canvasSize.w, canvasSize.h, 5, 3, 5);
      
      setPoly(shapePoly);
      setPlacements(result.placements);
      setOrientations(result.orientations);
      setPhase('revealing');
    }, 100);
  };

  useEffect(() => {
    if (phase !== 'revealing' || placements.length === 0) return;

    const batchSize = 8;
    const intervalMs = 40;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        const next = Math.min(prev + batchSize, placements.length);
        if (next >= placements.length) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('holding');
          }, 100);
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [phase, placements]);

  useEffect(() => {
    if (phase !== 'holding') return;

    const holdTimer = setTimeout(() => {
      setPhase('fadeout');
      setTimeout(() => {
        runPacking();
      }, 800);
    }, 2000);

    return () => clearTimeout(holdTimer);
  }, [phase]);

  useEffect(() => {
    runPacking();
    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current);
    };
  }, []);

  if (!poly || placements.length === 0) return null;

  const visible = placements.slice(0, visibleCount);
  const opacity = phase === 'fadeout' ? 0 : 1;

  return (
    <div 
      className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${canvasSize.w} ${canvasSize.h}`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        {visible.map((p, i) => {
          const orientIdx = p.orientationIndex !== undefined ? p.orientationIndex : 0;
          const isAlt = orientIdx % 2 === 1;
          const color = isAlt ? 'rgba(26, 26, 26, 0.04)' : 'rgba(200, 71, 13, 0.06)';
          const shapePoly = orientations && orientations[orientIdx] 
            ? orientations[orientIdx].poly 
            : poly;
          const translated = shapePoly.map(([px, py]) => [px + p.x, py + p.y]);
          return (
            <path
              key={`${i}-${p.x}-${p.y}`}
              d={polyToSvgPath(translated)}
              fill={color}
              stroke={color}
              strokeWidth={0.1}
              opacity={0.5}
            />
          );
        })}
      </svg>
    </div>
  );
}
