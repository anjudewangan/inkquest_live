"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Home, X } from "lucide-react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Link from "next/link";
import Search from "./Search";

function Navbar() {
  const [sideBarToggle, setSideBarToggle] = useState(false);
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
    <div className="bg-[#392b95] px-2  relative top-0 z-40 w-full " id="navbar">
      <div className="p-2  flex justify-between">
        <Image
          width="35"
          height="35"
          src={"/assets/img/logo/logo-img.jpg"}
          alt="image"
          onClick={() => setSideBarToggle(true)}
        />
        <div className="flex gap-x-2">
          <Search />
          <div className="mr-1">
            <MdLightMode
              onClick={() => setCurrentMode("light")}
              className={`text-3xl text-white ${
                currentMode === "light" ? "hidden" : "block"
              }`}
            />
            <MdDarkMode
              onClick={() => setCurrentMode("dark")}
              className={`text-3xl text-white ${
                currentMode === "dark" ? "hidden" : "block"
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 dark:bg-black bg-white dark:text-white w-[65vw] min-h-screen z-20 transition ease-in-out duration-300 ${
          sideBarToggle
            ? "translate-x-[0%] opacity-100"
            : "-translate-x-[100%] opacity-25"
        }`}
      >
        <div>
          <div className="p-2 flex justify-between">
            <Image
              width="35"
              height="35"
              src={"/assets/img/logo/logo-img.jpg"}
              alt="image"
            />
            <X onClick={() => setSideBarToggle(false)} />
          </div>
        </div>
        <div className="pl-2">
          <div>
            <Link
              href="/bW9iaWxlLXZpZXc="
              className="text-xl flex items-center"
              onClick={() => setSideBarToggle(false)}
            >
              <Home className="h-5 w-5 mr-2" /> Home
            </Link>
          </div>
          <div>
            <Link
              href="/bW9iaWxlLXZpZXc=/categories"
              className="text-xl"
              onClick={() => setSideBarToggle(false)}
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
