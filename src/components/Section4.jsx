"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import "./style.css";
import { English, Hindi } from "@/lib/mappings";
import Subscribe from "./Subscribe";
import { shimmer, toBase64 } from "@/utils/shimmer";
function Section4() {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [news, setnews] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const limit = 5;

  const [latestNews, setLatestNews] = useState();

  useEffect(() => {
    fetch(`/api/news?sort-date=true&page=${page}&limit=${limit}&category=Other`)
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
        setCount(data.count);
      });
  }, [page]);

  useEffect(() => {
    fetch(`/api/news?sort-date=true&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setLatestNews(data.news);
      });
  }, []);

  const htmlToText = (html) => {
    const element = document.createElement("p");
    element.innerHTML = html;
    return element.innerText;
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    const elem = document.getElementById("otherNews");
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="bg-[#0d0d0d] text-white lg:py-6 lg:px-20 grid lg:grid-cols-5 lg:gap-11"
      id="otherNews"
    >
      <div className="lg:col-span-3  p-5 ">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-[#382f92]" content=" " />
          <p className="text-2xl font-bold tracking-wider">
            {isHindi ? Hindi["otherNews"] : English["otherNews"]}
          </p>
        </div>
        {news
          ? news.map((value) => (
              <Link
                href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                key={value.id}
              >
                <div className="grid lg:grid-cols-2 my-2 py-3 group ">
                  <div className="lg:px-2 mb-5 lg:mb-0">
                    <Image
                      height="1080"
                      width="1920"
                      src={value.Title_image}
                      alt="image"
                      className="h-[150px]"
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(1920, 1080)
                      )}`}
                    />
                  </div>
                  <div className="ml-2">
                    <p className="lg:text-lg font-bold tracking-wider mt-1 group-hover:text-[#382f92]">
                      {value.Title.split(" ").slice(0, 10).join(" ")} ...
                    </p>
                    <p className="overflow-hidden">
                      {/* {value.Description.split(" ").slice(0, 10).join(" ")} ... */}
                      {htmlToText(value.Description)
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")}{" "}
                      ...
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : null}
        {count ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
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
      <div className="p-4 col-span-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-[#382f92]" content=" " />
          <p className="text-2xl font-bold tracking-wider">
            {isHindi ? Hindi["latestNews"] : English["latestNews"]}
          </p>
        </div>
        <div>
          <ul>
            {latestNews
              ? latestNews.map((value) => (
                  <Link
                    href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                    key={value.id}
                  >
                    <li className="my-9 group cursor-pointer">
                      <p className="text-lg font-bold tracking-wider group-hover:text-[#382f92]">
                        {value.Title}
                      </p>
                    </li>
                  </Link>
                ))
              : null}
          </ul>
          <div>
            {/* <div className="mt-6">
              <Subscribe />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4;
