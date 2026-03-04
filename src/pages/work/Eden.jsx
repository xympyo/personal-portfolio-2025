import CaseStudyLayout, { CaseSection, TechBlock } from '../../components/CaseStudyLayout';

export default function Eden() {
  return (
    <CaseStudyLayout
      title="Project EDEN"
      subtitle="Enterprise Capacity Planning System — PT Mattel Indonesia"
      meta="2025 · Digital Transformation · ASP.NET Core · Python · SQL Server"
    >
      <CaseSection label="Layer 1" title="The Real Cost of a Half-Shift Query">
        <p>
          PT Mattel Indonesia&rsquo;s Decoration Department ran on Excel.
        </p>
        <p>
          Not as a temporary measure. As a permanent infrastructure.
          Twenty thousand rows of production data, fragmented across
          files, updated manually, retrieved via a query that took
          four hours to return results.
        </p>
        <p>
          Four hours. Half a shift. Every time someone needed to know
          where production capacity stood.
        </p>
        <p>
          The data was also dirty. Duplicate entries, inconsistent
          formatting, missing values. Engineers made decisions based
          on numbers they weren&rsquo;t sure they could trust.
          Forecasts were guesses dressed as plans.
          Bottlenecks were discovered after they happened,
          never before.
        </p>
        <p>
          This wasn&rsquo;t a data problem. It was a decision-making problem.
          Bad data architecture was making good decisions impossible.
        </p>
      </CaseSection>

      <CaseSection label="Layer 2" title="What I Was Actually Hired to Do vs. What I Built">
        <p>My title was Process Engineering Intern.</p>
        <p>
          The assignment was to help with existing workflows.
          I looked at the workflows and concluded they needed
          to be replaced, not helped.
        </p>
        <p>
          The decision to build EDEN wasn&rsquo;t obvious.
          It required convincing management to abandon a system
          they had used for years, had tribal knowledge embedded in,
          and trusted — not because it was good, but because
          it was familiar.
        </p>
        <p>
          That&rsquo;s not an engineering problem.
          That&rsquo;s a change management problem.
        </p>
        <p>
          I spent time on the factory floor. Talked to the mechanics.
          Understood what data they actually needed vs. what
          they were currently recording. Built a case in their language:
          not &ldquo;this is better architecture&rdquo; but &ldquo;here is what
          you can do on Monday that you cannot do today.&rdquo;
        </p>
        <p>Once the case was made, the technical decisions were:</p>
        <TechBlock>
{`· Monolithic MVC over microservices
  (one developer, production environment, no DevOps)
· ASP.NET Core 8.0 for the main system
· Python + Pandas for the one-time data migration
· SQL Server for normalized, validated storage
· Real-time API integrations replacing manual refresh cycles`}
        </TechBlock>
      </CaseSection>

      <CaseSection label="Layer 3" title="What EDEN Does">
        <p>
          EDEN is a full-stack capacity planning and resource
          management system for a manufacturing production line.
        </p>
        <TechBlock>
{`Core modules:
  · Real-time capacity dashboard
    (People capacity + Machine capacity, unified view)
  · Tooling management and tracking
  · Bottleneck forecasting
  · Data validation layer
    (prevents "garbage in" at entry point)

Data migration:
  · Python script using Pandas to sanitize and
    normalize 20,000–30,000 rows of legacy Excel data
  · Migrated into SQL Server in 4 hours
  · Zero manual re-entry required

Access:
  · 20+ engineers and managers
  · Role-based views (floor vs. management)`}
        </TechBlock>
      </CaseSection>

      <CaseSection label="Layer 4" title="What Changed">
        <TechBlock>
{`Before EDEN:
  Data retrieval:     4 hours (half a shift, manual Excel query)
  Forecast accuracy:  Estimating — based on incomplete data
  Decision-making:    Reactive — bottlenecks found after the fact
  Data entry:         Manual, fragmented, error-prone

After EDEN:
  Data retrieval:     10 seconds (real-time API) — 99.93% faster
  Forecast accuracy:  80% improvement
  Decision-making:    Proactive — capacity visible in advance
  Data entry:         Centralized, validated, single source of truth

Time saved per week:  ~24 hours across 20+ engineers and managers`}
        </TechBlock>
        <p>
          The month of manual data entry that the migration
          would have required: replaced by a 4-hour Python script.
        </p>
        <p>
          One engineer. No DevOps. No budget for external tooling.
          Built during a 6-month internship, extended because
          it was working.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
