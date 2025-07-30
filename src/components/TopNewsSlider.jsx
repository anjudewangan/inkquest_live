"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi } from "@/lib/mappings";
import { shimmer, toBase64 } from "@/utils/shimmer";
import NewsSlide from "./NewsSlide";
import AdsSlide from "./AdsSlide";
function TopNewsSlider() {
  const [windowSize, setWindowSize] = useState(1080);
  const [news, setNews] = useState([]);
  const [ads, setAds] = useState([]);
  const isHindi = useLanguageStore((state) => state.isHindi);
  const init = async () => {
    window.addEventListener("resize", () => {
      setWindowSize(document.documentElement.clientWidth);
    });
    const responseNews = await fetch("/api/news?limit=15&sort-date=true");
    const newsData = await responseNews.json();
    setNews(newsData.news);
    const responseAds = await fetch("/api/ads?limit=3");
    const adsList = await responseAds.json();
    const tempList = [];
    newsData.news.forEach((item, idx) => {
      tempList.push(<NewsSlide value={item} idx={idx} key={idx} />);
      if ((idx + 1) % 3 === 0) {
        let ad = adsList.shift();
        if (ad) {
          tempList.push(<AdsSlide ads={ad} key={`${ad.id}_${idx}`} />);
          adsList.push(ad);
        }
      }
    });
    setAds(tempList);
    const swiperEl = document.querySelector("swiper-container");
    const params = {
      pagination: {
        clickable: true,
      },
      autoplay: { pauseOnMouseEnter: true },
    };
    Object.assign(swiperEl, params);

    swiperEl.initialize();
  };
  useEffect(() => {
    init();
    return () => {
      setAds([]);
    };
  }, []);
  const sliderRef = useRef(null);

  return (
    <>
      <div className="dark:bg-black">
        <div className=" p-5 container">
          <div className="mb-3">
            <div className="flex items-center gap-2 dark:text-white">
              <div className="h-4 w-4 bg-[#382f92]" content=" " />
              <h2 className="text-2xl font-bold tracking-wider">
                {isHindi ? Hindi["topNews"] : English["topNews"]}
              </h2>
            </div>
          </div>
          <swiper-container
            slides-per-view={windowSize <= 500 ? "1" : "4"}
            ref={sliderRef}
            autoplay-delay="2000"
            autoplay-disable-on-interaction="false"
            autoplay-pause-on-mouse-enter="true"
            navigation="true"
            loop="true"
          >
            {/* {news &&
              ads &&
              news.map((value, idx) => {
                if ((idx + 1) % 3 === 0) {
                  let ad = ads.shift();
                  if (ad) {
                    return (
                      <>
                        <swiper-slide key={idx}>
                          <Link
                            href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                          >
                            <div className="flex  justify-around text-white gap-2 py-3">
                              <div className="flex flex-col p-2 items-center ">
                                <div className="relative">
                                  <div className="absolute w-full flex mt-1 px-3">
                                    <div className=" ml-auto w-[40px] h-[40px] bg-[#00000073] rounded-full flex justify-center items-center">
                                      <p>{idx + 1}</p>
                                    </div>
                                  </div>
                                  <Image
                                    width="500"
                                    height="500"
                                    className="rounded-md h-[180px] w-[262px]"
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
                                  <h3 className="lg:text-lg px-7">
                                    {value.Title.slice(0, 70)}{" "}
                                    {value.Title.length > 70 ? "..." : ""}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </swiper-slide>
                        <swiper-slide key={ad.id}>
                          <div className="flex  justify-around text-white gap-2 py-3">
                            <div className="flex flex-col p-2 items-center ">
                              <div className="relative">
                                <div className="absolute w-full flex mt-1 px-3"></div>
                                <Image
                                  width="500"
                                  height="500"
                                  className="rounded-md h-[180px] w-[262px]"
                                  src={ad.imageUrl}
                                  alt="image"
                                  placeholder={`data:image/svg+xml;base64,${toBase64(
                                    shimmer(500, 500)
                                  )}`}
                                />
                              </div>
                              <div className="mt-5">
                                <h3 className="lg:text-lg px-7"></h3>
                              </div>
                            </div>
                          </div>
                        </swiper-slide>
                      </>
                    );
                  }
                }
                return (
                  <>
                    <swiper-slide key={idx}>
                      <Link
                        href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                      >
                        <div className="flex  justify-around text-white gap-2 py-3">
                          <div className="flex flex-col p-2 items-center ">
                            <div className="relative">
                              <div className="absolute w-full flex mt-1 px-3">
                                <div className=" ml-auto w-[40px] h-[40px] bg-[#00000073] rounded-full flex justify-center items-center">
                                  <p>{idx + 1}</p>
                                </div>
                              </div>
                              <Image
                                width="500"
                                height="500"
                                className="rounded-md h-[180px] w-[262px]"
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
                              <h3 className="lg:text-lg px-7">
                                {value.Title.slice(0, 70)}{" "}
                                {value.Title.length > 70 ? "..." : ""}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </swiper-slide>
                  </>
                );
              })} */}
            {news && ads}
          </swiper-container>
        </div>
      </div>
    </>
  );
}

export default TopNewsSlider;
