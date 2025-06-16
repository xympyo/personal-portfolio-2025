// src/components/HomeLayout.jsx
import React from "react";
import Navigation_Bar from "./components/Navigation_Bar";
import Footer from "./components/Footer";
import ProjectDetails from "./components/ProjectsDetail";

const ProjectsLayout = () => {
  return (
    <div>
      <Navigation_Bar />
      <ProjectDetails />
      <Footer />
    </div>
  );
};

export default ProjectsLayout;
