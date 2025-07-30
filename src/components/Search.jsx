"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
function Search() {
  const [searchParam, setSearchParam] = useState();
  const [type, setType] = useState("text");
  const router = useRouter();

  const search = (event) => {
    if (event.keyCode === 13) {
      setSearchParam("");
      setType("none");
      router.push(`/search?s=${searchParam}`);
      setInterval(() => {
        setType("text");
      }, 200);
    }
  };
  return (
    <div className="flex justify-center mb-2 ">
      <input
        inputMode={type}
        type={type}
        name="search"
        id="search"
        placeholder="Search"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        onKeyDown={(event) => search(event)}
        className="focus-visible:outline-none text-center px-2 text-black font-montserrat rounded-xl border-[#7466d3] border-2"
      />
    </div>
  );
}

export default Search;
