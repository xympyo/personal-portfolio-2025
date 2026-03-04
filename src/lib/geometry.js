// ============================================================================
// AUTOVAS GEOMETRY ENGINE — Beam Search Polygon Packing
// ============================================================================

// Graham Scan convex hull — O(n log n)
export function convexHull(points) {
  if (points.length <= 3) return [...points];

  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const cross = (O, A, B) =>
    (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);

  const lower = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
      lower.pop();
    lower.push(p);
  }

  const upper = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
      upper.pop();
    upper.push(p);
  }

  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

// Get centroid of polygon
function getCentroid(poly) {
  let cx = 0, cy = 0;
  for (const [x, y] of poly) {
    cx += x;
    cy += y;
  }
  return [cx / poly.length, cy / poly.length];
}

// Rotate polygon around its centroid by angleDeg degrees
export function rotatePoly(poly, angleDeg) {
  const [cx, cy] = getCentroid(poly);
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return poly.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    return [
      cx + dx * cos - dy * sin,
      cy + dx * sin + dy * cos
    ];
  });
}

// Get bounding box of polygon
export function getBounds(poly) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of poly) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

// Normalize polygon so its bounding box starts at (0,0)
export function normalizePoly(poly) {
  const bounds = getBounds(poly);
  return poly.map(([x, y]) => [x - bounds.minX, y - bounds.minY]);
}

// Check if two orientations are equivalent (same bounding box dimensions)
function areOrientationsEquivalent(poly1, poly2) {
  const b1 = getBounds(poly1);
  const b2 = getBounds(poly2);
  const tolerance = 0.5;
  return Math.abs(b1.width - b2.width) < tolerance && 
         Math.abs(b1.height - b2.height) < tolerance;
}

// Generate unique orientations for a polygon (0°, 90°, 180°, 270°)
export function generateOrientations(poly) {
  const normalized = normalizePoly(poly);
  
  const candidates = [
    { angle: 0, poly: normalized },
    { angle: 90, poly: normalizePoly(rotatePoly(normalized, 90)) },
    { angle: 180, poly: normalizePoly(rotatePoly(normalized, 180)) },
    { angle: 270, poly: normalizePoly(rotatePoly(normalized, 270)) },
  ];

  // Deduplicate visually identical orientations
  const unique = [];
  for (const candidate of candidates) {
    const isDuplicate = unique.some(u => areOrientationsEquivalent(u.poly, candidate.poly));
    if (!isDuplicate) {
      unique.push(candidate);
    }
  }

  return unique;
}

// Translate polygon by (dx, dy)
export function translatePoly(poly, dx, dy) {
  return poly.map(([x, y]) => [x + dx, y + dy]);
}

// Get axes for SAT from polygon edges
function getAxes(polygon) {
  const axes = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const edge = [b[0] - a[0], b[1] - a[1]];
    const len = Math.sqrt(edge[0] * edge[0] + edge[1] * edge[1]);
    if (len < 1e-9) continue;
    axes.push([-edge[1] / len, edge[0] / len]);
  }
  return axes;
}

// Project polygon onto axis, return [min, max]
function project(polygon, axis) {
  let min = Infinity;
  let max = -Infinity;
  for (const p of polygon) {
    const dot = p[0] * axis[0] + p[1] * axis[1];
    if (dot < min) min = dot;
    if (dot > max) max = dot;
  }
  return [min, max];
}

// SAT collision detection with gap enforcement
export function satCollides(polyA, polyB, gap = 0) {
  const axes = [...getAxes(polyA), ...getAxes(polyB)];
  for (const axis of axes) {
    const [minA, maxA] = project(polyA, axis);
    const [minB, maxB] = project(polyB, axis);
    if (maxA + gap <= minB || maxB + gap <= minA) return false;
  }
  return true;
}

// Y-nudge: binary search for minimum next row Y clearance
function yNudge(hull, existingHulls, curY, shapeH, gap, canvasW, margin) {
  if (existingHulls.length === 0) return curY + shapeH + gap;

  let lo = curY + shapeH * 0.4;
  let hi = curY + shapeH + gap;
  let bestY = hi;

  for (let iter = 0; iter < 12; iter++) {
    const mid = (lo + hi) / 2;
    let anyCollision = false;

    // Test at multiple X positions across the row
    const testXs = [margin, margin + shapeH * 0.5, margin + shapeH, margin + shapeH * 1.5];
    for (const testX of testXs) {
      if (testX + getBounds(hull).width > canvasW - margin) continue;
      const testHull = translatePoly(hull, testX, mid);
      for (const existing of existingHulls) {
        if (satCollides(testHull, existing, gap)) {
          anyCollision = true;
          break;
        }
      }
      if (anyCollision) break;
    }

    if (anyCollision) {
      lo = mid;
    } else {
      bestY = mid;
      hi = mid;
    }
  }

  return bestY;
}

// Pack one row with given orientation
export function packOneRow(hull, existingHulls, canvasW, canvasH, curY, margin, gap, orientationIndex, xOffset = 0) {
  const bounds = getBounds(hull);
  const rowPlacements = [];
  const rowHulls = [];

  if (curY + bounds.height + margin > canvasH) {
    return { newPlacements: [], newHulls: [], rowCount: 0, nextY: curY };
  }

  let curX = margin + xOffset;
  let attempts = 0;
  const maxAttempts = canvasW * 2;

  while (curX + bounds.width + margin <= canvasW && attempts < maxAttempts) {
    attempts++;
    const candidate = translatePoly(hull, curX, curY);

    let collides = false;
    for (const existing of existingHulls) {
      if (satCollides(candidate, existing, gap)) {
        collides = true;
        break;
      }
    }

    if (!collides) {
      rowPlacements.push({ x: curX, y: curY, orientationIndex });
      rowHulls.push(candidate);
      curX += bounds.width + gap;
    } else {
      curX += Math.max(1, bounds.width * 0.1);
    }
  }

  const nextY = yNudge(hull, [...existingHulls, ...rowHulls], curY, bounds.height, gap, canvasW, margin);

  return {
    newPlacements: rowPlacements,
    newHulls: rowHulls,
    rowCount: rowPlacements.length,
    nextY
  };
}

// Beam Search packing algorithm
export function beamSearchPack(poly, canvasW, canvasH, margin, gap, beamWidth = 5) {
  const orientations = generateOrientations(poly);
  const minShapeHeight = Math.min(...orientations.map(o => getBounds(o.poly).height));

  // Initialize beam with one empty state
  let beam = [{
    placements: [],
    placedHulls: [],
    curY: margin,
    score: 0,
    rowOrientations: []
  }];

  const allCandidates = [];
  let rowsEvaluated = 0;

  // Expand beam row by row
  while (beam.some(candidate => candidate.curY + minShapeHeight + margin <= canvasH)) {
    const nextBeam = [];
    rowsEvaluated++;

    for (const candidate of beam) {
      if (candidate.curY + minShapeHeight + margin > canvasH) {
        nextBeam.push(candidate);
        continue;
      }

      for (let orientIdx = 0; orientIdx < orientations.length; orientIdx++) {
        const orientation = orientations[orientIdx];
        const hull = convexHull(orientation.poly);
        const bounds = getBounds(orientation.poly);

        // Try multiple X offsets for nesting
        const xOffsets = [0, bounds.width * 0.25, bounds.width * 0.5];

        for (const xOffset of xOffsets) {
          const rowResult = packOneRow(
            hull,
            candidate.placedHulls,
            canvasW,
            canvasH,
            candidate.curY,
            margin,
            gap,
            orientIdx,
            xOffset
          );

          if (rowResult.rowCount === 0 && candidate.placements.length === 0) {
            continue;
          }

          const newCandidate = {
            placements: [...candidate.placements, ...rowResult.newPlacements],
            placedHulls: [...candidate.placedHulls, ...rowResult.newHulls],
            curY: rowResult.nextY,
            score: candidate.placements.length + rowResult.rowCount,
            rowOrientations: [...candidate.rowOrientations, { orientIdx, xOffset }]
          };

          nextBeam.push(newCandidate);
        }
      }
    }

    if (nextBeam.length === 0) break;

    // Keep only top beamWidth candidates by score
    nextBeam.sort((a, b) => b.score - a.score);
    beam = nextBeam.slice(0, beamWidth);

    // Store snapshot for visualization
    if (rowsEvaluated % 2 === 0 || nextBeam.length < beamWidth * 2) {
      allCandidates.push([...beam]);
    }
  }

  // Return winner and top candidates for visualization
  const winner = beam[0];
  const topCandidates = beam.slice(0, Math.min(5, beam.length));

  return {
    placements: winner.placements,
    count: winner.placements.length,
    rowOrientations: winner.rowOrientations,
    candidates: topCandidates,
    rowsEvaluated,
    orientations
  };
}

// Bounding-box packing: simple rectangle grid
export function boundingBoxPack(shapeBounds, canvasW, canvasH, margin, gap) {
  const placements = [];
  const w = shapeBounds.width;
  const h = shapeBounds.height;

  let curY = margin;
  while (curY + h + margin <= canvasH) {
    let curX = margin;
    while (curX + w + margin <= canvasW) {
      placements.push({ x: curX, y: curY });
      curX += w + gap;
    }
    curY += h + gap;
  }

  return placements;
}

// Calculate density as percentage (using bounding box area for fair comparison)
export function calcDensity(placements, shapeArea, canvasW, canvasH) {
  const totalShapeArea = placements.length * shapeArea;
  const canvasArea = canvasW * canvasH;
  return canvasArea > 0 ? (totalShapeArea / canvasArea) * 100 : 0;
}

// Approximate area of polygon using shoelace formula
export function polyArea(poly) {
  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const j = (i + 1) % poly.length;
    area += poly[i][0] * poly[j][1];
    area -= poly[j][0] * poly[i][1];
  }
  return Math.abs(area) / 2;
}

// Preset shape library
export const PRESETS = {
  'L-Shape': [
    [0, 0], [40, 0], [40, 20], [20, 20], [20, 60], [0, 60]
  ],
  'T-Shape': [
    [0, 0], [60, 0], [60, 20], [40, 20], [40, 60], [20, 60], [20, 20], [0, 20]
  ],
  'Irregular': [
    [10, 0], [50, 5], [55, 25], [45, 50], [20, 45], [0, 30], [5, 10]
  ],
  'Concave': [
    [0, 0], [60, 0], [60, 60], [35, 60], [30, 30], [25, 60], [0, 60]
  ],
  'Rectangle': [
    [0, 0], [50, 0], [50, 30], [0, 30]
  ],
  'Circle (approx)': (() => {
    const pts = [];
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      pts.push([25 + 25 * Math.cos(angle), 25 + 25 * Math.sin(angle)]);
    }
    return pts;
  })(),
};
