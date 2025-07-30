"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { YouTubeEmbed } from "@next/third-parties/google";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SliderNavigation.css";
import Titles from "./Titles";
import "./YoutubeShorts.css";

function YtShorts() {
  const [shorts, setShorts] = useState();
  const [windowSize, setWindowSize] = useState();
  useEffect(() => {
    fetch(`/api/shorts?limit=10`)
      .then((res) => res.json())
      .then((data) => setShorts(data.data));
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));
  }, []);
  if (!shorts || shorts.length === 0) {
    return null;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: windowSize <= 450 ? 2 : 6,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <>
      <div className="dark:bg-black dark:text-white">
        <div className="container">
          <div className="mb-2">
            <div className="flex items-center gap-2 ">
              <div className="h-4 w-4 bg-[#382f92]" content=" " />
              <h3 className="text-2xl font-bold tracking-wider">
                <Titles title={"youtubeShorts"} />
              </h3>
            </div>
          </div>
          <Slider {...settings}>
            {shorts.map((value) => (
              <div key={value.ShortUrl} className="px-2 w-[250px]">
                {/* <YouTubeEmbed
                  videoid={value.ShortUrl}
                  height={500}
                  width={350}
                  params="controls=0"
                /> */}
                <iframe
                  src={`https://www.youtube.com/embed/${value.ShortUrl}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media;  web-share"
                  width="250"
                  height="300"
                ></iframe>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default YtShorts;
