"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useRouter } from "next/navigation";
import NavBarNews from "../NavBarNews";
import CategoryTitles from "../CategoryTitles";
import SocialFollow from "../SocialFollow";
import MobileSlider from "./MobileSlider";
import Search from "../Search";
import "../Navbar.css";
import "./animation.css";
import { HiOutlineSearch } from "react-icons/hi";

function MobileNavbar() {
  const [currentMode, setCurrentMode] = useState("light");
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode) setCurrentMode(mode);
    // document.getElementById("marquee-container").style.paddingTop = "4rem";
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

  // mobile search
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchParam, setSearchParam] = useState();
  const [type, setType] = useState("text");

  const router = useRouter();
  const mobileSearchInput = useRef();
  const search = (event) => {
    if (event.keyCode === 13) {
      setSearchParam("");
      setType("none");
      router.push(`/search?s=${searchParam}`);
      setIsMobileSearchOpen(false);
      setInterval(() => {
        setType("text");
      }, 200);
    }
  };
  useEffect(() => {
    if (isMobileSearchOpen) {
      mobileSearchInput.current.focus();
        document.getElementById("marquee-container").style.paddingTop = "7rem";
    } else {
        document.getElementById("marquee-container").style.paddingTop = "4rem";
    }
  }, [isMobileSearchOpen]);
  return (
    <>
      <div className="flex sm:hidden justify-between px-3">
        <div className="flex items-center px-2">
          <MobileSlider />
        </div>
        <div className="pb-2" id="logo">
          <Link href={"/"}>
            <Image
              src="/assets/img/inkquest-img.jpeg"
              alt="logo"
              width="65"
              height="65"
              id="Logo"
              priority
              className="w-[65px] h-[65px] transition-all ease-in-out duration-300"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <HiOutlineSearch
              onClick={() => setIsMobileSearchOpen(true)}
              className={`text-2xl rotate-90 ${
                isMobileSearchOpen ? "hidden" : "block"
              }`}
            />
            <HiOutlineSearch
              onClick={() => setIsMobileSearchOpen(false)}
              className={`text-2xl rotate-90 ${
                isMobileSearchOpen ? "block" : "hidden"
              }`}
            />
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
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-center pb-1 -mt-2">
        <div className={`${isMobileSearchOpen ? "block" : "hidden"}`}>
          <input
            type="text"
            ref={mobileSearchInput}
            inputMode={type}
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            onBlur={(e) => setIsMobileSearchOpen(false)}
            onKeyDown={(event) => search(event)}
            className="text-black z-[100] text-center font-montserrat focus-visible:outline-none rounded-xl border-[#7466d3] border-2 h-11 "
          />
        </div>
      </div>
    </>
  );
}

export default MobileNavbar;
