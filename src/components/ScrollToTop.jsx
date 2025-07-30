"use client";

import { useEffect, memo, useState } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";

const ScrollToTop = memo(function Scroll() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsVisible(scrollPosition > viewportHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  if (!isVisible) return null;
  return (
    <div
      className={`fixed bottom-5 right-5 z-50 text-white opacity-0 transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : ""
      }`}
    >
      <div
        onClick={scrollToTop}
        className="bg-[#392b95] p-2 rounded-full hover:cursor-pointer"
      >
        <HiArrowNarrowUp size="25px" className="relative" />
      </div>
    </div>
  );
});

export default ScrollToTop;
