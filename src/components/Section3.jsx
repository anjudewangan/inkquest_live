"use client";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import Image from "next/image";
import { useEffect, useState } from "react";
import EconomicGuide from "./EconomicGuide";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi, categories } from "@/lib/mappings";
import { shimmer, toBase64 } from "@/utils/shimmer";
function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
function Section3() {
  const [category, setcategory] = useState("All");
  const [news, setnews] = useState();
  const isHindi = useLanguageStore((state) => state.isHindi);

  const social = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-lg m-2 bg" />,
      link: "https://www.facebook.com/inkquestmedia/",
    },
    // {
    //   name: "Youtube",
    //   icon: <BsYoutube className="text-lg m-2 bg" />,
    //   link: "",
    // },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-lg m-2 bg" />,
      link: "https://twitter.com/inkquest_in",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-lg m-2 bg" />,
      link: "https://www.instagram.com/inkquestmedia/",
    },
  ];
  const categoryList = ["All", "Politics", "Sports", "Entertainment"]; // categories as stored in db

  useEffect(() => {
    fetch(
      `/api/news?limit=12&sort-date=true&${
        category !== "All" ? `category=${category}` : ``
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setnews([...chunks(data.news, 4)]);
      });
  }, [category]);
  return (
    <div className="bg-[#0d0d0d] flex flex-col lg:flex-row p-5 lg:py-6 lg:px-16 text-white">
      <div className="flex  flex-col lg:w-[55vw]">
        <div className="lg:flex justify-center items-baseline">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-[#382f92]" content=" " />
            <h4 className="text-2xl font-bold tracking-wider">
              {isHindi ? Hindi["newsUpdate"] : English["newsUpdate"]}
            </h4>
          </div>
          <ul className="flex gap-2 ml-auto cursor-pointer mt-5 pr-4 ">
            {categoryList.map((val, idx) => (
              <li
                key={idx}
                onClick={(e) => {
                  setcategory(e.target.attributes[0].nodeValue);
                }}
                value={val}
                className={`${
                  category === val ? "text-[#382f92] font-bold" : ""
                }  tracking-wide`}
              >
                {isHindi ? categories[val].hindi : categories[val].english}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 w-full">
          <swiper-container
            centered-slides="true"
            autoplay-delay="5000"
            autoplay-disable-on-interaction="false"
            autoplay-pause-on-mouse-enter="true"
            slides-per-view="1"
          >
            {Array(3)
              .fill(1)
              .map((_, idx) => (
                <swiper-slide key={idx}>
                  <div className="grid grid-flow-cols-1 lg:grid-cols-3  lg:w-full">
                    {news ? (
                      <>
                        {news[idx].map((value, idx) => (
                          <>
                            {idx === 0 ? (
                              <Link
                                href={`/news/${value.Heading.replaceAll(
                                  " ",
                                  "-"
                                )}`}
                                key={value.id}
                                className="lg:col-span-3 relative"
                              >
                                <div>
                                  <div className="">
                                    <Image
                                      width="1900"
                                      height="380"
                                      className="rounded-md h-[380px]"
                                      src={value.Title_image}
                                      alt="image"
                                      placeholder={`data:image/svg+xml;base64,${toBase64(
                                        shimmer(800, 380)
                                      )}`}
                                    />
                                  </div>
                                  <div className="absolute bottom-0 w-full px-3 lg:text-md bg-gradient-to-t from-gray-700 h-full ">
                                    <p className="text-3xl grid font-ruchi h-full self-end content-end pb-3">
                                      {value.Title}
                                    </p>
                                    {/* <ul className="flex gap-3 text-[12px] text-gray-700 items-baseline lg:text-white lg:text-[14px] lg:mt-3 ">
                                      <li className="hidden lg:block">
                                        By:
                                        <span className="text-[#382f92] font-bold">
                                          {" "}
                                          {value.Author}
                                        </span>
                                      </li>
                                      <li>
                                        <FontAwesomeIcon
                                          icon={faClock}
                                          size="sm"
                                        />
                                        <span>
                                          {" "}
                                          {new Date(
                                            value.updatedAt
                                          ).toLocaleString()}
                                        </span>
                                      </li>
                                    </ul> */}
                                  </div>
                                </div>
                              </Link>
                            ) : (
                              <Link
                                href={`/news/${value.Heading.replaceAll(
                                  " ",
                                  "-"
                                )}`}
                                key={value.id}
                              >
                                <div className=" group mt-5 lg:px-3  cursor-pointer">
                                  <div>
                                    <Image
                                      width="500"
                                      height="500"
                                      className="rounded-md h-[180px] lg:w-[262px]"
                                      src={value.Title_image}
                                      alt="image"
                                      placeholder={`data:image/svg+xml;base64,${toBase64(
                                        shimmer(500, 500)
                                      )}`}
                                    />
                                  </div>
                                  <div className="mt-5">
                                    <p className="px-1 group-hover:text-[#382f92] h-24">
                                      {value.Title.slice(0, 100)}{" "}
                                      {value.Title.length > 100 ? "..." : ""}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            )}
                          </>
                        ))}
                      </>
                    ) : null}
                  </div>
                </swiper-slide>
              ))}
          </swiper-container>
        </div>
      </div>
      <div className=" lg:mx-3  pl-1 w-full lg:w-[45vw] flex flex-col mt-3">
        {/* <div className="">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-[#382f92]" content=" " />
            <h5 className="text-2xl font-bold tracking-wider">
              {isHindi ? Hindi["socialLinks"] : English["socialLinks"]}
            </h5>
          </div>
          <ul className=" flex flex-col gap-6 mt-3">
            {social.map((val) => (
              <li className="group hover:cursor-pointer" key={val.name}>
                <a target="_blank" href={val.link}>
                  <span className="flex items-center gap-2 border-2 border-[#252525] group-hover:border-[#382f92] -skew-x-12">
                    <div className="bg-[#252525] group-hover:bg-[#382f92]">
                      {val.icon}
                    </div>
                    <p>{val.name}</p>
                    <div className="pr-2 ml-auto">1,2k Follow</div>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="mt-1">
          <EconomicGuide />
        </div>
      </div>
    </div>
  );
}

export default Section3;
