import HeroCarousel2 from "./HeroCarousel2";
import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { recentTrendingNews } from "@/utils/getData";
import InitializeSwiper from "./InitializeSwiper";
import { baseUrl } from "@/utils/baseUrl";

async function getData(url) {
  const res = await fetch(url, { next: { revalidate: 100 } });
  const data = await res.json();
  return data.news;
}

async function HeroSlider() {
  const news = await getData(
    `${baseUrl}/api/news?sort-date=1&trending=1&limit=4`
  );
  if (!(news.length > 0)) {
    return null;
  }
  return (
    <>
      <div className="dark:bg-black">
        <InitializeSwiper />
        <div className="container lg:h-screen">
          <swiper-container
            slides-per-view="1"
            centered-slides="true"
            autoplay-delay="7000"
            autoplay-disable-on-interaction="false"
            init="false"
          >
            {news.map((value) => (
              <swiper-slide key={value._id["$oid"]}>
                <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
                  <div className="relative z-10 ">
                    <div className="absolute px-11 h-screen w-screen grid grid-cols-2 text-white text-lg lg:text-2xl font-bold backdrop-brightness-10 bg-gradient-to-r from-gray-700 lg:to-50% to-90%">
                      <p className="  absolute  w-[50%] lg:w-[45vw] pl-6 pt-3 bottom-[55%] lg:bottom-[25%] lg:text-[2.5rem] tracking-wide leading-normal  lg:col-span-1 col-span-2 text-2xl ">
                        {value.Title.slice(0, 70)}{" "}
                        {value.Title.length > 80 ? "..." : ""}
                      </p>
                    </div>
                    <Image
                      width="1020"
                      height="1080"
                      className="w-full h-[50vh] lg:h-screen"
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(1920, 1080)
                      )}`}
                      src={
                        value.local_image_url
                          ? value.local_image_url
                          : value.Title_image
                      }
                      alt="image"
                      loading="eager"
                    />
                  </div>
                </Link>
              </swiper-slide>
            ))}
          </swiper-container>
          <div className=" lg:rounded-xl max-w-[100%]  lg:mt-1  lg:w-[16vw] ml-auto lg:absolute lg:top-[30%] lg:right-48 lg:z-40 2xl:top-[20%] 2xl:mr-40">
            <HeroCarousel2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSlider;
