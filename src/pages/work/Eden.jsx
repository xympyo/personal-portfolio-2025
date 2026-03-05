import { useEffect } from 'react';
import CaseStudyLayout from '../../components/CaseStudyLayout';
import ScrollRevealBlock from '../../components/story/ScrollRevealBlock';
import PullQuote from '../../components/story/PullQuote';
import KaggleVsReality from '../../components/story/KaggleVsReality';
import CleaningLoop from '../../components/story/CleaningLoop';
import MetricDrop from '../../components/story/MetricDrop';
import SchemaEvolution from '../../components/story/SchemaEvolution';
import BeforeAfterTable from '../../components/story/BeforeAfterTable';

const prose = "text-base leading-[1.9] space-y-5";
const heading = "font-serif text-3xl md:text-4xl text-text leading-[1.2]";
const label = "text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4 block";
const divider = <div className="w-16 h-px my-12 mx-auto" style={{ background: '#C8470D', opacity: 0.3 }} />;

export default function Eden() {
  useEffect(() => {
    document.title = 'Project EDEN — Moshe Dayan';
  }, []);

  return (
    <CaseStudyLayout
      title="Project EDEN"
      subtitle="Enterprise Capacity Planning System — PT Mattel Indonesia"
      meta="2025 · Digital Transformation · ASP.NET Core · Python · SQL Server"
    >
      {/* OPENING PULL QUOTE */}
      <div className="my-16">
        <PullQuote
          quote="I walked in thinking data looked like Kaggle. Clean. Labeled. Beautiful. I was wrong."
        />
      </div>

      {/* LAYER 1 — THE REALITY */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 1</span>
          <h2 className={heading}>Week one. Factory floor.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>The first three weeks, I didn't write a single line of code.</p>
            <p>
              I walked the factory floor. Sat with the mechanics.
              Learned what a Tampo machine physically does
              before I tried to model one in a database.
            </p>
            <p>
              My supervisor told me early:
              you cannot change the people.
              You can only change how you approach them.
            </p>
            <p>I didn't understand what that meant yet.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <KaggleVsReality />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>The data was chaos.</p>
            <p>
              Not bad-data chaos. Human chaos.
              Same department. Different person. Different format.
              Same person. Different year. Different format.
              No unified template. No standard.
              Just however each engineer decided to record things
              that day, that month, that year.
            </p>
            <p>
              I cleaned it in Pandas.
              Then cleaned it again.
              Then found more problems and cleaned it again.
            </p>
            <p>Three weeks of this before I touched the application.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <CleaningLoop steps={["Receive data", "Clean in Pandas", "Find inconsistency", "Clean again"]} />
      </div>

      {/* LAYER 2 — THE ACCEPTANCE */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 2</span>
          <h2 className={heading}>The thing nobody tells you.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>Somewhere in week four, something shifted.</p>
            <p>
              I stopped being frustrated by the chaos
              and started designing around it.
            </p>
            <p>
              If I couldn't change how people had entered data
              historically — and I couldn't —
              then my job wasn't to demand clean input.
            </p>
            <p>
              My job was to build something that could handle
              the messiest data they could throw at it
              and still produce something useful on the other end.
            </p>
            <p>
              That's a different problem than 'build a database.'
              That's: build something that works in the real world,
              not the world you wished existed.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <MetricDrop
          from="4 hours"
          to="< 0.1 seconds"
          label="Data retrieval time"
          sublabel="The query that half the department depended on. For the first two weeks, I watched people use it. Not because they liked it. Because it was familiar."
        />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>I didn't fight that.</p>
            <p>
              I watched it. I understood why people trusted it.
              Then I built the case in their language —
              not 'this is better architecture'
              but 'here is what you can do Monday
              that you cannot do today.'
            </p>
            <p>That's the only argument that works on a factory floor.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 3 — THE BUILD */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 3</span>
          <h2 className={heading}>One engineer. No DevOps. No budget.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>My title was Process Engineering Intern.</p>
            <p>The technical decisions, once the political ones were made:</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: '1.8', color: '#9A9A8A' }}>
              · Monolithic MVC — one developer, production environment<br />
              · ASP.NET Core 8.0 — deployable on local IIS, no cloud cost<br />
              · Python + Pandas — for the one-time data migration<br />
              · SQL Server — normalized, validated, single source of truth<br />
              · REST API — replacing the 4-hour manual refresh
            </p>
            <p>
              Getting that API approved took three hours in a room.
              One person. One thing to agree on.
              He'd say A, then go to B, X, Y, Z, back to A.
            </p>
            <p>
              I learned to lower my ego before I learned the API worked.
              That part they don't teach in university.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <SchemaEvolution />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>I also got the schema wrong the first time.</p>
            <p>
              v1.0 was Toy-Centric —
              tool data embedded inside each product record.
              Intuitive. Wrong.
            </p>
            <p>
              One tool used by 50 products meant 50 duplicate records.
              Change a tool spec: bulk update across thousands of rows.
            </p>
            <p>
              Caught it in load testing.
              Refactored the entire data layer in October.
              Migrated thousands of records without data loss.
            </p>
            <p>First instinct was wrong. I fixed it before it mattered. That's the job.</p>
            {divider}
            <p>
              The decision to build EDEN wasn&rsquo;t obvious.
              It required convincing management to abandon a system
              they had used for years, had tribal knowledge embedded in,
              and trusted — not because it was good, but because
              it was familiar.
            </p>
            <p>
              The technical problem was the easy part.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 4 — WHAT CHANGED */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={label}>Layer 4</span>
          <h2 className={heading}>What changed.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <BeforeAfterTable
          rows={[
            { label: 'Search speed', before: '45 seconds', after: '< 0.1 seconds' },
            { label: 'Calculation time', before: '3 days manual', after: '5 seconds automated' },
            { label: 'Data migration', before: 'Weeks of manual entry', after: '4 hours, Python script' },
            { label: 'Error rate', before: 'High (manual entry)', after: '0% (validated input)' },
            { label: 'Engineers served', before: 'Individual Excel files', after: '20+ unified system' },
          ]}
          summary={[
            { number: '450×', label: 'faster on search' },
            { number: '99.9%', label: 'faster on calculation' },
          ]}
        />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>
              When the migration script finished —
              30,000 rows, 4 hours, zero manual input —
              I was so happy.
            </p>
            <p>
              Felt like a genius for a minute.
              People started asking how.
            </p>
            <p>That was enough.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <PullQuote
          dark
          quote="Smart gets you in the room. Reliable keeps you there."
          attribution="What the internship taught me. Not what it assigned me."
        />
      </div>

      {/* CLOSING */}
      <div className="my-16">
        <ScrollRevealBlock>
          <p className="text-right text-sm italic" style={{ color: '#9A9A8A' }}>
            One engineer. No DevOps. No budget for external tooling.<br />
            First real job. Hardest six months.<br /><br />
            Extended because it was working.
          </p>
        </ScrollRevealBlock>
      </div>
    </CaseStudyLayout>
  );
}
