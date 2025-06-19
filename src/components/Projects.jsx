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
  // Define variants for individual child items
  // The 'visible' variant now accepts a 'custom' prop (named 'delayFactor' here)
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible and slightly below
    visible: (delayFactor) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delayFactor * 0.1, // Calculate delay based on the custom prop
      },
    }),
  };

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
          transition={{ duration: 0.6, delay: 0 }} // Starts almost immediately
        >
          my projects
        </motion.h1>
        <div className="flex flex-col relative">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 grid-flow-dense w-full overflow-y-hidden">
            {/* Project 1: topLeft (custom={0} -> delay 0*0.1 = 0s) */}
            <motion.div
              className="flex row-span-1 sm:row-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={0} // Pass custom delay factor
            >
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
            </motion.div>

            {/* Project 2: left (custom={1} -> delay 1*0.1 = 0.1s) */}
            <motion.div
              className="flex row-span-1 sm:row-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={1} // Pass custom delay factor
            >
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
            </motion.div>

            {/* Project 3/4: upperTop & lowerTop (custom={2} -> delay 2*0.1 = 0.2s)
                Note: These two sub-projects will animate together as one block
                because they share the same direct motion.div parent. If you
                want them to stagger *within* this column, each 'a' tag would need
                to be a motion.div, and this outer block would need staggerChildren.
                For simplicity and current structure, we treat them as one unit here.
            */}
            <motion.div
              className="flex flex-col col-span-2 row-span-1 sm:row-span-2 gap-5"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={2} // Pass custom delay factor
            >
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
            </motion.div>

            {/* Project 5: right (custom={3} -> delay 3*0.1 = 0.3s) */}
            <motion.div
              className="flex row-span-1 sm:row-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={3} // Pass custom delay factor
            >
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
            </motion.div>

            {/* Project 6: topRight (custom={4} -> delay 4*0.1 = 0.4s) */}
            <motion.div
              className="flex row-span-1 sm:row-span-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={4} // Pass custom delay factor
            >
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
            </motion.div>
          </div>

          {/* Animate the "See more" link */}
          <motion.div
            className="flex justify-end mt-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.8 }} // Trigger when more visible
            transition={{ duration: 0.6, delay: 0.5 }} // Adjust delay to be after the last project (relative to project's max delay)
          >
            <a href="projects" className="cursor-pointer">
              {`>`} See more here...
            </a>
          </motion.div>
        </div>
      </div>
      <div className="hidden lg:block w-1/6"></div>
    </div>
  );
};

export default Projects;
