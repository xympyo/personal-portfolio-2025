import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (to) => {
    setMobileOpen(false);
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = to;
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-content mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" className="font-serif text-xl text-text hover:text-accent transition-colors">
          Moshe Dayan
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) =>
            to.startsWith('/#') ? (
              <button
                key={to}
                onClick={() => handleNavClick(to)}
                className="text-sm text-muted hover:text-text transition-colors"
              >
                {label}
              </button>
            ) : (
              <Link
                key={to}
                to={to}
                className="text-sm text-muted hover:text-text transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-text transition-transform ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-bg border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map(({ to, label }) =>
                to.startsWith('/#') ? (
                  <button
                    key={to}
                    onClick={() => handleNavClick(to)}
                    className="text-left text-lg text-text hover:text-accent transition-colors"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg text-text hover:text-accent transition-colors"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
