import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import ProjectsLayout from "./ProjectsLayout";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/projects" element={<ProjectsLayout />} />
      </Routes>
      <Analytics />
    </div>
  );
};

export default App;
