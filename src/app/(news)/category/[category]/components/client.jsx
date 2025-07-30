"use client";

import { useState, useEffect } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import "./style.css";
import MustRead from "@/app/(news)/components/MustRead";
import { useRouter } from "next/navigation";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { useLanguageStore } from "@/store/languageStore";
import { categories } from "@/lib/mappings";

function Client({ props }) {
  const [news, setnews] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [subNews, setSubNews] = useState();
  const isHindi = useLanguageStore((state) => state.isHindi);

  const router = useRouter();

  const getNews = async () => {
    const res = await fetch(
      `/api/news?limit=3&sort-date=true&category=${props.category}`
    );
    const data = await res.json();
    setSubNews(data.news);
    if (data.count > 3) {
      fetch(
        `/api/news?sort-date=true&page=${page}&limit=${limit}&category=${props.category}&skip=3`
      )
        .then((res) => res.json())
        .then((data) => {
          setnews(data.news);
          setCount(data.count);
        });
    } else if (data.count === 0) {
      router.replace("/");
    }
  };

  const limit = 12;
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
              {isHindi
                ? categories[decodeURI(props.category)].hindi
                : categories[decodeURI(props.category)].english}
            </p>
          </div>
          <div className="lg:px-3 mt-5">
            <div>
              <swiper-container
                slides-per-view="1"
                centered-slides="true"
                autoplay-delay="4000"
                space-between="10"
                autoplay-disable-on-interaction="false"
              >
                {subNews
                  ? subNews.map((value) => (
                      <swiper-slide key={value._id["$oid"]}>
                        <Link
                          href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                        >
                          <div className="">
                            <Image
                              width="1020"
                              height="1080"
                              className="rounded-xl w-full h-[40vh] lg:h-[65vh]"
                              placeholder={`data:image/svg+xml;base64,${toBase64(
                                shimmer(1920, 1080)
                              )}`}
                              src={
                                value.local_image_url
                                  ? value.local_image_url
                                  : value.Title_image
                              }
                              alt="image"
                              loading="eager"
                            />
                          </div>
                          <div className="absolute bottom-0 w-full px-3 lg:text-md bg-gradient-to-t from-gray-700 h-full rounded-xl ">
                            <p className="text-3xl grid font-ruchi h-full self-end content-end pb-3 text-white">
                              {value.Title.length > 100
                                ? `${value.Title.slice(0, 75)} ...`
                                : value.Title}
                            </p>
                          </div>
                        </Link>
                      </swiper-slide>
                    ))
                  : null}
              </swiper-container>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 ml-3">
          <MustRead />
        </div>
      </div>
      <div className="w-full">
        <p id="otherNews" />
        <div className="grid lg:grid-cols-3">
          {news
            ? news.map((value) => (
                <Link
                  href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                  key={value._id["$oid"]}
                >
                  <div className="grid lg:grid-cols-2 my-2 py-3 group ">
                    <div className="lg:px-2 mb-5 lg:mb-0">
                      <Image
                        height="500"
                        width="470"
                        className="rounded-none h-[195px] lg:h-[145px]"
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
                    <div className="ml-2 lg:border-r-2 dark:lg:border-none lg:border-b-2 lg:border-dotted lg:border-[#382f92]">
                      <p className="font-sf_pro font-[400] text-[15px] tracking-wider mx-3 lg:mx-0 lg:pr-1 mt-1 group-hover:text-[#382f92]">
                        {value.Title.length > 100
                          ? value.Title.slice(0, 100) + " ..."
                          : value.Title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
        <div className="flex justify-center">
          {count && count > 12 ? (
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

export default Client;
