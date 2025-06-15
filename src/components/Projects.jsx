import React from "react";
import topLeft from "../assets/projects_img/final_wmp.jpg";
import left from "../assets/projects_img/spacepal.jpg";
import upperTop from "../assets/projects_img/komplenifas.jpg";
import lowerTop from "../assets/projects_img/ssip.jpg";
import topRight from "../assets/projects_img/prediver.jpg";
import right from "../assets/projects_img/budi_nlug.jpg";
import "./ProjectsHover.css";

const Projects = () => {
  return (
    <div className="flex justify-center mt-20 sm:mt-40 px-4 lg:px-0">
      <div className="hidden lg:block w-1/6"></div>
      <div className="flex flex-col justify-center w-full lg:w-auto">
        <h1 className="text-lg md:text-2xl text-center mb-2 overflow-y-hidden">
          my projects
        </h1>
        <div className="flex flex-col relative">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 grid-flow-dense w-full">
            <div className="flex row-span-1 sm:row-span-2">
              <div className="col-span-1"></div>
              <a
                href="https://www.linkedin.com/in/moshedayan/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 md:col-span-3 w-full h-auto object-cover"
                style={{ textDecoration: "none" }}
              >
                <div className="project-image-container w-full h-auto object-cover">
                  <img
                    src={topLeft}
                    alt="Firebase Application Image"
                    className="project-image"
                  />
                  <div className="flex flex-col project-hover-overlay">
                    <p className="text-primary text-base text-center">
                      Firebase Application
                    </p>
                    <span className="project-hover-text">View Project</span>
                    <p className="text-primary text-xs text-center">
                      This application doesn't have ready to use application
                    </p>
                  </div>
                </div>
              </a>
              <div className="col-span-1"></div>
            </div>
            <div className="flex row-span-1 sm:row-span-2">
              <a
                href="https://www.linkedin.com/in/moshedayan/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-auto object-cover"
                style={{ textDecoration: "none" }}
              >
                <div className="project-image-container w-full h-auto object-cover">
                  <img
                    src={left}
                    alt="Spacepal Software Image"
                    className="project-image"
                  />
                  <div className="flex flex-col project-hover-overlay">
                    <p className="text-primary text-base text-center">
                      Spacepal Children Learning Software
                    </p>
                    <span className="project-hover-text">View Project</span>
                    <p className="text-primary text-xs text-center">
                      This application doesn't have ready to use application
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex flex-col col-span-2 row-span-1 sm:row-span-2 gap-5">
              <div className="flex">
                <a
                  href="https://komplenifas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-auto object-cover"
                  style={{ textDecoration: "none" }}
                >
                  <div className="project-image-container w-full h-auto object-cover">
                    <img
                      src={upperTop}
                      alt="Komplenifas Project"
                      className="project-image"
                    />
                    <div className="flex flex-col project-hover-overlay">
                      <p className="text-primary text-base text-center">
                        Komplenifas
                      </p>
                      <span className="project-hover-text">View Project</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex">
                <a
                  href="https://www.linkedin.com/in/moshedayan/details/projects/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-auto object-cover"
                  style={{ textDecoration: "none" }}
                >
                  <div className="project-image-container w-full h-auto object-cover">
                    <img
                      src={lowerTop}
                      alt="SSIP Project"
                      className="project-image"
                    />
                    <div className="flex flex-col project-hover-overlay">
                      <p className="text-primary text-base text-center">
                        Cepi's Cafe <br />
                        Full Stack Laravel mySQL
                      </p>
                      <span className="project-hover-text">View Project</span>
                      <p className="text-primary text-xs text-center">
                        This application doesn't have ready to use application
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex row-span-1 sm:row-span-2">
              <a
                href="https://www.linkedin.com/in/moshedayan/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-auto object-cover"
                style={{ textDecoration: "none" }}
              >
                <div className="project-image-container w-full h-auto object-cover">
                  <img
                    src={right}
                    alt="Budi NLUG Project"
                    className="project-image"
                  />
                  <div className="flex flex-col project-hover-overlay">
                    <p className="text-primary text-base text-center">
                      AI ChatBot using custom model called Budi
                    </p>
                    <span className="project-hover-text">View Project</span>
                    <p className="text-primary text-xs text-center">
                      This application doesn't have ready to use application
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex row-span-1 sm:row-span-2">
              <a
                href="https://www.linkedin.com/in/moshedayan/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-auto object-cover"
                style={{ textDecoration: "none" }}
              >
                <div className="project-image-container w-full h-auto object-cover">
                  <img
                    src={topRight}
                    alt="AI ChatBot Budi"
                    className="project-image"
                  />
                  <div className="flex flex-col project-hover-overlay">
                    <p className="text-primary text-base text-center">
                      RFT Based Classification Software Prediver
                    </p>
                    <span className="project-hover-text">View Project</span>
                    <p className="text-primary text-xs text-center">
                      This application doesn't have ready to use application
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <a href="projects" className="cursor-pointer">
              {`>`} See more here...
            </a>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/6"></div>
    </div>
  );
};

export default Projects;
