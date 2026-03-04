import CaseStudyLayout, { CaseSection, TechBlock } from '../../components/CaseStudyLayout';

export default function Homize() {
  return (
    <CaseStudyLayout
      title="Homize"
      subtitle="Real-Time Service Marketplace — homize.id"
      meta="2025 · Laravel · WebSockets · Technical Product Management · Live"
    >
      <CaseSection label="Layer 1" title="The Problem with &ldquo;Just Build It&rdquo;">
        <p>
          SMEs and home-based service providers in Indonesia
          have a discovery problem.
        </p>
        <p>
          The clients exist. The providers exist.
          The infrastructure connecting them — a platform
          where you can find, book, negotiate, and pay for
          home services in real time — largely doesn&rsquo;t.
        </p>
        <p>
          A client came to us with a budget of IDR 12 million
          and a request that amounted to: &ldquo;build us something
          like that.&rdquo;
        </p>
        <p>
          The brief was four sentences.
          The requirements were whatever the client imagined
          when they said &ldquo;real-time marketplace.&rdquo;
          The budget assumed a prototype.
        </p>
        <p>
          The first thing I did was not write code.
          I asked questions.
        </p>
      </CaseSection>

      <CaseSection label="Layer 2" title="The Negotiation Before the Architecture">
        <p>
          When I mapped out what &ldquo;real-time marketplace&rdquo;
          actually required — live chat between buyers and sellers,
          file sharing, time-slot booking with conflict resolution,
          state transitions (Pending &rarr; Confirmed &rarr; Completed),
          a voucher system, multi-vendor management —
          IDR 12 million was not a budget.
          It was a down payment on a broken product.
        </p>
        <p>
          The decision: don&rsquo;t build a broken product at 12 million.
          Build the right product and justify the real cost.
        </p>
        <p>
          I translated the vague requirements into a structured
          technical roadmap with line-item cost reasoning.
          Not &ldquo;we need more money&rdquo; — &ldquo;here is exactly what
          12 million buys, here is what it doesn&rsquo;t buy,
          and here is what happens to your business in each case.&rdquo;
        </p>
        <p>
          The client approved IDR 30 million.
          A 150% increase. Before a single line of code.
        </p>
        <p>
          That&rsquo;s not sales. That&rsquo;s product thinking.
        </p>
      </CaseSection>

      <CaseSection label="Layer 3" title="Technical Architecture">
        <TechBlock>
{`Platform:     Laravel monolithic (right choice for team size
              and deployment context)
Database:     MySQL with normalized schema
Real-time:    Pusher WebSockets + Laravel Echo
              (instant chat, file transfer, live status updates)
Team:         2 developers, Git Flow strategy
              (Feature → Dev → Production, zero merge conflicts)

Key systems built:
  · Booking Engine — time-slot conflict detection,
    state machine (Pending → Confirmed → In Progress → Completed)
  · Real-time Chat — file sharing, negotiation,
    instant message delivery between buyer and provider
  · Voucher System — tiered discount validation,
    expiry logic, single-use enforcement
  · Multi-vendor Management — service listings,
    provider profiles, review system

Live at: homize.id`}
        </TechBlock>
      </CaseSection>

      <CaseSection label="Layer 4" title="Results">
        <TechBlock>
{`Budget negotiated:    IDR 30M (from IDR 12M opening offer)
Contract secured:     Full delivery, 10-month engagement
Platform status:      Live at homize.id
Team managed:         2 developers, zero deployment conflicts`}
        </TechBlock>
        <p>
          The real outcome isn&rsquo;t the platform.
          It&rsquo;s the model.
        </p>
        <p>
          A client with a vague brief and an underbudget offer
          became a fully-scoped contract — because the work
          of translating requirements into architecture
          happened before the architecture was built.
        </p>
        <p>
          That&rsquo;s what a TPM does.
          The code is proof the thinking was right.
        </p>
      </CaseSection>
    </CaseStudyLayout>
  );
}
