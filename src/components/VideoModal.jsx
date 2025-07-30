"use client";
import React from "react";
import Image from "next/image";
import ReactPlayer from "react-player/youtube";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PiPlayFill } from "react-icons/pi";
import { IconContext } from "react-icons";

function VideoModal({ VideoUrl, ImageUrl, textOnImage }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="col-span-3 relative">
            <div className="relative">
              <Image height="1080" width="1920" src={ImageUrl} alt="image" />
              <IconContext.Provider
                value={{
                  color: "#382f92",
                  size: "3em",
                  className: "global-class-name",
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                  <PiPlayFill />
                </div>
              </IconContext.Provider>
            </div>
            {textOnImage ? (
              <div className="lg:absolute lg:bottom-2 mt-5 lg:mt-0 lg:px-3 text-md">
                <p className="text-left">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum
                </p>
                <ul className="flex gap-3 mb-3 text-[12px] text-gray-700 items-baseline lg:text-white lg:text-[14px] lg:mt-3">
                  <li className="lg:block hidden">
                    By:
                    <span className="text-[#382f92] font-bold">
                      {" "}
                      Author Name
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faClock} size="sm" />
                    <span> March 30 2023</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faComment} /> 12
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#382f92] flex items-center ">
          <ReactPlayer url={VideoUrl} controls={true} playing={true} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VideoModal;
