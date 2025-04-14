import React from "react";
import photoFrame from "../assets/photo_frame.png";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-0">
      <div className="hidden lg:block w-1/6"></div>
      <div className="flex flex-col justify-center mt-40 w-full lg:w-auto">
        <h1 className="text-secondary text-small md:text-medium text-center mb-2">
          about me
        </h1>
        <div className="flex flex-col lg:flex-row gap-5 px-4 lg:px-10 w-full">
          <div className="w-full lg:w-auto">
            <img src={photoFrame} alt="" className="w-full lg:w-auto" />
          </div>
          <div className="flex flex-col items-start w-full lg:w-auto">
            <div className="flex flex-col gap-5 w-full lg:max-w-[80%]">
              <h1 className="text-medium text-secondary">hey, Moshe here!</h1>
              <p className="text-small font-light">
                At the time of developing this portfolio, I'm a 5th-semester
                Informatics student at President University, soon entering my
                6th semester. I have a strong foundation in digital design,
                UI/UX, web development, and software development.Additionally,
                with a concentration in Artificial Intelligence, I specialize in
                automation using Machine Learning and Deep Learning,
                particularly in computer vision and natural language processing.
              </p>
            </div>
            <a
              href="https://linkedin.com/in/moshedayan/"
              className="bg-secondary rounded-lg p-2 mt-2 w-full lg:w-auto text-center"
            >
              <p className="text-primary">Know me more via LinkedIn</p>
            </a>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/6"></div>
    </div>
  );
};

export default About;
