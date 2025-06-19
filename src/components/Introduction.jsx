import React from "react";
import DotGrid from "./DotGrid/DotGrid";
import DecryptedText from "./DecryptedText/DecryptedText";
import RotatingText from "./RotatingText/RotatingText";
import Magnet from "./Magnet/Magnet";
import { motion } from "framer-motion"; // Import motion

function Introduction() {
  // Define variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child will delay its animation by 0.2 seconds
        delayChildren: 0.3, // The first child will start after 0.3 seconds
      },
    },
  };

  // Define variants for individual child items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start invisible and slightly below
    visible: { opacity: 1, y: 0 }, // Animate to visible and original position
  };

  return (
    <div className="h-dvh w-full relative">
      <DotGrid
        dotSize={4}
        gap={16}
        baseColor="#65fed7"
        activeColor="#303030"
        proximity={160}
        speedTrigger={40}
        maxSpeed={5000}
        shockRadius={200}
        shockStrength={5}
        resistance={750}
        returnDuration={2}
      ></DotGrid>

      {/* Main content wrapper with Framer Motion */}
      <motion.div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="flex flex-col overflow-y-hidden"
        variants={containerVariants} // Apply the container variants
        initial="hidden" // Start with the 'hidden' state
        whileInView="visible" // Animate to 'visible' when in view
        viewport={{ once: false, amount: 0.5 }} // Trigger when 50% in view, re-trigger every time
      >
        {/* DecryptedText (will animate as a child item) */}
        <motion.div variants={itemVariants}>
          <DecryptedText
            text="Hi, my name is Moshe Dayan"
            animateOn="view" // This component might already have its own view animation, consider if you want both.
            revealDirection="center"
            className="md:text-lg text-sm font-light text-[#404040]"
            speed={20}
            maxIterations={40}
            sequential={true}
          ></DecryptedText>
        </motion.div>

        {/* Skills line (will animate as a child item) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row mt-2 md:mt-0 w-full align-middle"
        >
          <p className="inline-block text-[#404040] md:text-sm text-xs self-center">
            I have a strong foundation of&nbsp;
          </p>
          <RotatingText
            texts={[
              "Web Development",
              "Mobile Development",
              "Backend Development",
              "Artificial Intelligence",
            ]}
            rotationInterval={1500}
            splitBy="characters"
            mainClassName="text-[#1d1d1d] font-bold md:text-sm text-xs bg-[#54fed5] py-1 px-2 rounded-lg mt-2 md:mt-0"
          ></RotatingText>
        </motion.div>

        {/* Get my CV button (will animate as a child item) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-column justify-center align-middle"
        >
          <Magnet
            magnetStrength={32}
            padding={120}
            wrapperClassName="p-6 rounded-lg"
            children={
              <a
                href="/MosheDayan_CV.pdf"
                download="MosheDayan_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#54fed5] bg-[#1d1d1d] rounded-lg"
              >
                Get my CV
              </a>
            }
          ></Magnet>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Introduction;
