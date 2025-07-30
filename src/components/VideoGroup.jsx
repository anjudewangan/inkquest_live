"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoModal from "./VideoModal";

function VideoGroup() {
  const [category, setcategory] = useState("All");

  const [image, setImage] = useState("");

  const data = {
    All: "https://www.wsupercars.com/wallpapers-wide/Formula-1/Mercedes/2023-Formula1-Mercedes-AMG-F1-W14-E-Performance-002-1080w.jpg",
    Technology:
      "https://www.wsupercars.com/wallpapers-wide/Formula-1/Scuderia-Ferrari/2023-Formula1-Ferrari-SF-23-003-1080w.jpg",
    Business:
      "https://www.wsupercars.com/wallpapers-regular/Formula-1/Red-Bull-Racing/2022-Formula1-Red-Bull-Racing-RB18-001-1080.jpg",
    Sports:
      "https://www.wsupercars.com/wallpapers-regular/Formula-1/Williams/2023-Formula1-Williams-FW45-003-1080.jpg",
  };

  const categoryList = ["All", "Technology", "Business", "Sports"];

  useEffect(() => {
    setImage(data[category]);
  }, [category]);

  return (
    <>
      <div className="bg-black px-2 lg:px-5 pt-11 text-white">
        <div className="lg:flex lg:px-8 pl-3">
          <h5 className=" before:absolute before:h-4 before:w-4 before:bg-[#382f92] before:mt-1"></h5>
          <p className="text-xl font-bold tracking-wider ml-7">VIDEOS GUIDE</p>
          <ul className="flex gap-2 ml-auto cursor-pointer">
            {categoryList.map((val) => (
              <li
                key={val}
                onClick={(e) => {
                  setcategory(e.target.innerText);
                }}
                className={`${
                  category === val ? "text-[#382f92] font-bold" : ""
                }  tracking-wide`}
              >
                {val}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 w-full">
          <swiper-container
            centered-slides="true"
            autoplay-delay="2500"
            autoplay-disable-on-interaction="false"
            slides-per-view="1"
          >
            {Array(3)
              .fill(4)
              .map((_, val) => (
                <swiper-slide key={val}>
                  <div className="grid lg:grid-cols-6 lg:px-1 p-4 w-[85%] lg:w-full">
                    <div className="col-span-2 lg:col-span-3 px-1 relative">
                      <VideoModal
                        ImageUrl={image}
                        VideoUrl="https://youtu.be/jcgM1W6CtqA?si=ccLeBnT8GT3n4b9k"
                        textOnImage={true}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-3 px-1 relative">
                      <VideoModal
                        ImageUrl={image}
                        VideoUrl="https://youtu.be/jcgM1W6CtqA?si=ccLeBnT8GT3n4b9k"
                        textOnImage={true}
                      />
                    </div>
                    {Array(3)
                      .fill(4)
                      .map((_, idx) => (
                        <div
                          className=" group mt-5 lg:px-3 col-span-2  cursor-pointer"
                          key={idx}
                        >
                          <div>
                            <VideoModal
                              ImageUrl={image}
                              VideoUrl="https://youtu.be/jcgM1W6CtqA?si=ccLeBnT8GT3n4b9k"
                              textOnImage={false}
                            />
                          </div>
                          <div className="mt-5">
                            <p className="px-1 group-hover:text-[#382f92]">
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Rerum
                            </p>
                            <ul className="flex mt-1 text-[12px] gap-3 text-gray-700 items-baseline">
                              <li>
                                <FontAwesomeIcon icon={faClock} size="sm" />
                                <span> March 30 2023</span>
                              </li>
                              <li>
                                <FontAwesomeIcon icon={faComment} /> 12
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </swiper-slide>
              ))}
          </swiper-container>
        </div>
      </div>
    </>
  );
}

export default VideoGroup;
