"use client";
import { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore";
import NavbarHindi from "./hindi/Navbar";
import NavbarEng from "./english/NavbarEng";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { English, Hindi } from "@/lib/mappings";
import "./Navbar.css";
function Navbar() {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [news, setnews] = useState();
  useEffect(() => {
    fetch(`/api/news?sort-date=true&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
  }, []);

  return (
    <div className="">
      {isHindi ? <NavbarEng /> : null}
      {/* <div className="navbarnew bg-[#392b95] ">
        <div className="pt-3 text-white">
          <div className=" text-white  w-full  z-40">
            <div className=" bg-[#392b95] pb-3">
              <div className="navbar2">
                <p className=" font-bold text-lg">
                  {isHindi ? Hindi["trending"] : English["trending"]}
                </p>

                <div className="navbar3 flex gap-3 overflow-x-auto whitespace-pre no-scrollbar">
                  <Link
                    href="/category/MP-Election"
                    className=" -skew-x-12 pt-1 bg-white text-black ml-4 px-1 hover:bg-red-600 hover:text-white "
                  >
                    एमपी चुनाव
                  </Link>
                  <Link
                    href="/category/CG-Election"
                    className="-skew-x-12 pt-1 bg-white text-black px-1 hover:bg-red-600 hover:text-white"
                  >
                    सीजी चुनाव
                  </Link>
                  <Link
                    href="/category/World-cup"
                    className="-skew-x-12 pt-1 mr-3 bg-white text-black px-1 hover:bg-red-600 hover:text-white"
                  >
                    विश्व कप
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="py-3 relative bg-black text-white -mb-3">
        <div className="absolute bg-black  px-3 z-20 flex items-center gap-2">
          {isHindi ? Hindi["breakingNews"] : English["breakingNews"]}{" "}
          <div className="h-3 w-3 bg-red-600 rounded-full"> </div>
        </div>
        {news ? (
          <Marquee speed={65}>
            {news.map((value) => (
              <div className="px-2" key={value.id}>
                <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
                  {value.Title.slice(0, 150)} ...
                </Link>
              </div>
            ))}
          </Marquee>
        ) : null}
      </div> */}
    </div>
  );
}

export default Navbar;
