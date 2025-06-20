import React from "react";
import photoFrame from "../assets/photo_frame.png";
import { motion } from "framer-motion"; // <-- Import motion here

const About = () => {
  // Define variants for the container (the main content block)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child's animation
        delayChildren: 0.3, // Initial delay for the first child
      },
    },
  };

  // Define variants for individual child items
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible and slightly below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    }, // Animate to visible and original position
  };

  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-0">
      <div className="hidden lg:block w-1/6"></div>

      {/* Main content wrapper for About section */}
      <motion.div
        className="flex flex-col justify-center mt-40 w-full lg:w-auto overflow-y-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }} // Trigger when 40% in view, re-trigger every time
      >
        {/* Animate the main "about me" heading */}
        <motion.h1
          className="text-secondary text-2xl md:text-2xl text-center mb-2 overflow-y-hidden"
          variants={itemVariants} // Applies fade/slide from itemVariants
        >
          about me
        </motion.h1>

        <div className="flex flex-row mt-8 lg:flex-row gap-5 px-4 lg:px-10 w-full overflow-y-hidden">
          {/* Image column, wrapped in motion.div */}
          <motion.div variants={itemVariants} className="grid grid-cols-12">
            <div className="col-span-3 lg:col-span-3"></div>
            <div className="col-span-6 lg:col-span-7">
              <img
                src={photoFrame}
                alt="Moshe Dayan"
                className="md:w-full lg:w-auto"
              />
            </div>
            <div className="col-span-3 lg:col-span-2"></div>
          </motion.div>

          {/* Text content column, wrapped in motion.div */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start w-full lg:w-auto"
          >
            <div className="flex flex-col gap-2 overflow-y-hidden">
              <motion.h1
                className="text-xl md:text-xl text-secondary overflow-y-hidden"
                variants={itemVariants} // Applies fade/slide from itemVariants
              >
                hey, Moshe here!
              </motion.h1>
              {/* Animate the main descriptive paragraph */}
              <motion.p
                className="text-sm md:text-base font-light "
                variants={itemVariants} // Applies fade/slide from itemVariants
              >
                "There's no such thing of can't, it's will you, or will you
                not?" For years, my father has always taught me the same thing
                everytime I said "I can't", back then I didn't understand much,
                but now I'm on my last year of university. <br />
                I'm an Informatics student at President University. I have a
                strong foundation in digital design, UI/UX, web development, and
                software development. Additionally, with a concentration in
                Artificial Intelligence, I specialize in automation using
                Machine Learning and Deep Learning, particularly in computer
                vision and natural language processing.
              </motion.p>
            </div>
            {/* Animate the LinkedIn button */}
            <motion.a
              href="https://linkedin.com/in/moshedayan/"
              target="_blank"
              className="bg-secondary rounded-lg p-2 mt-4 lg:w-auto text-center"
              variants={itemVariants} // Applies fade/slide from itemVariants
            >
              <p className="text-primary text-sm md:text-base">
                Know me more via LinkedIn
              </p>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <div className="hidden lg:block w-1/6"></div>
    </div>
  );
};

export default About;
