import React from "react";

const Navigation_Bar = () => {
  return (
    <>
      <div className="flex justify-end">
        <div className="invisible lg:visible flex mx-5 mt-5 normal grid-cols-4 gap-3">
          <a href="">
            <p className="secondary font-normal underline">you're here</p>
          </a>
          <a href="">
            <p className="secondary font-normal">projects</p>
          </a>
          <a href="">
            <p className="secondary font-normal">about me</p>
          </a>
          <a href="">
            <p className="secondary font-normal">where 2 find me</p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation_Bar;
