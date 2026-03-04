import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion';

export default function SectionReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
