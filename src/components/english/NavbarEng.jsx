"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import NavBarNews from "../NavBarNews";
import CategoryTitles from "../CategoryTitles";
import Titles from "../Titles";
import SocialFollow from "../SocialFollow";
import MobileSlider from "./MobileSlider";
import Search from "../Search";
import MobileSearch from "../MobileSearch";
import "../Navbar.css";
import "./animation.css";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const categories = [
  "Election",
  "Politics",
  "Crime",
  "Administrative",
  "Sports",
  "Entertainment",
  "Employment",
];
const trending = ["Weekly Column"];
export default function NavbarEng() {
  const [news, setnews] = useState();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    fetch(`/api/news?sort-date=true&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
  }, []);

  return (
    <div className="relative">
      <div
        className="bg-[#392b95] text-white fixed w-full z-50"
        id="navigation"
      >
        {isMobile ? (
          <MobileNavbar categories={categories} trending={trending} />
        ) : (
          <DesktopNavbar categories={categories} trending={trending} />
        )}
      </div>
      <div className="pt-24 dark:bg-black lg:px-16 px-0" id="marquee-container">
        <div className="py-3 relative dark:bg-black dark:text-white -mb-3">
          <div className="absolute dark:bg-black bg-[#392b95] text-white px-3 z-20 flex items-center gap-2">
            <Titles title={"breakingNews"} />{" "}
            <div className="h-3 w-3 bg-red-600 rounded-full"> </div>
          </div>
          {news ? (
            <Marquee speed={65}>
              {news.map((value) => (
                <div className="px-2" key={value._id["$oid"]}>
                  <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
                    {value.Title.slice(0, 150)} ...
                  </Link>
                </div>
              ))}
            </Marquee>
          ) : null}
        </div>
      </div>
    </div>
  );
}
