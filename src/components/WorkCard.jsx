import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardHover } from '../lib/motion';

export default function WorkCard({ title, description, tags, to }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="bg-surface border border-border rounded-lg p-8 cursor-pointer group"
    >
      <Link to={to} className="block">
        <h3 className="font-serif text-3xl md:text-4xl text-text mb-4">{title}</h3>
        <p className="text-muted text-body leading-relaxed mb-6 max-w-[540px]">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-muted bg-bg px-2.5 py-1 rounded border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-text group-hover:text-accent transition-colors">
          Read Case Study &rarr;
        </span>
      </Link>
    </motion.div>
  );
}
