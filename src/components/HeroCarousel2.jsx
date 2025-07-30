"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi } from "@/lib/mappings";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./verticalScroll.css";

function HeroCarousel2() {
  const [news, setnews] = useState();
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState(1080);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [slidesPerView, setslidesPerView] = useState(3);
  const swiperRef = useRef(null);
  useEffect(() => {
    fetch("/api/news?limit=7&sort-date=true&side-banner=1&trending=1")
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
    setIsClient(true);
    window.addEventListener("resize", () => {
      setWindowSize(document.documentElement.clientWidth);
    });
  }, []);
  if (swiperInstance) {
    swiperInstance.update();
    setTimeout(() => {
      swiperInstance.slideNext();
    }, 4000);
  }
  return (
    <>
      <div className=" lg:h-[80vh]   lg:bg-transparent p-2 lg:pb-14 pt-4 lg:pt-2">
        <h1 className="bg-indigo-700 p-1 mb-2 rounded-xl px-2 text-white text-xl">
          {isHindi ? Hindi["trendingNews"] : English["trendingNews"]}
        </h1>
        {isClient ? (
          <Swiper
            direction={windowSize <= 500 ? "horizontal" : "vertical"}
            slidesPerView={windowSize <= 500 ? 1 : 3}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="w-full h-full swpiper2"
            init={true}
            ref={swiperRef}
          >
            {news &&
              news.map((value) => (
                <SwiperSlide className="slide  " key={value._id["$oid"]}>
                  <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
                    <div className="relative">
                      <Image
                        src={
                          value.local_image_url
                            ? value.local_image_url
                            : value.Title_image
                        }
                        alt="image"
                        width="250"
                        height="100"
                        className="rounded-xl w-[100%] h-[175px] lg:h-[125px] 2xl:h-[175px] "
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(250, 175)
                        )}`}
                      />
                      <div className="absolute bottom-0 px-2  pb-2 bg-gradient-to-t from-gray-700 rounded-xl text-white h-full w-full grid content-end ">
                        <p>{value.Title.slice(0, 40)} ...</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : null}
      </div>
    </>
  );
}

export default HeroCarousel2;
