"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import NavBarNews from "../NavBarNews";
import CategoryTitles from "../CategoryTitles";
import SocialFollow from "../SocialFollow";
import MobileSlider from "./MobileSlider";
import Search from "../Search";
import "../Navbar.css";
import "./animation.css";

function DesktopNavbar({ categories, trending }) {
  const [currentMode, setCurrentMode] = useState("light");
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode) setCurrentMode(mode);
  }, []);
  useEffect(() => {
    const readingMode = document.getElementById("reading-mode");
    if (currentMode === "light") {
      readingMode.classList.remove("dark");
    } else {
      readingMode.classList.add("dark");
    }
    localStorage.setItem("mode", currentMode);
  }, [currentMode]);

  return (
    <div className="hidden justify-between px-4 py-2 container items-center lg:flex">
      <div className="pl-4" id="logo">
        <Link href={"/"}>
          <Image
            src="/assets/img/inkquest-img.jpeg"
            alt="logo"
            width="70"
            height="68"
            id="Logo"
            priority
            className="w-[70px] h-[68px] transition-all ease-in-out duration-300"
          />
        </Link>
      </div>
      <div>
        <ul className="gap-x-1 hidden sm:flex ">
          <li className="group cursor-pointer pb-2 ">
            <Link
              href={`/`}
              className=" group bg-[#7466d380] p-3 -skew-x-12 inline-block hover:bg-[#7466d3]"
            >
              <span className="text-[15px] tracking-wider">मुख्य पृष्ठ</span>
            </Link>
          </li>
          {categories.map((category) => (
            <li className="group cursor-pointer pb-2 " key={category}>
              <Link
                href={`/category/${category}`}
                className=" group bg-[#7466d380] p-3 -skew-x-12 inline-block hover:bg-[#7466d3]"
              >
                <span className="text-[15px] tracking-wider">
                  <CategoryTitles category={category} /> &darr;
                </span>
              </Link>
              <div
                className="news-banner absolute skew-x-0 left-[50%] top-[4rem] group
                   bg-[#000000bd] delay-100 transition ease-in-out backdrop-blur-sm duration-700 invisible opacity-0 group-hover:opacity-100 group-hover:visible -translate-x-[50%] w-[85vw] z-50"
              >
                <div className="flex gap-x-6 p-4 text-base">
                  <NavBarNews category={category} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul
          className="gap-x-1 text-[15px] px-3 mt-2 lg:mt-0 lg:px-0  flex overflow-x-scroll overflow-hidden lg:overflow-visible w-[55vw] lg:w-fit whitespace-pre no-scrollbar"
          id="second"
        >
          {trending.map((category) => (
            <li
              className="bg-white text-black font-semibold  hover:text-white cursor-pointer p-1 -skew-x-12 inline-block"
              key={category}
            >
              <Link href={`/category/${category}`} className="blink">
                <CategoryTitles category={category} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <div id="test1" className="hidden sm:block">
          <Search />
          <div id="download">
            <SocialFollow />
          </div>
        </div>
        <div className="mr-1">
          <MdLightMode
            onClick={() => setCurrentMode("light")}
            className={`text-3xl ${
              currentMode === "light" ? "hidden" : "block"
            }`}
          />
          <MdDarkMode
            onClick={() => setCurrentMode("dark")}
            className={`text-3xl ${
              currentMode === "dark" ? "hidden" : "block"
            }`}
          />
        </div>
        <MobileSlider />
      </div>
    </div>
  );
}

export default DesktopNavbar;
