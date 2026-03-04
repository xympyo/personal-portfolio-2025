import { motion } from 'framer-motion';
import { pageTransition } from '../lib/motion';
import AutovasDemoComponent from '../components/AutovasDemo';

export default function AutovasDemo() {
  return (
    <motion.div {...pageTransition}>
      <section className="section-padding px-6">
        <div className="max-w-content mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text leading-[1.1] mb-4">
            Autovas Demo
          </h1>
          <p className="text-muted mb-12 max-w-prose">
            Interactive 2D polygon packing engine. Compare bounding-box packing
            against polygon-aware SAT-based packing in real time.
          </p>
          <AutovasDemoComponent />
        </div>
      </section>
    </motion.div>
  );
}
