import { useEffect } from 'react';
import CaseStudyLayout from '../../components/CaseStudyLayout';
import ScrollRevealBlock from '../../components/story/ScrollRevealBlock';
import MentorQuote from '../../components/story/MentorQuote';
import DTFvsAutovas from '../../components/story/DTFvsAutovas';
import ImprovementCounter from '../../components/story/ImprovementCounter';
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
            <p>I used to run a clothing business.</p>
            <p>
              DTF printing — heat transfer graphics onto fabric.
              Every print run, I'd sit there manually arranging
              graphics on the canvas to waste as little material
              as possible.
            </p>
            <p>
              Drag, rotate, nudge, check the gaps.
              Repeat until it looked right.
            </p>
            <p>
              It was tedious. It was also effective.
              And one day I realized — if I can do this by hand,
              I can automate it.
            </p>
            <p>
              That was the entire origin.
              Not a research paper. Not a class assignment.
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
            <p>My mentor said it was impossible. 'Too good to be true' were his exact words.</p>
            <p>That made me pay attention.</p>
            <p>
              I've learned that when someone says 'impossible,'
              they usually mean 'nobody has bothered yet'
              or 'it can't be done perfectly.'
            </p>
            <p>
              2D bin packing IS NP-hard.
              There is no algorithm that solves it perfectly
              for arbitrary shapes in polynomial time.
            </p>
            <p>
              But 'can't be solved perfectly'
              is not the same as 'can't be solved well.'
            </p>
            <p>
              So the question became:
              what's the best achievable solution
              in real-world time, for real-world shapes?
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 2 — WHY THIS IS HARD */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 2</span>
          <h2 className={heading}>The actual problem.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>
              Most packing software wraps every part in a rectangle —
              a bounding box that contains the shape.
              Pack the rectangles.
              Simple. Fast.
              Leaves 10–15% of every print bed empty
              on anything that isn't a perfect rectangle.
            </p>
            <p>
              For irregular shapes — curved parts,
              L-shaped components, asymmetric geometries —
              that gap is real material, real machine time,
              real money. Multiplied across thousands of print runs.
            </p>
            <p>
              I decided to pack the actual polygon shapes.
              Not the boxes around them.
            </p>
            <p>Three things made this possible:</p>
            <div
              className="rounded-lg px-6 py-6 space-y-5"
              style={{ background: '#F0EBE3', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.8', color: '#1A1A1A' }}
            >
              <div>
                <p style={{ color: '#C8470D' }}>1. Dual-hull architecture</p>
                <p style={{ color: '#9A9A8A' }}>
                  Concave hull for display — accurate, shows real silhouette.<br />
                  Convex hull for SAT collision detection — fast, mathematically required.<br />
                  Together: visual accuracy AND computational speed.
                </p>
              </div>
              <div>
                <p style={{ color: '#C8470D' }}>2. Beam Search orientation engine</p>
                <p style={{ color: '#9A9A8A' }}>
                  Instead of one fixed layout, the algorithm maintains<br />
                  5 candidate layouts simultaneously.<br />
                  At each row, every candidate tries every orientation:<br />
                  0°, 90°, 180°, 270°.<br />
                  Scores by total parts placed. Keeps the top 5.<br />
                  Row by row until the canvas is full. Winner takes all.
                </p>
              </div>
              <div>
                <p style={{ color: '#C8470D' }}>3. X-offset + Y-nudge binary search</p>
                <p style={{ color: '#9A9A8A' }}>
                  After each row, binary search finds the minimum<br />
                  vertical clearance for the next row.<br />
                  Horizontal offsets tried per orientation.<br />
                  This is what makes shapes actually nest —<br />
                  not just sit in aligned columns.
                </p>
              </div>
            </div>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 3 — THE DEMO */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 3</span>
          <h2 className={heading}>Try it.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>This is a browser implementation of the Beam Search engine.</p>
            <p>
              Pick a shape. Run the comparison.
              Watch the algorithm search through orientation combinations
              and find the packing that fits the most parts.
            </p>
            <p>
              The gap between the two numbers —
              that's what this solves.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <AutovasDemoComponent />
      </div>

      {/* LAYER 4 — RESULTS */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 4</span>
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
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>
              In a production context running thousands of print jobs per year,
              a 10% density improvement is not a rounding error.
              It's machine hours. It's material cost.
            </p>
            <p>
              The algorithm is generalized.
              UV printing, CNC cutting, laser cutting, fabric cutting —
              any flatbed process faces this same problem.
            </p>
            <p>
              Autovas is not a factory tool.
              It's an engine.
            </p>
            <p>Here's the demo. Run it yourself.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* CLOSING */}
      <div className="my-16">
        <ScrollRevealBlock>
          <p className="text-right text-sm italic" style={{ color: '#9A9A8A' }}>
            My mentor was there when it worked.<br />
            His reaction confirmed it.<br /><br />
            I'll leave it at that.
          </p>
        </ScrollRevealBlock>
      </div>
    </CaseStudyLayout>
  );
}
