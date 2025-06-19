import React from "react";
import { motion } from "framer-motion"; // <-- Import motion here

const Footer = () => {
  // Define variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child's animation
        delayChildren: 0.2, // Initial delay for the first child
      },
    },
  };

  // Define variants for individual child items
  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start invisible and slightly below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    }, // Animate to visible and original position
  };

  return (
    // Main container for the Footer animation
    <motion.div
      className="mx-4 lg:mx-12 mt-20 mb-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }} // Trigger when 50% in view, re-trigger every time
    >
      <motion.hr variants={itemVariants} /> {/* Animate the HR line */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-hidden">
        {/* "Moshe Dayan" text */}
        <motion.div
          variants={itemVariants}
          className="flex mt-6 justify-center md:justify-start"
        >
          <p className="text-secondary text-small">Moshe Dayan</p>
        </motion.div>
        {/* Social media icons group */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-between mt-4 gap-4"
        >
          {/* Individual icons will appear together as one block if not individually motion.a's */}
          <a
            href="https://github.com/xympyo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/github.svg" alt="GitHub" className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/moshedayan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/moshe_dyn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=moshe4122004@gmail.com&su=Hey Moshe!&body=Type what you want in here!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/mail.svg" alt="Mail" className="w-6 h-6" />
          </a>
        </motion.div>
        <div className="hidden md:block"></div>{" "}
        {/* This div is hidden anyway, no animation needed */}
      </div>
    </motion.div>
  );
};

export default Footer;
