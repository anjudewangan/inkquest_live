"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import "./style.css";
import { English, Hindi } from "@/lib/mappings";
import { shimmer, toBase64 } from "@/utils/shimmer";
function CategoryPagination({ category }) {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [news, setnews] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const limit = 8;

  useEffect(() => {
    fetch(
      `/api/news?sort-date=true&page=${page}&skip=18&limit=${limit}&category=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
        setCount(data.count);
      });
  }, [page]);
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
    <div className=" dark:text-white pt-4" id="otherNews">
      <div className="">
        {/* <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-[#382f92]" content=" " />
          <p className="text-2xl font-bold tracking-wider">
            {isHindi ? Hindi["otherNews"] : English["otherNews"]}
          </p>
        </div> */}
        <ul className="grid grid-cols-2 gap-3 pb-2">
          {news
            ? news.map((value) => (
                <li className="" key={value.id}>
                  <div className="  rounded-lg h-fll">
                    <Image
                      height="200"
                      width="200"
                      className="h-[85px] rounded-lg"
                      src={
                        value.local_image_url
                          ? value.local_image_url
                          : value.Title_image
                      }
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(800, 380)
                      )}`}
                      alt="image"
                    />
                    <div className="p-1">
                      <Link
                        href={`/bW9iaWxlLXZpZXc=/news/${value.Heading.replaceAll(
                          " ",
                          "-"
                        )}`}
                      >
                        <p>{value.Title.slice(0, 75)}</p>
                      </Link>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
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
    </div>
  );
}

export default CategoryPagination;
