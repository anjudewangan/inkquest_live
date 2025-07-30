"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { useLanguageStore } from "@/store/languageStore";
import { categories } from "@/lib/mappings";

function Slider({ category }) {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [newsData, setNewsData] = useState();
  useEffect(() => {
    fetch(
      `/api/news?sort-date=true&limit=4${
        category ? `&category=${category}` : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => setNewsData(data.news));
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      modules={[Autoplay]}
      className="px-2"
    >
      {newsData &&
        newsData.map((value) => (
          <SwiperSlide key={value.id} className=" h-[90vh]">
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
                className="w-full h-[590px]  "
              />

              {/* Gray Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-gray-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center text-white text-2xl font-semibold pb-2 px-2 mb-10 ml-4">
                <Link
                  href={`/bW9iaWxlLXZpZXc=/news/${value.Heading.replaceAll(
                    " ",
                    "-"
                  )}`}
                >
                  <p className="p-2 bg-[#392b95] w-fit mb-1">
                    {categories[value.Category[0]]
                      ? isHindi
                        ? categories[value.Category[0]].hindi
                        : categories[value.Category[0]].english
                      : value.Category[0]}
                  </p>
                  {value.Title}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default Slider;
