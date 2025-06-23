import React from "react";
import Magnet from "./Magnet/Magnet";
import { motion } from "framer-motion"; // <-- Import motion here

const Navigation_Bar = () => {
  // Define variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each child's animation
        delayChildren: 0.1, // Initial delay for the first child
      },
    },
  };

  // Define variants for individual child items
  const itemVariants = {
    hidden: { opacity: 0, y: -20 }, // Start invisible and slightly above
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    }, // Animate to visible and original position
  };

  return (
    // Main container for the Navbar animation
    <motion.div
      className="flex flex-row justify-between mx-5 mt-5"
      variants={containerVariants}
      initial="hidden" // Starts hidden
      whileInView="visible" // Animates to visible immediately on mount
      viewport={{ once: false, amount: 0.2 }}
      // No 'viewport' needed as it's always visible on load
    >
      {/* Moshe Dayan name/logo */}
      <motion.a
        href="/"
        className="text-secondary text-sm md:text-2xl overflow-hidden"
        variants={itemVariants}
      >
        Moshe Dayan
      </motion.a>

      {/* Projects link (inside Magnet) */}
      <motion.div variants={itemVariants}>
        {" "}
        {/* Wrap Magnet in motion.div */}
        <Magnet
          wrapperClassName="flex"
          magnetStrength={20}
          children={
            <a className="p-2" href="/projects">
              Projects
            </a>
          }
        ></Magnet>
      </motion.div>
    </motion.div>
  );
};

export default Navigation_Bar;
