"use client";

import { useState, useEffect } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import "./style.css";
import SubPage from "@/components/SubPage";
import MustRead from "@/app/(news)/components/MustRead";
import { useRouter } from "next/navigation";
import { shimmer, toBase64 } from "@/utils/shimmer";

function Client({ props }) {
  const [news, setnews] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [subNews, setSubNews] = useState();
  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const getNews = async () => {
    const res = await fetch(
      `/api/news?limit=3&sort-date=true&tag=${props.tag}`
    );
    const data = await res.json();
    setSubNews(data.news);
    if (data.count > 3) {
      fetch(
        `/api/news?sort-date=true&page=${page}&limit=${limit}&tag=${props.tag}&skip=3`
      )
        .then((res) => res.json())
        .then((data) => {
          setnews(data.news);
          setCount(data.count);
        });
    } else if (data.count === 0) {
      router.replace("/_error");
    }
  };

  const limit = 5;
  useEffect(() => {
    getNews();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    const elem = document.getElementById("otherNews");
    elem?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="dark:bg-black container dark:text-white p-2 lg:px-16 lg:py-4">
      <div className="lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 mt-4 lg:mt-0">
            <div className="h-4 w-4 bg-[#382f92]" content=" " />
            <p className="text-3xl font-bold tracking-wider">
              {decodeURIComponent(props.tag)
                .split(" ")
                .map((value) => {
                  return value.charAt(0).toUpperCase() + value.slice(1);
                })
                .join(" ")}
            </p>
          </div>
          <div className="lg:px-3 mt-5">
            <div>
              <swiper-container
                slides-per-view="1"
                centered-slides="true"
                autoplay-delay="4000"
                autoplay-disable-on-interaction="false"
              >
                {subNews
                  ? subNews.map((value) => (
                      <swiper-slide key={value.id}>
                        <Link
                          href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                        >
                          <div className="">
                            <Image
                              width="900"
                              height="600"
                              className="h-[65vh] object-fill"
                              src={
                                value.local_image_url
                                  ? value.local_image_url
                                  : value.Title_image
                              }
                              alt="image"
                              placeholder={`data:image/svg+xml;base64,${toBase64(
                                shimmer(1920, 1080)
                              )}`}
                            />
                            <span className="absolute top-[75%] px-3 text-3xl drop-shadow-[1px_1px_#000] dark:text-white text-white">
                              {value.Title}
                            </span>
                          </div>
                        </Link>
                      </swiper-slide>
                    ))
                  : null}
              </swiper-container>
            </div>
          </div>
          <p id="otherNews" />
          <div>
            {news
              ? news.map((value) => (
                  <Link
                    href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                    key={value.id}
                  >
                    <div className="grid lg:grid-cols-2 my-2 py-3 group ">
                      <div className="lg:px-2 mb-5 lg:mb-0">
                        <Image
                          height="500"
                          width="500"
                          className="rounded-none h-[225px]"
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
                      <div className="ml-2 flex flex-col justify-evenly">
                        <p className="lg:text-lg font-bold tracking-wider mx-3 mt-1 group-hover:text-[#382f92]">
                          {value.Title}
                        </p>
                        <ul className="flex lg:text-[16px] text-[12px] gap-3 text-gray-700 items-baseline mt-2">
                          <li>
                            By{" "}
                            <span className="text-[#382f92]">
                              {value.Author}
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faClock} size="sm" />
                            <span>
                              {" "}
                              {new Date(value.updatedAt).toLocaleString()}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
          {count && count > 5 ? (
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
        <div className="lg:col-span-2 ml-3">
          <MustRead />
        </div>
      </div>
    </div>
  );
}

export default Client;
