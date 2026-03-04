import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, fadeUp } from '../lib/motion';
import WorkCard from '../components/WorkCard';
import SectionReveal from '../components/SectionReveal';

const works = [
  {
    title: 'Autovas',
    description: 'An NP-hard problem walked into a factory. I wrote the algorithm that solved it.',
    tags: ['Algorithm Design', 'C#', 'SAT Collision', '2D Bin Packing', 'Live Demo ↗'],
    to: '/work/autovas',
  },
  {
    title: 'Project EDEN',
    description: 'A half-shift wasted on one Excel query. I replaced it with a 10-second API.',
    tags: ['ASP.NET Core', 'SQL Server', 'Python', 'Digital Transformation', 'PT Mattel Indonesia'],
    to: '/work/eden',
  },
  {
    title: 'Homize',
    description: 'The client said 12 million. I said 30 million — and proved why before writing a line of code.',
    tags: ['Laravel', 'WebSockets', 'Full-Stack', 'Technical Product Management'],
    to: '/work/homize',
  },
];

export default function Home() {
  return (
    <motion.div {...pageTransition}>
      {/* HERO */}
      <section className="pb-6 pt-1">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-content mx-auto"
        >
          <motion.p variants={fadeUp} custom={0} className="font-serif text-4xl md:text-6xl lg:text-7xl text-text leading-[1.15] max-w-[800px]">
            Most people ask &ldquo;can I?&rdquo;
          </motion.p>
          <motion.p variants={fadeUp} custom={1} className="font-serif text-4xl md:text-6xl lg:text-7xl text-text leading-[1.15] max-w-[800px] mt-2">
            I stopped asking that a long time ago.
          </motion.p>
          <motion.p variants={fadeUp} custom={2} className="font-serif text-4xl md:text-6xl lg:text-7xl text-accent leading-[1.15] max-w-[800px] mt-8">
            The only question is: will you?
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-12">
            <p className="text-sm text-muted tracking-wide uppercase">Moshe Dayan</p>
            <p className="text-muted mt-1">I build systems that replace broken ones.</p>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-bg text-sm rounded hover:bg-accent transition-colors"
            >
              See the Work &rarr;
            </Link>
            <a
              href="/Moshe_Dayan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text text-sm rounded hover:border-text transition-colors"
            >
              Get my CV
            </a>
          </motion.div>

          <motion.p variants={fadeUp} custom={5} className="mt-10 text-sm text-muted">
            Process Engineering Intern @ PT Mattel Indonesia · President University, 3.89 GPA · Jababeka Scholar
          </motion.p>
        </motion.div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="section-padding px-6">
        <div className="max-w-content mx-auto">
          <SectionReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-12">
              Selected Work
            </p>
          </SectionReveal>

          <div className="grid gap-8">
            {works.map((work, i) => (
              <SectionReveal key={work.to} delay={i * 0.5}>
                <WorkCard {...work} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="section-padding px-6">
        <div className="max-w-content mx-auto">
          <SectionReveal>
            <div className="max-w-prose">
              <h2 className="font-serif text-3xl md:text-4xl text-text mb-8">Hey — I&rsquo;m Moshe.</h2>
              <div className="space-y-4 text-muted text-body">
                <p>
                  Final-year Informatics student at President University.
                  I specialize in the space between engineering and product —
                  where the real problems live.
                </p>
                <p>
                  I&rsquo;ve built capacity planning systems for factory floors,
                  negotiated software contracts, and taught Taekwondo to kids.
                  None of that is a contradiction.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-block mt-8 text-text hover:text-accent transition-colors"
              >
                &rarr; More about me
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section id="contact" className="section-padding px-6 border-t border-border">
        <div className="max-w-content mx-auto">
          <SectionReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-text mb-4">
              Want to work together?
            </h2>
            <p className="text-muted mb-8">
              I&rsquo;m open to full-time roles, collaborations, and conversations.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="mailto:moshe4122004@gmail.com"
                className="text-text hover:text-accent transition-colors"
              >
                moshe4122004@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/moshedayan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/xympyo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  );
}
