"use client";
import Image from "next/image";
import { useState } from "react";
import SocialFollow from "../SocialFollow";
import CategoryTitles from "../CategoryTitles";
import Link from "next/link";
import "./MobileSlider.css";
function MobileSlider() {
  const [isOpen, setisOpen] = useState(false);
  const categories = [
    "Weekly Column",
    "MAHAKUMBH",
    "Employment",
    "Politics",
    "Entertainment",
    "Sports",
    "Crime",
    "Administrative",
    "Election",
    "Other",
    "Technology",
  ];
  return (
    <div>
      <div className="sm:hidden text:xl" onClick={() => setisOpen(!isOpen)}>
        &#x2630;
      </div>
      <div
        className={`absolute h-[100vh] w-[100vw] top-0 left-0 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setisOpen(false)}
        id="side-bar"
      >
        <div
          className={`${
            isOpen
              ? "translate-x-[0%] opacity-100"
              : " -translate-x-[100%] opacity-25"
          }  fixed pl-2 pt-4 top-0 left-0 bg-black text-white w-[65vw] min-h-screen z-20 transition ease-in-out duration-300`}
        >
          <div className=" flex p-2 justify-between items-center">
            <Link href="/" onClick={() => setisOpen(false)}>
              <Image
                src="/assets/img/inkquest-img.jpeg"
                alt="logo"
                width="50"
                height="50"
                id="Logo"
              />
            </Link>
            <div
              className="pr-4 text-[#a195ee] text-3xl"
              onClick={() => setisOpen(false)}
            >
              &#10539;
            </div>
          </div>
          <ul className=" flex flex-col pl-2 mt-6 gap-y-3 mb-4 ">
            <li>
              <Link
                href={`/`}
                className="-skew-x-12 bg-[#392b95] px-2  text-left inline-block"
                onClick={() => setisOpen(false)}
              >
                मुख्य पृष्ठ
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${category}`}
                  className="-skew-x-12 bg-[#392b95] px-2  text-left inline-block"
                  onClick={() => setisOpen(false)}
                >
                  <CategoryTitles category={category} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="pl-2">
            <SocialFollow />
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default MobileSlider;
