import { motion } from 'framer-motion';
import { pageTransition } from '../lib/motion';
import SectionReveal from '../components/SectionReveal';

export default function About() {
  return (
    <motion.div {...pageTransition}>
      <section className="section-padding px-6">
        <div className="max-w-prose mx-auto">
          <SectionReveal>
            <img 
              src="/MosheDayan.JPG" 
              alt="Moshe Dayan" 
              className="rounded-2xl w-full max-w-sm mb-10"
            />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text leading-[1.1] mb-12">
              About Moshe Dayan
            </h1>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div className="space-y-6 text-muted text-body leading-relaxed">
              <p>
                I&rsquo;m a final-year Informatics student at President University,
                Cikarang, Indonesia. GPA 3.89. Jababeka Scholar.
                Currently interning as a Process Engineer at PT Mattel Indonesia,
                where my actual job title and my actual job description
                have very little to do with each other.
              </p>
              <p>
                I build things. Specifically, I build things that replace
                other things that were broken.
              </p>
              <p>
                I&rsquo;m not a genius. I was not a gifted kid.
                I&rsquo;ve lost more competitions than I&rsquo;ve won,
                failed more approaches than I&rsquo;ve shipped,
                and spent more time confused than certain.
              </p>
              <p>
                What I have is will. And the ability to stay in a problem
                until it stops being a problem.
              </p>
              <p>
                That sounds simple. It isn&rsquo;t. Most people leave
                before the problem yields. I stay.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-prose mx-auto">
          <SectionReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-text mb-8">
              What I&rsquo;m good at
            </h2>
            <div className="space-y-6 text-muted text-body leading-relaxed">
              <p>
                <span className="text-text">Building systems, not just features.</span>{' '}
                I think in architecture — how the pieces connect,
                where the failure points are, what happens at scale.
              </p>
              <p>
                <span className="text-text">Explaining things.</span>{' '}
                I taught Taekwondo to children.
                I&rsquo;ve briefed factory managers on algorithm design.
                The skill is the same: find where someone&rsquo;s mental model
                breaks down, and rebuild it from there.
              </p>
              <p>
                <span className="text-text">Working in the seam between technical and business.</span>{' '}
                I can read a P&amp;L and write a SQL schema in the same afternoon.
                I find the gap between what engineers build and
                what businesses actually need — and I close it.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-prose mx-auto">
          <SectionReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-text mb-8">
              Currently
            </h2>
            <ul className="space-y-3 text-muted text-body">
              <li className="flex gap-3">
                <span className="text-accent mt-1.5">·</span>
                <span>Final semester, Bachelor of Informatics, President University</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1.5">·</span>
                <span>Process Engineering Intern, PT Mattel Indonesia (Aug 2025 – Present)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1.5">·</span>
                <span>Google Project Management Certificate (in progress)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1.5">·</span>
                <span>Rebuilding this portfolio from scratch (the old one was embarrassing and I&rsquo;m fixing it)</span>
              </li>
            </ul>
          </SectionReveal>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32 border-t border-border pt-24 md:pt-32">
        <div className="max-w-prose mx-auto">
          <SectionReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-text mb-8">
              Find me
            </h2>
            <div className="space-y-3 text-muted text-body">
              <p>
                <a href="mailto:moshe4122004@gmail.com" className="text-text hover:text-accent transition-colors">
                  moshe4122004@gmail.com
                </a>
              </p>
              <p>
                <a href="https://linkedin.com/in/moshedayan" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors">
                  linkedin.com/in/moshedayan
                </a>
              </p>
              <p>
                <a href="https://github.com/xympyo" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors">
                  github.com/xympyo
                </a>
              </p>
              <p>moshedyn.site</p>
              <p>Cikarang, Bekasi, Indonesia</p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  );
}
