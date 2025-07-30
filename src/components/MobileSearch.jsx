"use client";
import { useRouter } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";

function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParam, setSearchParam] = useState();
  const [type, setType] = useState("text");

  const router = useRouter();
  const input = useRef();
  const search = (event) => {
    if (event.keyCode === 13) {
      setSearchParam("");
      setType("none");
      router.push(`/search?s=${searchParam}`);
      setIsSearchOpen(false);
      setInterval(() => {
        setType("text");
      }, 200);
    }
  };
  useEffect(() => {
    if (isSearchOpen) {
      input.current.focus();
    }
  }, [isSearchOpen]);
  return (
    <>
      <div>
        <HiOutlineSearch
          onClick={() => setIsSearchOpen(true)}
          className="text-2xl  rotate-90 "
        />
      </div>
      <div
        className={`${
          isSearchOpen ? "block" : "hidden"
        } absolute top-0 left-0 bg-slate-500 bg-opacity-40  h-[100vh] w-full`}
        onClick={() => setIsSearchOpen(false)}
      ></div>
      <div className={`${isSearchOpen ? "block" : "hidden"}`}>
        <input
          type="text"
          ref={input}
          inputMode={type}
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          onKeyDown={(event) => search(event)}
          className="absolute  text-black z-[100] text-center font-montserrat focus-visible:outline-none rounded-xl border-[#7466d3] border-2 h-11 "
        />
      </div>
    </>
  );
}

export default MobileSearch;
