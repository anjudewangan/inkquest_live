"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

import { shimmer, toBase64 } from "@/utils/shimmer";

import "./style.css";

function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");

  const [searchTitle, setSearchTitle] = useState();

  const [news, setNews] = useState();
  const [page, setPage] = useState();
  const [count, setCount] = useState();
  const limit = 10;
  const getData = () => {
    fetch(`/api/search?s=${search}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.news);
        setCount(data.count);
      });
  };

  useEffect(() => {
    if (search !== searchTitle) {
      setSearchTitle(search);
      setPage(1);
    }
    getData();
  }, [search, page]);

    let handlePageClick = (event) => {
      setPage(event.selected + 1);
      const elem = document.getElementById("marquee-container");
      elem?.scrollIntoView({ behavior: "smooth" });
    };
  if (!news) {
    return null;
  }
  if (news.length === 0) {
    return (
      <div className="dark:bg-black dark:text-white">
        <div className="grid lg:grid-cols-2 container min-h-[45vh] ">
          No Results For: {search}
        </div>
      </div>
    );
  }
  return (
    <div className="dark:bg-black dark:text-white font-sf_pro">
      <div className="grid lg:grid-cols-2 container  ">
        <div className="lg:col-span-1">
          <h1 className="mt-4 text-xl">Search Result For: {search}</h1>
          {news.map((value) => (
            <Link
              href={`/news/${value.Heading.replaceAll(" ", "-")}`}
              key={value.id}
            >
              <div className="grid lg:grid-cols-3 my-2 py-3 group ">
                <div className=" mb-5 lg:mb-0 col-span-2 lg:col-span-1">
                  <Image
                    height="500"
                    width="500"
                    className="rounded-none h-[225px] lg:h-[125px] w-full"
                    src={
                      value.local_image_url
                        ? value.local_image_url
                        : value.Title_image
                    }
                    alt="image"
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(250, 175)
                    )}`}
                  />
                </div>
                <div className=" flex  flex-col justify-evenly col-span-2">
                  <p className="lg:text-lg font-bold tracking-wider   group-hover:text-[#382f92]">
                    {value.Title}
                  </p>
                  <ul className="flex lg:text-[16px]  text-[12px] gap-3 text-gray-700 items-baseline mt-2">
                    <li>
                      By <span className="text-[#382f92]">{value.Author}</span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} size="sm" />
                      <span>
                        {" "}
                        {new Date(value.updatedAt.$date).toLocaleString()}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
          {count > 5 ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(count / limit)}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              nextClassName="next-item"
              previousClassName="prev-item"
              disabledClassName="disabled"
              disabledLinkClassName="disabled"
              activeClassName="active"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
