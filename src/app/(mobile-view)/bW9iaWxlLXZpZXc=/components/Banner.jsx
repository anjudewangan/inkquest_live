"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
function Banner({ data }) {
  return (
    <div className="mt-3">
      <h1 className="text-2xl font-bold mb-3">Banner</h1>
      <Swiper
        spaceBetween={5}
        slidesPerView={1}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        className="p-2"
      >
        {data.map((value) => (
          <SwiperSlide key={value.id} className="relative">
            <div className="relative">
              {/* Image */}
              <Image
                src={
                  value.local_image_url
                    ? value.local_image_url
                    : value.Title_image
                }
                alt="Image Alt Text"
                width="1920"
                height="1080"
                className="w-full h-[25vh] lg:h-[100vh] rounded-xl"
              />

              {/* Gray Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-transparent opacity-50 rounded-lg group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center text-white text-2xl font-semibold pb-2 px-2">
                <Link
                  href={`/bW9iaWxlLXZpZXc=/news/${value.Heading.replaceAll(
                    " ",
                    "-"
                  )}`}
                >
                  {value.Title.slice(0, 80)} ...
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
