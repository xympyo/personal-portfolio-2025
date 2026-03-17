import { useEffect } from 'react';
import CaseStudyLayout from '../../components/CaseStudyLayout';
import ScrollRevealBlock from '../../components/story/ScrollRevealBlock';
import MentorQuote from '../../components/story/MentorQuote';
import DTFvsAutovas from '../../components/story/DTFvsAutovas';
import ImprovementCounter from '../../components/story/ImprovementCounter';
import MetricDrop from '../../components/story/MetricDrop';
import BeforeAfterTable from '../../components/story/BeforeAfterTable';
import AutovasDemoComponent from '../../components/AutovasDemo';

const prose = "text-base leading-[1.9] space-y-5";
const heading = "font-serif text-3xl md:text-4xl text-text leading-[1.2]";
const label = "text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4 block";

export default function Autovas() {
  useEffect(() => {
    document.title = 'Autovas — Moshe Dayan';
  }, []);

  return (
    <CaseStudyLayout
      title="Autovas"
      subtitle="Automation Canvas — 2D Polygon Packing Engine"
      meta="2025 · Algorithm Design · Industrial Optimization · Live Demo Available"
    >
      {/* MENTOR QUOTE — immediate impact */}
      <div className="my-16">
        <MentorQuote />
      </div>

      {/* LAYER 1 — THE ORIGIN */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 1</span>
          <h2 className={heading}>Where this actually came from.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>The problem existed before anyone named it.</p>
            <p>Most operators pack parts onto print beds by eye.</p>
            <p>
              I used to run a clothing business. DTF printing —
              heat transfer graphics onto fabric. Every print run,
              I'd sit there manually arranging graphics on the canvas
              to waste as little material as possible.
            </p>
            <p>
              Drag, rotate, nudge, check the gaps. Repeat.
            </p>
            <p>
              It was tedious. And one day I realized —
              if I can do this by hand, I can automate it.
            </p>
            <p>
              That was the entire origin. Not a research paper.
              Not a class assignment.
              A clothing vendor annoyed at a manual process.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <DTFvsAutovas />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>My mentor said it was too good to be true.</p>
            <p>That made me pay attention.</p>
            <p>
              2D bin packing is NP-hard. There is no algorithm
              that solves it perfectly for arbitrary shapes
              in polynomial time.
            </p>
            <p>
              But "can't be solved perfectly" is not the same
              as "can't be solved well."
            </p>
            <p>
              So the question became: what's the best achievable
              solution in real-world time, for real-world shapes?
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 2 — THE REAL PROBLEM */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 2</span>
          <h2 className={heading}>This wasn't about density.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>
              The obvious framing for this problem is material waste.
              Pack shapes tighter, use less substrate, save money.
            </p>
            <p>That's real. But it's not the actual problem.</p>
            <p>
              In a manufacturing production line, when a new part needs a
              cavity layout — how many copies fit on one print canvas,
              in what arrangement — there are two options:
            </p>
            <p>
              Option A: A drafter spends a full day designing the
              3D nest layout manually. Then another full day producing
              it. And drafters have a full queue of other work.
            </p>
            <p>
              Option B: Send the part to an external vendor.
              Wait for the layout back.
            </p>
            <p>
              That wait is two weeks. Usually more.
            </p>
            <p>
              Two weeks to know how many cavities fit on one canvas.
              Two weeks before production planning can proceed.
              Two weeks of a bottleneck nobody had a name for.
            </p>
            <p>Autovas does it in under one hour.</p>
            <p>
              Not because the algorithm is magic.
              Because the algorithm doesn't sleep, doesn't have
              a queue, and doesn't need a 3D modeling license.
            </p>
            <p>
              The density improvement is real — 10-15% over
              bounding-box approaches on irregular geometries.
              But the real win is time.
            </p>
            <p>
              2 weeks → 1 hour.
              That's a 99.7% reduction in waiting.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <MetricDrop
          beforeValue="2 weeks"
          afterValue="< 1 hour"
          label="Cavity layout time"
        />
        <MetricDrop
          beforeValue="External vendor"
          afterValue="In-house"
          label="Dependency"
        />
      </div>

      {/* LAYER 3 — HOW I THINK */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 3</span>
          <h2 className={heading}>The decisions that made it work.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>
              The algorithm didn't come from a textbook.
              It came from a series of decisions — each one made
              for a specific reason. Here's how I think about it.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* Subsection 1: Two hulls */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Two hulls, not one.</p>
            <p>
              Every shape has two representations in Autovas.
              One that looks right. One that computes fast.
              Using both gives visual accuracy AND speed.
            </p>
            <div style={{ 
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#9A9A8A'
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                Concave hull (grid-based, morphological closing,
                Douglas-Peucker simplification) — accurate silhouette
                for display. Up to 150 points.
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                Convex hull (Graham Scan, O(n log n), CCW order) —
                required for SAT collision detection. Convex polygons
                only.
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                SAT (Separating Axis Theorem): for two convex polygons,
                if a separating axis exists between them, they do not
                overlap. O(n × m) per pair, accelerated with AABB
                pre-rejection (epsilon = 0.01).
              </p>
              <p>
                Spatial acceleration: PackingSpatialGrid with cell size
                = max(avgDim + gap, 10). AABB-based cell lookup reduces
                collision checks from O(n²) to O(n × local_density).
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      <div style={{ width: '64px', height: '1px', background: '#C8470D', opacity: 0.3, margin: '2rem auto' }} />

      {/* Subsection 2: Early stopping */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Algorithms run until time runs out. Mine runs until it's done.</p>
            <p>
              Most optimization algorithms run for a fixed number
              of iterations. I implemented epoch-based SA with
              early stopping: if quality stops improving across
              3 consecutive epochs, the algorithm terminates.
              Not because time ran out. Because it converged.
            </p>
            <div style={{ 
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#9A9A8A'
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                Single-panel SA (SimulatedAnnealingRefine):
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - Epoch size: 200 steps per epoch<br />
                - Early stopping patience: 3 consecutive stagnant epochs
                  (convergence delta ≤ 0.01)<br />
                - If early stop triggers before epoch 20:
                  one random restart at temp = t₀ × 0.3
                  before truly stopping
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                4 perturbation types (equal probability):<br />
                  Case 0: Move to random position<br />
                  Case 1: Change orientation (0°, 90°CW, 180°, 270°CW)<br />
                  Case 2: Swap positions of two pieces<br />
                  Case 3: Remove + reinsert at random location (10 attempts)
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                Acceptance probability:<br />
                  P(accept worse) = exp(-Δ / max(T × 50, 0.01))
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                Adaptive cooling:<br />
                  acceptance rate &gt; 0.4 → decrease T by 0.02 (cool faster)<br />
                  acceptance rate &lt; 0.05 → increase T by 0.02 (reheat)<br />
                  t₀ = 1.0, seed = 42
              </p>
              <p>
                Objective: minimize maxExtent<br />
                  = max(y + pieceHeight) across all placed pieces
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      <div style={{ width: '64px', height: '1px', background: '#C8470D', opacity: 0.3, margin: '2rem auto' }} />

      {/* Subsection 3: Greedy seed */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>The greedy seed matters more than the search.</p>
            <p>
              SA needs a starting point. A bad starting point
              wastes all the search budget escaping it.
              I use a greedy strip-pack as the seed —
              fast, good enough to give SA something real to work with.
            </p>
            <div style={{ 
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#9A9A8A'
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                PackZoneAdvanced (Bottom-Left Fill + Y-Nudge Binary Search):
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - Places pieces left-to-right, row-by-row<br />
                - When row overflows, binary search finds minimum Y
                  offset where next row doesn't collide with previous
                  (20 iterations, SAT collision check per candidate)<br />
                - If alternate=true: odd rows use 180°-flipped hull
                  (alternating row strategy, 5-50% gain on asymmetric parts)<br />
                - Safety cap: maxParts = 5000
              </p>
              <p>
                Phase 3 — GreedyFillPass (post-SA gap recovery):<br />
                - Phase 1: 7.5mm step grid scan, all orientations
                  Places piece wherever no SAT collision<br />
                - Phase 2 (if Phase 1 efficiency &lt; 62%):
                  1mm precision scan + RasterizedGapFill at 3mm resolution
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      <div style={{ width: '64px', height: '1px', background: '#C8470D', opacity: 0.3, margin: '2rem auto' }} />

      {/* Subsection 4: Two panels */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Two panels sharing one canvas is a different problem entirely.</p>
            <p>
              When two different part faces need to share one
              print canvas, the algorithm has to find how many
              of each fit together — not separately.
              I discovered that seeding both panels fairly
              is what makes this work.
            </p>
            <div style={{ 
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#9A9A8A'
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                PackSimultaneous (RunSimSA — Simultaneous SA):
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - Interleaved greedy seed:<br />
                  Panel A scans top-left → bottom-right<br />
                  Panel B scans bottom-right → top-left<br />
                  Alternating placement ensures both panels
                  get fair access to canvas space
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                  (Original sequential seed starved Panel B.
                  Interleaving was the critical fix.)
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - Territory constraint: hard centroid check,
                  20mm tolerance. Each panel's pieces must stay
                  in their assigned canvas half.
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - T search: binary search from hi=min(maxA, maxB)
                  down to lo=1 (not splitBaselineT — expanding
                  the search range recovered many feasible T values
                  that were previously missed)
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - SA params: epochSize=300, earlyStoppingPatience=8,
                  temperature=50.0, adaptive cooling=0.95
              </p>
              <p>
                - Quality threshold:<br />
                  GOOD (≥70% efficiency): accept result<br />
                  MEDIOCRE (≥45%): 2 reshuffles<br />
                  BAD (&lt;45%): 3 reshuffles
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      <div style={{ width: '64px', height: '1px', background: '#C8470D', opacity: 0.3, margin: '2rem auto' }} />

      {/* Subsection 5: Bell partitions */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Finding the global optimum across all machine configurations.</p>
            <p>
              With N panels, there are many ways to assign them
              to machines. I enumerate every possible grouping
              using Bell number partitions, score each one by
              production hours, and find the true global minimum.
            </p>
            <div style={{ 
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#9A9A8A'
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                Bell partition enumeration:<br />
                  Bell(1) = 1 partition<br />
                  Bell(2) = 2 partitions<br />
                  Bell(3) = 5 partitions<br />
                  Bell(4) = 15 partitions<br />
                  Bell(5) = 52 partitions<br />
                  Bell(6) = 203 partitions ← practical limit<br />
                  Bell(7) = 877 partitions ← not supported (cap = 6 panels)
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                Hours formula per configuration:<br />
                  runsPerHour = floor(3600 / (mpp × 60 × 1.2))<br />
                  (1.2× safety factor for operator handling)
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                  runsNeeded = ceil(1000 / cavitiesPerRun)<br />
                  hours = runsNeeded / runsPerHour
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                  Solo mode: cavitiesPerRun = 2 × cavitiesPerSlot<br />
                  Simultaneous mode: cavitiesPerRun = 2T
              </p>
              <p>
                Bottleneck = machine with highest hours.<br />
                Total configuration hours = bottleneck hours.<br />
                Winner = configuration with minimum bottleneck hours,
                tiebreak by fewer machines.
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      <div style={{ width: '64px', height: '1px', background: '#C8470D', opacity: 0.3, margin: '2rem auto' }} />

      {/* Subsection 6: Row patterns */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Row patterns as a separate strategy.</p>
            <p>
              For complementary part faces — like left and right
              sides of the same toy — a repeating row pattern
              can outperform free-form SA. I check both and
              take whichever wins.
            </p>
            <div style={{ 
              marginTop: '1.5rem',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#9A9A8A'
            }}>
              <p style={{ marginBottom: '0.75rem' }}>
                BuildRowPattern:
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                - Locks best orientation (minimum height row)<br />
                - Runs PackZoneAdvanced + SA (30 epochs, locked orientation)<br />
                - Verifies tileability: SAT collision check between
                  stamp 0 and stamp 1 (offset by rowBlockH + gap)<br />
                - Mirror optimization: checks Side+/Side- and
                  Front/Rear complementary pairs
              </p>
              <p>
                Result: takes max(rowPattern T, freeForm T).<br />
                They don't compete — both are always tried.
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 4 — PRODUCTION SYSTEM */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 4</span>
          <h2 className={heading}>What it actually became.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>The browser demo on this page is a simplified version.</p>
            <p>
              The production system running in the factory
              is something else entirely.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* System Spec Card */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div style={{
            background: '#1A1A1A',
            border: '1px solid #2a2a2a',
            borderRadius: 8,
            padding: '24px 32px',
            fontFamily: 'var(--font-mono)',
            color: '#F5F2EE',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}>
                AUTOVAS — Production System
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#9A9A8A', marginBottom: 20 }}>
              Production System · 2025
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: '#F5F2EE' }}>
              <p style={{ marginBottom: 12 }}>
                <span style={{ color: '#9A9A8A' }}>Backend:</span> ASP.NET Core 8 MVC · 5,449 lines<br />
                <span style={{ color: '#9A9A8A' }}>Frontend:</span> Razor + JavaScript · 2,924 lines<br />
                <span style={{ color: '#9A9A8A' }}>Input:</span> Binary STL file (any toy geometry)<br />
                <span style={{ color: '#9A9A8A' }}>Output:</span> Optimized cavity layout + PDF report
              </p>
              <p style={{ marginBottom: 12 }}>
                <span style={{ color: '#9A9A8A' }}>Pipeline:</span><br />
                STL Upload → Dimension Detection → 3D Viewport<br />
                → Face Assignment → Panel Configuration<br />
                → Cavity Layout (NFP + SA) → Canvas Optimization<br />
                → Jig Layout → PDF Export
              </p>
              <p style={{ marginBottom: 12 }}>
                <span style={{ color: '#9A9A8A' }}>Real-time:</span> Server-Sent Events (SSE)<br />
                Annealing Chamber overlay<br />
                Live temperature · score graph · epoch progress
              </p>
              <p>
                <span style={{ color: '#9A9A8A' }}>Scale:</span> Up to 6 panel types per optimization<br />
                Bell(6) = 203 configurations evaluated<br />
                Full run: 2-4 seconds (Fast) · ~60s (Deep)
              </p>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>Every optimization run shows its work.</p>
            <p>
              The Annealing Chamber — a full-screen overlay with
              particle field, live temperature gauge, score graph,
              and real-time epoch progress — was built because
              watching an algorithm think is more useful than
              watching a spinner.
            </p>
            <p>
              Engineers can see when it's converging.
              They can kill it early if the result is good enough.
              They can switch between Fast (5 epochs) and Deep
              (20 epochs) depending on how much time they have.
            </p>
            <p>
              The system doesn't hide the optimization.
              It makes it legible.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 5 — RESULTS */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 5</span>
          <h2 className={heading}>The gap is real.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ImprovementCounter
          value={10.8}
          prefix="+"
          suffix="%"
          label="density improvement on irregular shapes"
          sublabel="Compared to bounding-box packing on the same canvas."
        />
      </div>

      <div className="my-16">
        <BeforeAfterTable
          rows={[
            { metric: 'Cavity layout time', before: '2 weeks (vendor)', after: '< 1 hour' },
            { metric: 'Drafter bandwidth', before: '1-2 days per layout', after: 'Freed entirely' },
            { metric: 'Vendor dependency', before: 'Required', after: 'Eliminated' },
            { metric: 'Density vs bounding-box', before: 'Baseline', after: '+10-15% on irregular shapes' },
            { metric: 'Configurations evaluated', before: '1 (manual)', after: 'Up to 203 (Bell partitions)' },
          ]}
        />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>My mentor was in the room when it worked.</p>
            <p>
              I'll leave his reaction where it belongs —
              in that room.
            </p>
            <p>The numbers speak clearly enough.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* DEMO SECTION */}
      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
              Try a simplified version.
            </h3>
            <p>
              This is a browser implementation of the strip-packing
              and beam search engine — the foundation the production
              algorithm is built on.
            </p>
            <p>
              The production system uses Simulated Annealing,
              STL file processing, and a full optimization pipeline.
              This shows the core packing logic in isolation.
            </p>
            <p>Pick a shape. Run the comparison.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <AutovasDemoComponent />
      </div>
    </CaseStudyLayout>
  );
}
