import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import ProjectsLayout from "./ProjectsLayout";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/projects" element={<ProjectsLayout />} />
      </Routes>
      <SpeedInsights />
    </div>
  );
};

export default App;
