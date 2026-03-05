import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../lib/motion';
import SectionReveal from '../components/SectionReveal';
import WorkCard from '../components/WorkCard';

const filters = ['All', 'AI/ML', 'Mobile', 'Web', 'Competition'];

const featuredWorks = [
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

const projects = [
  {
    title: 'Deep Learning Package Verification',
    context: 'PT Mattel Indonesia, 2025',
    description: '4-stage pipeline: YOLO → Hi-SAM → Parseq → Llama 4 Maverick/Scout',
    tags: ['Deep Learning', 'Computer Vision', 'NLP', 'Python'],
    categories: ['AI/ML'],
  },
  {
    title: 'Space Pals',
    context: '2024',
    description: "Children's learning software about space. FINPROTION 2025 Best Project.",
    tags: ['Flutter', 'Firebase', 'Mobile', 'Award Winner'],
    categories: ['Mobile', 'Competition'],
  },
  {
    title: 'TappyTale',
    context: '2025',
    description: "Children's storybook creation app. IOFEST 2025 Harapan 1 (Top 4 nationally).",
    tags: ['Flutter', 'Laravel', 'REST API', 'Award Winner'],
    categories: ['Mobile', 'Competition'],
  },
  {
    title: 'Budi Chatbot',
    context: '2025',
    description: 'Scientific Q&A chatbot using DialoGPT + Kaggle dataset.',
    tags: ['NLP', 'Flutter', 'DialoGPT', 'Python'],
    categories: ['AI/ML', 'Mobile'],
  },
  {
    title: 'Komplenifas',
    context: 'Live',
    description: null,
    tags: ['Web', 'Laravel', 'Live ↗'],
    categories: ['Web'],
  },
  {
    title: 'Prediver',
    context: '2024',
    description: 'Random Forest-based classification software.',
    tags: ['ML', 'Python', 'Scikit-learn'],
    categories: ['AI/ML'],
  },
  {
    title: 'SmartWasteOps',
    context: 'Capstone concept',
    description: 'Cloud architecture with Load Balancers + Auto-Scaling.',
    tags: ['Cloud', 'Architecture'],
    categories: ['Web'],
  },
  {
    title: 'Pyomanizer',
    context: 'Live',
    description: 'Built because the Shopee version was terrible. Runs text through 15 translation hops across Kazakh, Georgian, Mongolian, Arabic, Zulu, Welsh. No neural networks. 95% AI detector bypass rate. Sometimes the dumbest solution is the right one.',
    tags: ['Python', 'Google Translate', '95% bypass rate', 'Live ↗'],
    categories: ['Web'],
    link: 'https://pyomanizer.vercel.app',
  },
  {
    title: 'Pyostock',
    context: 'Live',
    description: 'Built because financial news was confusing. Now it isn\'t. AI summarizes each story. Built for personal use, kept public.',
    tags: ['Web', 'API', 'AI Summary', 'Live ↗'],
    categories: ['Web'],
    link: 'https://pyostock.vercel.app',
  },
];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.categories.includes(active));

  return (
    <motion.div {...pageTransition}>
      <section className="section-padding px-6">
        <div className="max-w-content mx-auto">
          {/* FEATURED WORK */}
          <SectionReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-12">
              Featured Work
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {featuredWorks.map((work, i) => (
              <SectionReveal key={work.to} delay={i * 0.5}>
                <WorkCard {...work} />
              </SectionReveal>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="border-t border-border mb-16"></div>

          {/* EVERYTHING ELSE */}
          <SectionReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-text mb-4">
              Everything Else
            </h2>
            <p className="text-muted mb-12 max-w-prose">
              The experiments, course projects, competition entries,
              and things I built to learn something.
              Not case studies — cards. Scroll, filter, explore.
            </p>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`text-sm px-4 py-2 rounded border transition-colors ${
                    active === f
                      ? 'bg-dark text-bg border-dark'
                      : 'bg-transparent text-muted border-border hover:border-text hover:text-text'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <SectionReveal key={project.title} delay={i * 0.3}>
                <div className="bg-surface border border-border rounded-lg p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl text-text">{project.title}</h3>
                    <span className="text-xs font-mono text-muted whitespace-nowrap mt-1">
                      {project.context}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-muted text-sm mb-4 flex-1">{project.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted bg-bg px-2.5 py-1 rounded border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono mt-4 transition-colors"
                      style={{ color: '#C8470D' }}
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
