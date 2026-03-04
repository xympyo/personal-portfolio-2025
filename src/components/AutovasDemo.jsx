import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  convexHull,
  getBounds,
  normalizePoly,
  boundingBoxPack,
  polygonPack,
  calcDensity,
  polyArea,
  PRESETS,
} from '../lib/geometry';

const ACCENT = '#C8470D';
const MUTED_FILL = '#E8E4DF';
const DARK = '#1A1A1A';
const BG = '#F7F5F2';

function polyToSvgPath(poly) {
  if (!poly || poly.length === 0) return '';
  return poly.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';
}

function ShapePreview({ poly, size = 80 }) {
  const bounds = getBounds(poly);
  const scale = Math.min(size / (bounds.width + 4), size / (bounds.height + 4));
  const centered = poly.map(([x, y]) => [
    (x - bounds.minX) * scale + (size - bounds.width * scale) / 2,
    (y - bounds.minY) * scale + (size - bounds.height * scale) / 2,
  ]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={polyToSvgPath(centered)} fill={ACCENT} opacity={0.15} stroke={ACCENT} strokeWidth={1.5} />
    </svg>
  );
}

function CanvasView({ placements, poly, canvasW, canvasH, animating, color }) {
  const scaleX = 500 / canvasW;
  const scaleY = 400 / canvasH;
  const scale = Math.min(scaleX, scaleY);
  const viewW = canvasW * scale;
  const viewH = canvasH * scale;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="border border-border rounded bg-white"
      style={{ maxHeight: 400 }}
    >
      <rect x={0} y={0} width={viewW} height={viewH} fill={MUTED_FILL} opacity={0.3} />
      <AnimatePresence>
        {placements.map((p, i) => {
          const translated = poly.map(([px, py]) => [(px + p.x) * scale, (py + p.y) * scale]);
          return (
            <motion.path
              key={`${i}-${p.x}-${p.y}`}
              d={polyToSvgPath(translated)}
              fill={color}
              fillOpacity={0.6}
              stroke={color}
              strokeWidth={0.5}
              initial={animating ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: animating ? i * 0.02 : 0 }}
            />
          );
        })}
      </AnimatePresence>
    </svg>
  );
}

export default function AutovasDemo() {
  const [selectedPreset, setSelectedPreset] = useState('L-Shape');
  const [customPoints, setCustomPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasW, setCanvasW] = useState(300);
  const [canvasH, setCanvasH] = useState(300);
  const [marginVal, setMarginVal] = useState(5);
  const [gapVal, setGapVal] = useState(3);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);
  const drawRef = useRef(null);

  const activePoly = useMemo(() => {
    if (isDrawing || customPoints.length >= 3) {
      return normalizePoly(customPoints);
    }
    return normalizePoly(PRESETS[selectedPreset]);
  }, [selectedPreset, customPoints, isDrawing]);

  const handleDrawClick = useCallback((e) => {
    const rect = drawRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCustomPoints((prev) => [...prev, [x, y]]);
  }, []);

  const startDrawing = () => {
    setCustomPoints([]);
    setIsDrawing(true);
    setResult(null);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const runPacking = useCallback(() => {
    if (activePoly.length < 3) return;

    const hull = convexHull(activePoly);
    const bounds = getBounds(activePoly);
    const area = polyArea(activePoly);

    const bbPlacements = boundingBoxPack(bounds, canvasW, canvasH, marginVal, gapVal);
    const polyPlacements = polygonPack(hull, bounds, canvasW, canvasH, marginVal, gapVal);

    const bbDensity = calcDensity(bbPlacements, bounds.width * bounds.height, canvasW, canvasH);
    const polyDensity = calcDensity(polyPlacements, area, canvasW, canvasH);

    setAnimating(true);
    setResult({
      bbPlacements,
      polyPlacements,
      bbDensity,
      polyDensity,
      bbCount: bbPlacements.length,
      polyCount: polyPlacements.length,
      improvement: polyDensity - bbDensity,
    });

    setTimeout(() => setAnimating(false), 2000);
  }, [activePoly, canvasW, canvasH, marginVal, gapVal]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl md:text-3xl text-text mb-2">Try it yourself.</h3>
        <p className="text-muted text-body">
          This is a simplified browser version of the polygon-aware
          packing algorithm at the core of Autovas.
        </p>
        <p className="text-muted text-body mt-2">
          Pick a shape. Set your canvas. Watch the difference
          between bounding-box packing and actual polygon packing.
        </p>
        <p className="text-muted text-body mt-2">
          The gap between the two numbers — that&rsquo;s the problem
          this algorithm solves.
        </p>
      </div>

      {/* Shape Selection */}
      <div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4">Select Shape</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              onClick={() => {
                setSelectedPreset(name);
                setCustomPoints([]);
                setIsDrawing(false);
                setResult(null);
              }}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                !isDrawing && customPoints.length < 3 && selectedPreset === name
                  ? 'border-accent bg-white'
                  : 'border-border hover:border-muted'
              }`}
            >
              <ShapePreview poly={PRESETS[name]} size={48} />
              <span className="text-[10px] font-mono text-muted leading-tight text-center">{name}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          {!isDrawing ? (
            <button
              onClick={startDrawing}
              className="text-sm px-4 py-2 border border-border rounded hover:border-text transition-colors text-muted hover:text-text"
            >
              Draw Custom Shape
            </button>
          ) : (
            <>
              <button
                onClick={finishDrawing}
                disabled={customPoints.length < 3}
                className="text-sm px-4 py-2 bg-dark text-bg rounded hover:bg-accent transition-colors disabled:opacity-40"
              >
                Finish Drawing ({customPoints.length} pts)
              </button>
              <button
                onClick={() => { setCustomPoints([]); setIsDrawing(false); }}
                className="text-sm px-4 py-2 border border-border rounded text-muted hover:text-text transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {isDrawing && (
          <div
            ref={drawRef}
            onClick={handleDrawClick}
            className="mt-4 relative border border-dashed border-accent rounded-lg cursor-crosshair bg-white"
            style={{ height: 200 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
              {customPoints.length >= 2 && (
                <polyline
                  points={customPoints.map(([x, y]) => `${x},${y}`).join(' ')}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={0.5}
                />
              )}
              {customPoints.length >= 3 && (
                <polygon
                  points={customPoints.map(([x, y]) => `${x},${y}`).join(' ')}
                  fill={ACCENT}
                  fillOpacity={0.1}
                  stroke={ACCENT}
                  strokeWidth={0.5}
                />
              )}
              {customPoints.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={1.5} fill={ACCENT} />
              ))}
            </svg>
            <p className="absolute bottom-2 left-3 text-[10px] font-mono text-muted">
              Click to place vertices. Minimum 3 points.
            </p>
          </div>
        )}
      </div>

      {/* Canvas Settings */}
      <div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4">Canvas Settings (mm)</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <label className="block">
            <span className="text-xs text-muted">Width</span>
            <input
              type="number"
              value={canvasW}
              onChange={(e) => setCanvasW(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-border rounded bg-white text-text text-sm font-mono focus:outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Height</span>
            <input
              type="number"
              value={canvasH}
              onChange={(e) => setCanvasH(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-border rounded bg-white text-text text-sm font-mono focus:outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Margin</span>
            <input
              type="number"
              value={marginVal}
              onChange={(e) => setMarginVal(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-border rounded bg-white text-text text-sm font-mono focus:outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Gap</span>
            <input
              type="number"
              value={gapVal}
              onChange={(e) => setGapVal(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-border rounded bg-white text-text text-sm font-mono focus:outline-none focus:border-accent"
            />
          </label>
        </div>
      </div>

      {/* Run Button */}
      <button
        onClick={runPacking}
        disabled={activePoly.length < 3}
        className="px-8 py-3 bg-dark text-bg rounded hover:bg-accent transition-colors text-sm font-medium disabled:opacity-40"
      >
        Run Packing Comparison
      </button>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark text-bg rounded-lg p-4 text-center">
              <p className="text-xs font-mono opacity-60 mb-1">Bounding Box</p>
              <p className="text-2xl font-mono">{result.bbCount}</p>
              <p className="text-xs font-mono opacity-60">parts · {result.bbDensity.toFixed(1)}%</p>
            </div>
            <div className="bg-accent text-bg rounded-lg p-4 text-center">
              <p className="text-xs font-mono opacity-80 mb-1">Polygon-Aware</p>
              <p className="text-2xl font-mono">{result.polyCount}</p>
              <p className="text-xs font-mono opacity-80">parts · {result.polyDensity.toFixed(1)}%</p>
            </div>
            <div className="border border-border rounded-lg p-4 text-center">
              <p className="text-xs font-mono text-muted mb-1">Improvement</p>
              <p className={`text-2xl font-mono ${result.improvement > 0 ? 'text-accent' : 'text-text'}`}>
                {result.improvement > 0 ? '+' : ''}{result.improvement.toFixed(1)}%
              </p>
              <p className="text-xs font-mono text-muted">vs bounding box</p>
            </div>
          </div>

          {/* Side by side canvases */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                Bounding Box Packing
              </p>
              <CanvasView
                placements={result.bbPlacements}
                poly={activePoly}
                canvasW={canvasW}
                canvasH={canvasH}
                animating={animating}
                color={DARK}
              />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                Polygon-Aware Packing (Autovas)
              </p>
              <CanvasView
                placements={result.polyPlacements}
                poly={activePoly}
                canvasW={canvasW}
                canvasH={canvasH}
                animating={animating}
                color={ACCENT}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
