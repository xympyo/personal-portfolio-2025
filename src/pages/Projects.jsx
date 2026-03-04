import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../lib/motion';
import SectionReveal from '../components/SectionReveal';

const filters = ['All', 'AI/ML', 'Mobile', 'Web', 'Competition'];

const projects = [
  {
    title: 'VisionQ — Deep Learning Package Verification',
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
          <SectionReveal>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text leading-[1.1]">
              Everything Else
            </h1>
            <p className="text-muted mt-6 max-w-prose">
              The experiments, course projects, competition entries,
              and things I built to learn something.
              Not case studies — cards. Scroll, filter, explore.
            </p>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div className="flex flex-wrap gap-3 mt-12 mb-12">
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
                <div className="bg-surface border border-border rounded-lg p-6 h-full">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl text-text">{project.title}</h3>
                    <span className="text-xs font-mono text-muted whitespace-nowrap mt-1">
                      {project.context}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-muted text-sm mb-4">{project.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted bg-bg px-2.5 py-1 rounded border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
