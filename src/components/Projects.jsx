import React from "react";
import topLeft from "../assets/projects_img/final_wmp.jpg";
import left from "../assets/projects_img/spacepal.jpg";
import upperTop from "../assets/projects_img/komplenifas.jpg";
import lowerTop from "../assets/projects_img/ssip.jpg";
import topRight from "../assets/projects_img/prediver.jpg";
import right from "../assets/projects_img/budi_nlug.jpg";
import "./ProjectsHover.css";
import { motion } from "framer-motion"; // <-- Import motion here

const Projects = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Limit the number of animated items to 6 (for performance)
const MAX_ANIMATED_ITEMS = 6;
  return (
    <div className="flex justify-center mt-20 sm:mt-40 px-4 lg:px-0">
      <div className="hidden lg:block w-1/6"></div>
      <div className="flex flex-col justify-center w-full lg:w-auto">
        {/* Animate the main heading */}
        <motion.h1
          className="text-lg md:text-2xl text-center mb-2 overflow-y-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        >
          my projects
        </motion.h1>
        <div className="flex flex-col relative overflow-y-hidden">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-6 gap-4 grid-flow-dense w-full overflow-y-hidden"
            variants={itemVariants} // Apply the container variants
            initial="hidden" // Start with the 'hidden' state
            whileInView="visible" // Animate to 'visible' when in view
            viewport={{ once: false, amount: 0.15 }} // Trigger when 50% in view, re-trigger every time
          >
            <div>
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
            <div>
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
                      {/* Note for the user: Your 'ProjectsHover.css' might also have CSS transitions applied on :hover,
                        which could potentially conflict with Framer Motion's animations if not handled carefully.
                        Framer Motion is generally good at overriding CSS transitions, but it's worth noting. */}
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
          </motion.div>

          <div className="flex justify-end mt-2 overflow-y-hidden">
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
