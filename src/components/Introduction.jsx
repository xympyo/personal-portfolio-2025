import React from "react";
import DotGrid from "./DotGrid/DotGrid";
import DecryptedText from "./DecryptedText/DecryptedText";

function Introduction() {
  return (
    <div className="h-dvh w-full relative">
      <DotGrid
        dotSize={4}
        gap={16}
        baseColor="#54fed5"
        activeColor="#303030"
        proximity={160}
        speedTrigger={40}
        maxSpeed={5000}
        shockRadius={200}
        shockStrength={5}
        resistance={750}
        returnDuration={2}
      ></DotGrid>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <DecryptedText
          text="Moshe Dayan"
          animateOn="view"
          revealDirection="center"
          className="md:text-4xl text-2xl font-light text-[#404040]"
          speed={8}
          maxIterations={40}
          sequential={true}
        ></DecryptedText>
      </div>
    </div>
  );
}

export default Introduction;
