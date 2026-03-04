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

// Get axes for SAT from polygon edges
function getAxes(polygon) {
  const axes = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const edge = [b[0] - a[0], b[1] - a[1]];
    // Normal (perpendicular)
    const len = Math.sqrt(edge[0] * edge[0] + edge[1] * edge[1]);
    if (len === 0) continue;
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

// SAT collision detection between two convex polygons
export function satCollides(polyA, polyB) {
  const axes = [...getAxes(polyA), ...getAxes(polyB)];
  for (const axis of axes) {
    const [minA, maxA] = project(polyA, axis);
    const [minB, maxB] = project(polyB, axis);
    if (maxA < minB || maxB < minA) return false;
  }
  return true;
}

// Translate polygon by (dx, dy)
export function translatePoly(poly, dx, dy) {
  return poly.map(([x, y]) => [x + dx, y + dy]);
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
  const { minX, minY } = getBounds(poly);
  return poly.map(([x, y]) => [x - minX, y - minY]);
}

// Bounding-box packing: pack rectangles row by row
export function boundingBoxPack(shapeBounds, canvasW, canvasH, margin, gap) {
  const placements = [];
  let curX = margin;
  let curY = margin;
  let rowHeight = 0;

  const w = shapeBounds.width;
  const h = shapeBounds.height;

  while (curY + h + margin <= canvasH) {
    while (curX + w + margin <= canvasW) {
      placements.push({ x: curX, y: curY });
      curX += w + gap;
      rowHeight = Math.max(rowHeight, h);
    }
    curX = margin;
    curY += rowHeight + gap;
    rowHeight = 0;
  }

  return placements;
}

// Polygon-aware SAT strip packing with alternating rows
export function polygonPack(convexHull, shapeBounds, canvasW, canvasH, margin, gap) {
  const placements = [];
  const placed = []; // placed convex hulls for collision
  const w = shapeBounds.width;
  const h = shapeBounds.height;

  let curY = margin;
  let rowIndex = 0;

  while (curY + h + margin <= canvasH) {
    let curX = margin;
    const isAlt = rowIndex % 2 === 1;
    const offsetX = isAlt ? w * 0.3 : 0; // alternating row offset
    curX += offsetX;

    while (curX + w + margin <= canvasW) {
      const candidate = translatePoly(convexHull, curX, curY);
      let collides = false;

      for (const existing of placed) {
        if (satCollides(candidate, existing)) {
          collides = true;
          break;
        }
      }

      if (!collides) {
        placements.push({ x: curX, y: curY });
        placed.push(candidate);
      }

      curX += w + gap;
    }

    // Y-nudge: binary search for tighter row spacing
    let testY = curY + h * 0.5;
    let bestY = curY + h + gap;
    let lo = curY + h * 0.5;
    let hi = curY + h + gap;

    for (let iter = 0; iter < 8; iter++) {
      const mid = (lo + hi) / 2;
      let anyCollision = false;

      const testHull = translatePoly(convexHull, margin, mid);
      for (const existing of placed) {
        if (satCollides(testHull, existing)) {
          anyCollision = true;
          break;
        }
      }

      if (anyCollision) {
        lo = mid;
      } else {
        bestY = mid;
        hi = mid;
      }
    }

    curY = bestY;
    rowIndex++;
  }

  return placements;
}

// Calculate density as percentage
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
