import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../lib/motion';
import SectionReveal from '../components/SectionReveal';

export default function About() {
  useEffect(() => {
    document.title = 'About — Moshe Dayan';
  }, []);

  return (
    <motion.div {...pageTransition}>
      <section className="section-padding px-6">
        <div className="max-w-prose mx-auto">
          <SectionReveal>
            <img 
              src="/MosheDayan.JPG" 
              alt="Moshe Dayan" 
              className="rounded-2xl w-full max-w-sm h-80 object-cover mb-10"
            />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text leading-[1.1] mb-4">
              About Moshe Dayan
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted font-mono mt-2 mb-8">
              <span>PT Mattel Indonesia</span>
              <span className="text-border">&middot;</span>
              <span>IOFEST 2025 &middot; Top 4 Nationally</span>
              <span className="text-border">&middot;</span>
              <span>FINPROTION 2025 &middot; Best Project</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div className="space-y-6 text-muted text-body leading-relaxed">
              <p>
                I&rsquo;m a final-year Informatics student at President University,
                Cikarang, Indonesia.
              </p>
              <p>
                I&rsquo;m not a genius. Never was.
                I&rsquo;ve lost more competitions than I&rsquo;ve won,
                failed more approaches than I&rsquo;ve shipped.
              </p>
              <p>
                I don&rsquo;t stop when it gets hard.
                Not because I&rsquo;m tough.
                Because stopping feels worse.
              </p>
              <p>
                College taught me I was good.
                Work taught me good wasn&rsquo;t enough.
              </p>
              <p>
                Smart gets you in the room.
                Reliable keeps you there.
                I learned that the hard way.
                It&rsquo;s raining, but we dance anyway.
              </p>
              <p className="mt-8 mb-2">
                Targeting APM and product roles at technology companies.
              </p>
              <p>
                I want to be in the room where the decisions get made —
                technical enough to build,
                business-minded enough to know what&rsquo;s worth building.
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
                <span className="text-text">Understanding problems before touching solutions.</span>{' '}
                I spent my first weeks at Mattel on the factory floor —
                talking to mechanics, learning what a Tampo machine
                physically does before modeling it in a database.
                Bad code for the right problem beats perfect code
                for the wrong one.
              </p>
              <p>
                <span className="text-text">Explaining things across the gap.</span>{' '}
                I&rsquo;ve taught Taekwondo to children and briefed
                factory managers on algorithm design.
                The skill is identical: find where someone&rsquo;s mental
                model breaks, rebuild it from there.
              </p>
              <p>
                <span className="text-text">Staying in rooms I&rsquo;m not supposed to stay in.</span>{' '}
                Most engineers don&rsquo;t want to be in the budget
                conversation, the client negotiation,
                the change management meeting.
                I&rsquo;ve learned to be useful there too.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-serif text-xl md:text-2xl text-text mb-6">
                Tools
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted mb-2">
                    Strong in:
                  </div>
                  <div className="text-text">
                    Python · SQL · JavaScript / React · Laravel · Figma
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted mb-2">
                    Know well enough:
                  </div>
                  <div className="text-text">
                    ASP.NET Core · Flutter · PHP · MySQL · REST APIs · WebSockets · Firebase
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted mb-2">
                    Currently learning:
                  </div>
                  <div className="text-text">
                    Google Project Management · <span style={{ color: '#C8470D' }}>whatever the next problem needs</span>
                  </div>
                </div>
              </div>
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
