import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Autovas from './pages/work/Autovas';
import Eden from './pages/work/Eden';
import Homize from './pages/work/Homize';
import AutovasDemo from './pages/AutovasDemo';
import ScrollToTop from './components/ScrollToTop';
import { inject } from '@vercel/analytics';

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/work/autovas" element={<Autovas />} />
            <Route path="/work/eden" element={<Eden />} />
            <Route path="/work/homize" element={<Homize />} />
            <Route path="/autovas" element={<AutovasDemo />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <inject></inject>
    </>
  );
}
