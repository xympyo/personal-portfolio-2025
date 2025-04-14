import React from "react";

const Footer = () => {
  return (
    <div className="mx-4 lg:mx-12 mt-20 mb-4">
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex mt-6 justify-center md:justify-start">
          <p className="text-secondary text-small">Moshe Dayan</p>
        </div>
        <div className="flex justify-center md:justify-between mt-4 gap-4">
          <a href="https://github.com/xympyo">
            <img src="/icons/github.svg" alt="" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/moshedayan/">
            <img src="/icons/linkedin.svg" alt="" className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/moshe_dyn/">
            <img src="/icons/instagram.svg" alt="" className="w-6 h-6" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=moshe4122004@gmail.com&su=Hey Moshe!&body=Type what you want in here!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/mail.svg" alt="" className="w-6 h-6" />
          </a>
        </div>
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
};

export default Footer;
