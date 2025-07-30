"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import "./MobilePopup.css";
function MobilePopup() {
  const [mobilePopup, setmobilePopup] = useState(false);
  useEffect(() => {
    // Adjust timeout as needed
    if (window.innerWidth <= 450 && navigator.userAgent.includes("Android")) {
      setTimeout(() => {
        setmobilePopup(true);
      }, 4000);
    }
  }, []);
  return (
    <div
      className={`${
        mobilePopup ? "opacity-100 flex" : "opacity-0 hidden"
      }  fixed z-10 w-full h-[20rem] mobile-popup top-[70%] transition-all ease-in-out`}
    >
      <div className=" bg-black w-full text-white p-4">
        <div
          className="flex justify-end mb-2 pr-3"
          onClick={() => setmobilePopup(false)}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            className="text-[#392b95] "
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex gap-x-2 items-center ">
            <div>
              <Image
                src="/assets/img/inkquest-img.jpeg"
                alt="logo"
                width="40"
                height="48"
                id="Logo"
              />
            </div>
            <div className="text-lg">For better experience</div>
            <div className="bg-[#392b95] px-2 py-1 rounded-xl">
              <a href="intent://scan/#Intent;scheme=appName;package=io.kodular.e_jeevita_rao.InkquestMedia;end">
                Read in App
              </a>
            </div>
          </div>
          <div className="flex gap-x-2 items-center ">
            <div>
              <Image
                src="/assets/img/chrome.png"
                alt="logo"
                width="40"
                height="48"
                id="Logo"
              />
            </div>
            <div className="text-lg">For better experience</div>
            <div>
              <button
                className="bg-[#392b95] px-2 py-1 rounded-xl"
                onClick={() => setmobilePopup(false)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobilePopup;
