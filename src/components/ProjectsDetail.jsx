import React, { useState } from "react";
import projectData from "../json_data/projects.json";

const ProjectDetails = () => {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store the data of the project currently displayed in the modal
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="mx-5 mt-4">
      <div className="flex flex-col items-center">
        <p className="text-lg md:text-xl mb-6 text-[#404040]"> My Projects</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {projectData.map((project) => (
            <div
              key={project.title}
              className="relative group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300"
              onClick={() => openModal(project)}
            >
              <img
                src={`/assets/squared_projects_img/${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold text-center p-4">
                  {project.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-auto relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold overflow-y-hidden"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#404040] overflow-y-hidden">
              {selectedProject.title}
            </h2>
            <img
              src={`/assets/squared_projects_img/${selectedProject.image}`}
              alt={selectedProject.title}
              className="w-full h-auto object-contain rounded-lg mb-4"
            />
            {selectedProject.description.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-2 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
