import React from "react";
import topLeft from "../assets/projects_img/final_wmp.jpg";
import left from "../assets/projects_img/spacepal.jpg";
import upperTop from "../assets/projects_img/komplenifas.jpg";
import lowerTop from "../assets/projects_img/ssip.jpg";
import topRight from "../assets/projects_img/prediver.jpg";
import right from "../assets/projects_img/budi_nlug.jpg";

const Projects = () => {
  return (
    <div className="flex justify-center mt-20 sm:mt-40 px-4 lg:px-0">
      <div className="hidden lg:block w-1/6"></div>
      <div className="flex flex-col justify-center w-full lg:w-auto">
        <h1 className="text-medium text-center mb-2">my projects</h1>
        <div className="flex">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 grid-flow-dense w-full">
            <div className="flex row-span-1 sm:row-span-2">
              <img
                src={topLeft}
                alt="Firebase Application Image"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex row-span-1 sm:row-span-2">
              <img
                src={left}
                alt="Spacepal Software Image"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-2 row-span-1 sm:row-span-2 gap-5">
              <div className="flex">
                <img
                  src={upperTop}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex">
                <img
                  src={lowerTop}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="flex row-span-1 sm:row-span-2">
              <img
                src={right}
                alt="Prediver Software Image"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex row-span-1 sm:row-span-2">
              <img
                src={topRight}
                alt="AI ChatBot Budi"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/6"></div>
    </div>
  );
};

export default Projects;
