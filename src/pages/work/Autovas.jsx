import CaseStudyLayout, { CaseSection, TechBlock } from '../../components/CaseStudyLayout';
import AutovasDemoComponent from '../../components/AutovasDemo';

export default function Autovas() {
  return (
    <CaseStudyLayout
      title="Autovas"
      subtitle="Automation Canvas — 2D Polygon Packing Engine"
      meta="2025 · Algorithm Design · Industrial Optimization · Live Demo Available"
    >
      <CaseSection label="Layer 1" title="The Problem Nobody Had Bothered to Solve">
        <p>
          Industrial UV flatbed printing has a dirty secret:
          most operators pack parts onto print beds by eye.
        </p>
        <p>
          They drag rectangles around a screen, leave gaps,
          run the printer, waste material, repeat.
          On irregular geometries — toy parts, curved components,
          asymmetric molds — this can mean 20–30% of every
          print bed is wasted space.
        </p>
        <p>
          That waste compounds. Across thousands of production runs,
          it becomes hours of machine time, rolls of wasted substrate,
          and a bottleneck nobody has a name for.
        </p>
        <p>
          The software solutions that exist treat every part as a
          bounding box — a rectangle that wraps the shape.
          It&rsquo;s fast. It&rsquo;s simple. It leaves 10–15% on the table
          that actual polygon-aware packing could recover.
        </p>
        <p>I decided to build the polygon-aware version.</p>
      </CaseSection>

      <CaseSection label="Layer 2" title="Why This Is Hard (And Why That Mattered)">
        <p>
          2D bin packing is NP-hard. There is no algorithm that
          solves it perfectly for arbitrary shapes in polynomial time.
        </p>
        <p>
          So the decision wasn&rsquo;t &ldquo;solve it perfectly&rdquo; —
          that&rsquo;s not possible. The decision was:
          what&rsquo;s the best achievable solution in real-world time?
        </p>
        <p>Three key architectural decisions shaped everything:</p>

        <div className="space-y-6 mt-4">
          <div>
            <p className="text-text font-medium">1. Dual-hull architecture</p>
            <p className="mt-2">
              Most packing algorithms use one representation per shape.
              I use two: a concave hull (accurate, for display)
              and a convex hull (fast, for collision detection).
              SAT collision detection only works on convex polygons.
              The concave hull gives visual accuracy.
              The convex hull gives speed.
              Together, they give both.
            </p>
          </div>

          <div>
            <p className="text-text font-medium">2. SAT-based strip packing over bounding-box packing</p>
            <p className="mt-2">
              Separating Axis Theorem collision detection checks actual
              polygon geometry, not rectangles. Combined with a Y-nudge
              binary search for minimum row spacing and an alternating
              row strategy, this recovers 5–15% density on irregular parts.
              That&rsquo;s the entire margin bounding-box approaches leave behind.
            </p>
          </div>

          <div>
            <p className="text-text font-medium">3. Bell partition enumeration for canvas optimization</p>
            <p className="mt-2">
              When printing multiple part types, you need to decide
              which parts share a canvas. I use Bell number enumeration
              to generate and score every possible grouping,
              finding the true global optimum for up to 6 panel types.
              Bell(6) = 203 partitions — manageable. Bell(7) = 877 — not.
              So the cap is 6. That&rsquo;s a real tradeoff, documented and owned.
            </p>
          </div>
        </div>
      </CaseSection>

      <CaseSection label="Layer 3" title="Technical Architecture">
        <TechBlock>
{`Input:   Any 2D polygon set (drawn in-browser or imported)
Output:  Optimized layout with exact part count,
         production run estimates, pixel-accurate SVG

Canvas:  User-defined dimensions, margins, and gap spacing
         (not hardcoded to any printer or machine spec)

Core algorithms:
  · Graham Scan convex hull       — O(n log n)
  · Grid-based concave hull       — with morphological closing
  · Douglas-Peucker simplification
  · SAT collision detection       — O(n × row_size), not O(n²)
  · Y-nudge binary search         — minimum row spacing
  · Alternating row strategy      — 5–50% gain on asymmetric parts
  · Bell partition enumeration    — global canvas optimization
  · Strategy E remainder packing  — high-aspect-ratio edge recovery

Performance:
  NFP Strip Pack (100 parts):     20–80ms
  Canvas Optimization (2 panels): ~50ms
  Canvas Optimization (6 panels): 2–4 seconds`}
        </TechBlock>

        <div className="mt-16">
          <AutovasDemoComponent />
        </div>
      </CaseSection>

      <CaseSection label="Layer 4" title="Results">
        <TechBlock>
{`Density recovery:    5–15% over bounding-box packing
                     on irregular geometries

Accuracy:            Matches grid packing on rectangles.
                     Exceeds it on everything else.

Scalability:         500+ vertex inputs,
                     up to 6 panel types per optimization run`}
        </TechBlock>
        <p>
          In a production context running thousands of print jobs per year,
          a 10% density improvement is not a rounding error.
          It&rsquo;s machine hours. It&rsquo;s material cost. It&rsquo;s real money.
        </p>
        <p>
          The algorithm is generalized.
          Any flatbed process — UV printing, CNC cutting, laser cutting,
          fabric cutting — faces this same problem.
          Autovas is not a factory tool. It&rsquo;s an engine.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
