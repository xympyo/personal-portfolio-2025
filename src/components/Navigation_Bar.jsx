import React from "react";
import Magnet from "./Magnet/Magnet";

const Navigation_Bar = () => {
  return (
    <>
      <div className="flex flex-row justify-between mx-5 mt-5">
        <a
          href="/"
          className="text-secondary text-sm md:text-2xl overflow-hidden"
        >
          Moshe Dayan
        </a>
        <div className="flex">
          <Magnet
            wrapperClassName="flex"
            magnetStrength={20}
            children={<a className="p-2" href="/projects">Projects</a>}
          ></Magnet>
        </div>
      </div>
    </>
  );
};

export default Navigation_Bar;
