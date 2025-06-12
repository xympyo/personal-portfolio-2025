import React from "react";
import Navigation_Bar from "./components/Navigation_Bar";
import Hero_Section from "./components/Hero_Section";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
import Introduction from "./components/Introduction";

const App = () => {
  return (
    <div>
      <Introduction></Introduction>
      <Navigation_Bar></Navigation_Bar>
      <Hero_Section></Hero_Section>
      <Projects></Projects>
      <About></About>
      <Footer></Footer>
    </div>
  );
};

export default App;
