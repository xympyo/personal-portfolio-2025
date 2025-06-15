// src/components/HomeLayout.jsx
import React from "react";
import Navigation_Bar from "./components/Navigation_Bar";
import Hero_Section from "./components/Hero_Section";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
import Introduction from "./components/Introduction";

const HomeLayout = () => {
  return (
    <div>
      <Introduction />
      <Navigation_Bar />
      <Hero_Section />
      <Projects />
      <About />
      <Footer />
    </div>
  );
};

export default HomeLayout;
