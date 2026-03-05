import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getBounds,
  normalizePoly,
  boundingBoxPack,
  beamSearchPack,
  calcDensity,
  convexHull,
  PRESETS,
} from '../lib/geometry';

const ACCENT = '#C8470D';
const MUTED_FILL = '#E8E4DF';
const DARK = '#1A1A1A';

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

function CanvasView({ placements, poly, canvasW, canvasH, color, visibleCount, orientations }) {
  const scaleX = 500 / canvasW;
  const scaleY = 400 / canvasH;
  const scale = Math.min(scaleX, scaleY);
  const viewW = canvasW * scale;
  const viewH = canvasH * scale;

  const visible = placements.slice(0, visibleCount);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="border border-border rounded bg-white"
      style={{ maxHeight: 400 }}
    >
      <rect x={0} y={0} width={viewW} height={viewH} fill={MUTED_FILL} opacity={0.3} />
      {visible.map((p, i) => {
        const shapePoly = orientations && p.orientationIndex !== undefined 
          ? orientations[p.orientationIndex].poly 
          : poly;
        const translated = shapePoly.map(([px, py]) => [(px + p.x) * scale, (py + p.y) * scale]);
        return (
          <path
            key={`${i}-${p.x}-${p.y}`}
            d={polyToSvgPath(translated)}
            fill={color}
            fillOpacity={0.6}
            stroke={color}
            strokeWidth={0.5}
          />
        );
      })}
    </svg>
  );
}

function MiniCanvasPreview({ placements, poly, canvasW, canvasH, size = 60, orientations }) {
  const scale = size / Math.max(canvasW, canvasH);
  const viewW = canvasW * scale;
  const viewH = canvasH * scale;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${viewW} ${viewH}`} className="rounded border border-border">
      <rect x={0} y={0} width={viewW} height={viewH} fill="#fff" />
      {placements.slice(0, 50).map((p, i) => {
        const shapePoly = orientations && p.orientationIndex !== undefined 
          ? orientations[p.orientationIndex].poly 
          : poly;
        const translated = shapePoly.map(([px, py]) => [(px + p.x) * scale, (py + p.y) * scale]);
        return (
          <path
            key={i}
            d={polyToSvgPath(translated)}
            fill={ACCENT}
            fillOpacity={0.4}
            stroke="none"
          />
        );
      })}
    </svg>
  );
}

export default function AutovasDemo() {
  const [selectedPreset, setSelectedPreset] = useState('L-Shape');
  const [customPoints, setCustomPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasW, setCanvasW] = useState(580);
  const [canvasH, setCanvasH] = useState(400);
  const [marginVal, setMarginVal] = useState(10);
  const [gapVal, setGapVal] = useState(5);
  const [result, setResult] = useState(null);
  const [searchPhase, setSearchPhase] = useState('idle');
  const [bbVisibleCount, setBbVisibleCount] = useState(0);
  const [polyVisibleCount, setPolyVisibleCount] = useState(0);
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
    setSearchPhase('idle');
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  // Batch reveal for bounding box
  useEffect(() => {
    if (!result || searchPhase !== 'complete') return;

    const batchSize = 8;
    const intervalMs = 30;

    const bbInterval = setInterval(() => {
      setBbVisibleCount((prev) => {
        const next = Math.min(prev + batchSize, result.bbPlacements.length);
        if (next >= result.bbPlacements.length) clearInterval(bbInterval);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(bbInterval);
  }, [result, searchPhase]);

  // Batch reveal for beam search winner
  useEffect(() => {
    if (!result || searchPhase !== 'winner') return;

    const batchSize = 8;
    const intervalMs = 30;

    const polyInterval = setInterval(() => {
      setPolyVisibleCount((prev) => {
        const next = Math.min(prev + batchSize, result.beamPlacements.length);
        if (next >= result.beamPlacements.length) {
          clearInterval(polyInterval);
          setTimeout(() => setSearchPhase('complete'), 500);
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(polyInterval);
  }, [result, searchPhase]);

  const runPacking = useCallback(() => {
    if (activePoly.length < 3) return;

    setBbVisibleCount(0);
    setPolyVisibleCount(0);
    setResult(null);
    setSearchPhase('searching');

    setTimeout(() => {
      const bounds = getBounds(activePoly);
      const bbPlacements = boundingBoxPack(bounds, canvasW, canvasH, marginVal, gapVal);
      const beamResult = beamSearchPack(activePoly, canvasW, canvasH, marginVal, gapVal, 5);

      const bbDensity = calcDensity(bbPlacements, bounds.width * bounds.height, canvasW, canvasH);
      const beamDensity = calcDensity(beamResult.placements, bounds.width * bounds.height, canvasW, canvasH);

      setResult({
        bbPlacements,
        beamPlacements: beamResult.placements,
        bbDensity,
        beamDensity,
        bbCount: bbPlacements.length,
        beamCount: beamResult.count,
        improvement: beamDensity - bbDensity,
        candidates: beamResult.candidates,
        rowsEvaluated: beamResult.rowsEvaluated,
        orientations: beamResult.orientations,
        rowOrientations: beamResult.rowOrientations,
      });

      setTimeout(() => setSearchPhase('winner'), 1500);
    }, 100);
  }, [activePoly, canvasW, canvasH, marginVal, gapVal]);

  return (
    <div className="max-w-prose mx-auto space-y-8">
      <div>
        <h3 className="font-serif text-2xl md:text-3xl text-text mb-2">Try it yourself.</h3>
        <p className="text-muted text-body">
          This is a simplified browser version of the Beam Search packing algorithm at the core of Autovas.
        </p>
        <p className="text-muted text-body mt-2">
          Pick a shape. Set your canvas. Watch the algorithm search through orientation combinations
          to find the optimal packing.
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
                setSearchPhase('idle');
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
          {/* Beam Search Visualization */}
          {searchPhase === 'searching' && (
            <div className="bg-surface border border-accent rounded-lg p-6">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
                Beam Search Running...
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-mono text-muted">
                <div>Beam width: <span className="text-text">5</span></div>
                <div>Orientations: <span className="text-text">{result.orientations.length}</span></div>
                <div>Rows evaluated: <span className="text-text">{result.rowsEvaluated}</span></div>
              </div>
              <div className="space-y-3">
                {result.candidates.map((candidate, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded border border-border bg-white"
                  >
                    <MiniCanvasPreview
                      placements={candidate.placements}
                      poly={activePoly}
                      canvasW={canvasW}
                      canvasH={canvasH}
                      size={50}
                      orientations={result.orientations}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-accent/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-accent h-full transition-all"
                            style={{ width: `${(candidate.score / result.beamCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono text-text whitespace-nowrap">
                          {candidate.score} parts
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Winner Announcement */}
          {(searchPhase === 'winner' || searchPhase === 'complete') && (
            <div className="bg-accent/10 border border-accent rounded-lg p-6">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-2">
                Winner Found
              </p>
              <p className="text-lg font-mono text-text mb-2">{result.beamCount} parts placed</p>
              <p className="text-xs font-mono text-muted">
                Row strategy: {result.rowOrientations.map(row => {
                  const angle = result.orientations[row.orientIdx].angle;
                  const offset = row.xOffset > 0 ? `+${(row.xOffset).toFixed(0)}` : '';
                  return `${angle}°${offset}`;
                }).join(' → ')}
              </p>
            </div>
          )}

          {/* Stats Bar */}
          {searchPhase === 'complete' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark text-bg rounded-lg p-4 text-center">
                <p className="text-xs font-mono opacity-60 mb-1">Bounding Box</p>
                <p className="text-2xl font-mono">{result.bbCount}</p>
                <p className="text-xs font-mono opacity-60">parts · {result.bbDensity.toFixed(1)}%</p>
              </div>
              <div className="bg-accent text-bg rounded-lg p-4 text-center">
                <p className="text-xs font-mono opacity-80 mb-1">Beam Search</p>
                <p className="text-2xl font-mono">{result.beamCount}</p>
                <p className="text-xs font-mono opacity-80">parts · {result.beamDensity.toFixed(1)}%</p>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <p className="text-xs font-mono text-muted mb-1">Improvement</p>
                <p className={`text-2xl font-mono ${result.improvement > 0 ? 'text-accent' : 'text-text'}`}>
                  {result.improvement > 0 ? '+' : ''}{result.improvement.toFixed(1)}%
                </p>
                <p className="text-xs font-mono text-muted">vs bounding box</p>
              </div>
            </div>
          )}

          {/* Side by side canvases */}
          {searchPhase === 'complete' && (
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
                  color={DARK}
                  visibleCount={bbVisibleCount}
                  orientations={null}
                />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                  Beam Search Packing (Autovas)
                </p>
                <CanvasView
                  placements={result.beamPlacements}
                  poly={activePoly}
                  canvasW={canvasW}
                  canvasH={canvasH}
                  color={ACCENT}
                  visibleCount={polyVisibleCount}
                  orientations={result.orientations}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
