import { HiOutlineSearch } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParam, setSearchParam] = useState();
  const [type, setType] = useState("text");

  const router = useRouter();
  const input = useRef();
  const search = (event) => {
    if (event.keyCode === 13) {
      setSearchParam("");
      setType("none");
      router.push(`/bW9iaWxlLXZpZXc=/search?s=${searchParam}`);
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
    <div className="flex items-center gap-x-2">
      <div
        className={`${
          isSearchOpen ? "block opacity-100" : "hidden opacity-25"
        } transition-all ease-in-out duration-300 `}
      >
        <input
          type="text"
          ref={input}
          inputMode={type}
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          onKeyDown={(event) => search(event)}
          className=" text-black text-center w-[10rem] font-montserrat focus-visible:outline-none rounded-xl border-[#7466d3] border-2  "
        />
      </div>
      <div>
        {isSearchOpen ? (
          <GrClose
            className="text-2xl"
            onClick={() => setIsSearchOpen(false)}
          />
        ) : (
          <HiOutlineSearch
            onClick={() => setIsSearchOpen(true)}
            className="text-2xl text-white  rotate-90 "
          />
        )}
      </div>
    </div>
  );
}

export default Search;
