import React from "react";
import DotGrid from "./DotGrid/DotGrid";
import DecryptedText from "./DecryptedText/DecryptedText";
import RotatingText from "./RotatingText/RotatingText";

function Introduction() {
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
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="flex flex-col"
      >
        <DecryptedText
          text="Moshe Dayan"
          animateOn="view"
          revealDirection="center"
          className="md:text-lg text-sm font-light text-[#404040]"
          speed={8}
          maxIterations={40}
          sequential={true}
        ></DecryptedText>
        <div className="flex flex-row w-full align-middle">
          <p className="inline-block text-[#404040] md:text-sm text-xs self-center">
            I have a strong foundation of&nbsp;
          </p>
          <RotatingText
            texts={[
              "Web Development",
              "Software Development",
              "Backend Development",
              "Artificial Intelligence",
            ]}
            rotationInterval={1500}
            splitBy="characters"
            mainClassName="text-[#1d1d1d] font-bold md:text-sm text-xs bg-[#54fed5] py-1 px-2 rounded-lg"
          ></RotatingText>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
