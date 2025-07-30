"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi } from "@/lib/mappings";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { useParams } from "next/navigation";

function OtherNews() {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [news, setnews] = useState();
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState(1080);
  const params = useParams();
  useEffect(() => {
    setIsClient(true);
    window.addEventListener("resize", () => {
      setWindowSize(document.documentElement.clientWidth);
    });
  }, []);
  useEffect(() => {
    fetch(`/api/news?limit=12&sort-date=true&limit=15&exclude=${params.title}`)
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
  }, []);
  return (
    <div className="dark:bg-[#0d0d0d] px-5 lg:px-16 py-6 dark:text-white">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-[#382f92]" content=" " />
        <p className="text-2xl font-semibold tracking-wider">
          {isHindi ? Hindi["otherNews"] : English["otherNews"]}
        </p>
      </div>
      {isClient ? (
        <swiper-container
          autoplay-delay="2500"
          autoplay-disable-on-interaction="false"
          slides-per-view={windowSize <= 500 ? "1" : "4"}
        >
          {news
            ? news.map((value) => (
                <swiper-slide key={value._id["$oid"]}>
                  <Link
                    href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                    prefetch={true}
                  >
                    <div className=" ">
                      <div className=" group mt-5 lg:px-3  cursor-pointer">
                        <div>
                          <Image
                            height="500"
                            width="500"
                            className=" h-[180px] lg:w-[262px]"
                            src={
                              value.local_image_url
                                ? value.local_image_url
                                : value.Title_image
                            }
                            alt="image"
                            placeholder={`data:image/svg+xml;base64,${toBase64(
                              shimmer(500, 500)
                            )}`}
                          />
                        </div>
                        <div className="mt-5">
                          <p className="px-1 group-hover:text-[#382f92]">
                            {value.Title}
                          </p>
                          <ul className="flex text-[12px] gap-3 text-gray-700 items-baseline">
                            <li>
                              <FontAwesomeIcon icon={faClock} size="sm" />
                              <span>
                                {new Date(
                                  value.updatedAt.$date
                                ).toLocaleString()}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Link>
                </swiper-slide>
              ))
            : null}
        </swiper-container>
      ) : null}
    </div>
  );
}

export default OtherNews;
