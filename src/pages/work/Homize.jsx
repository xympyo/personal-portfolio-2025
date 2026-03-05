import CaseStudyLayout from '../../components/CaseStudyLayout';
import ScrollRevealBlock from '../../components/story/ScrollRevealBlock';
import PullQuote from '../../components/story/PullQuote';
import TheBrief from '../../components/story/TheBrief';
import NegotiationTimeline from '../../components/story/NegotiationTimeline';
import StateMachine from '../../components/story/StateMachine';
import LiveProductCard from '../../components/story/LiveProductCard';
import BeforeAfterTable from '../../components/story/BeforeAfterTable';

const prose = "text-base leading-[1.9] space-y-5";
const heading = "font-serif text-3xl md:text-4xl text-text leading-[1.2]";
const lbl = "text-xs font-mono uppercase tracking-[0.2em] text-muted mb-4 block";

export default function Homize() {
  return (
    <CaseStudyLayout
      title="Homize"
      subtitle="Real-Time Service Marketplace — homize.id"
      meta="2025 · Laravel · WebSockets · Technical Product Management · Live"
    >
      {/* LAYER 1 — THE BRIEF */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={lbl}>Layer 1</span>
          <h2 className={heading}>Four sentences.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <TheBrief />
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>That was the entire brief.</p>
            <p>
              I've been a vendor.
              I know what a vague brief costs —
              not to the client, but to the person building it.
            </p>
            <p>
              You say yes to the wrong scope,
              build the wrong thing at the right price,
              and three months later the client is angry
              and you're working for free.
            </p>
            <p>
              The first thing I did was not write code.
              I asked what 'real-time marketplace' actually meant to them.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 2 — THE MAP */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={lbl}>Layer 2</span>
          <h2 className={heading}>What it actually required.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <ScrollRevealBlock delay={100}>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>When I mapped out what they were describing —</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: '2', color: '#9A9A8A' }}>
              · Live chat between buyers and providers<br />
              · File sharing within conversations<br />
              · Time-slot booking with conflict detection<br />
              · State transitions (Pending → Confirmed → In Progress → Completed)<br />
              · Voucher system with expiry and single-use enforcement<br />
              · Multi-vendor management<br />
              · Review system<br />
              · User authentication, role separation
            </p>
            <p>— IDR 12 million was not a budget. It was a down payment on a broken product.</p>
            <p>I didn't say 'we need more money.'</p>
            <p>
              I wrote out exactly what 12 million builds,
              what it doesn't build,
              and what happens to their business in each scenario.
              Line by line. In their language, not mine.
            </p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <NegotiationTimeline
          contracts={[
            {
              label: 'Contract 1 — Full Platform',
              from: 'IDR 4M',
              to: 'IDR 12M',
              fromLabel: "Client's opening",
              toLabel: 'Agreed contract',
            },
            {
              label: 'Contract 2 — Chat + Voucher',
              from: 'IDR 4M',
              to: 'IDR 13M',
              fromLabel: "Client's opening",
              toLabel: 'After negotiation from 16M',
            },
          ]}
          total={{ label: 'Total value created from IDR 8M in opening offers', value: 'IDR 25M' }}
        />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p>
              That's not sales.
              That's protecting everyone in the room —
              including the client — from a bad decision.
            </p>
            <p>The code that came after was proof the thinking before it was right.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      {/* LAYER 3 — THE BUILD */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={lbl}>Layer 3</span>
          <h2 className={heading}>What we built.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <StateMachine
          states={[
            { label: 'Pending', description: 'Booking placed' },
            { label: 'Confirmed', description: 'Provider accepts' },
            { label: 'In Progress', description: 'Service underway' },
            { label: 'Completed', description: 'Payment released' },
          ]}
        />
      </div>

      <div className="my-16">
        <ScrollRevealBlock>
          <div className={prose} style={{ color: '#1A1A1A' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: '2', color: '#9A9A8A' }}>
              Platform: Laravel monolithic<br />
              (right choice for two developers and a production deadline)<br /><br />
              Real-time: Pusher WebSockets + Laravel Echo<br />
              (instant chat, file transfer, live status)<br /><br />
              Team: 2 developers, Git Flow<br />
              (Feature → Dev → Production, zero merge conflicts on deployment)
            </p>
            <p>
              The booking engine handles time-slot conflict detection.
              The voucher system handles expiry, tiering, single-use enforcement.
              The chat handles files, negotiation, real-time delivery.
            </p>
            <p>All of it live.</p>
          </div>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <LiveProductCard />
      </div>

      {/* LAYER 4 — RESULTS */}
      <div className="my-16">
        <ScrollRevealBlock>
          <span className={lbl}>Layer 4</span>
          <h2 className={heading}>The numbers.</h2>
        </ScrollRevealBlock>
      </div>

      <div className="my-16">
        <BeforeAfterTable
          rows={[
            { label: 'Contract 1 value', before: 'IDR 4M (client offer)', after: 'IDR 12M (delivered)' },
            { label: 'Contract 2 value', before: 'IDR 4M (client offer)', after: 'IDR 13M (negotiated)' },
            { label: 'Deployment conflicts', before: '—', after: 'Zero' },
            { label: 'Platform status', before: '—', after: 'Live at homize.id' },
          ]}
          summary={[
            { number: 'IDR 25M', label: 'total contract value' },
            { number: '2', label: 'developers, zero conflicts' },
          ]}
        />
      </div>

      {/* CLOSING PULL QUOTE */}
      <div className="my-16">
        <PullQuote dark quote="The code is proof the thinking was right." />
      </div>
    </CaseStudyLayout>
  );
}
