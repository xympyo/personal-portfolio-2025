import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageTransition } from '../lib/motion';
import SectionReveal from './SectionReveal';

export default function CaseStudyLayout({ title, subtitle, meta, children }) {
  return (
    <motion.div {...pageTransition}>
      <section className="section-padding px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/#work"
            className="inline-block text-sm text-muted hover:text-text transition-colors mb-12"
          >
            &larr; Back to Work
          </Link>

          <SectionReveal>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text leading-[1.1]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted mt-4 text-lg">{subtitle}</p>
            )}
            {meta && (
              <p className="text-sm font-mono text-muted mt-6">{meta}</p>
            )}
          </SectionReveal>
        </div>
      </section>

      {children}
    </motion.div>
  );
}

export function CaseSection({ label, title, children }) {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          {label && (
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
              {label}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-2xl md:text-3xl text-text mb-8">
              {title}
            </h2>
          )}
          <div className="space-y-6 text-muted text-body leading-relaxed">
            {children}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

export function TechBlock({ children }) {
  return (
    <div className="bg-dark text-bg rounded-lg p-6 md:p-8 my-8 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
      {children}
    </div>
  );
}
