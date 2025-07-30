"use client";
import { useState, useEffect } from "react";
import { faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { utcToZonedTime } from "date-fns-tz";
import { shimmer, toBase64 } from "@/utils/shimmer";

function NavBarNews({ category }) {
  const [news, setnews] = useState();
  useEffect(() => {
    fetch(`/api/news?sort-date=true&limit=5&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
        // console.log("id for nav bar", data.news[0]._id["$oid"]);
      });
  }, []);
  return (
    <>
      {news
        ? news.map((value) => (
            <div className=" w-[250px] " key={value._id["$oid"]}>
              <div className="">
                <Image
                  height="250"
                  width="250"
                  className="h-[150px] w-[250px]"
                  src={value.Title_image}
                  alt="image"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(250, 250)
                  )}`}
                />
              </div>
              <div className="mt-4 flex flex-col justify-between ">
                <h6>
                  <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
                    {value.Title.slice(0, 50)} ...
                  </Link>
                </h6>
                <ul className="mt-4 flex gap-x-1 text-[12px] text-gray-400">
                  <li>
                    <FontAwesomeIcon icon={faClock} />
                  </li>
                  <li>
                    {utcToZonedTime(
                      value.updatedAt.$date,
                      "Asia/Kolkata"
                    ).toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
          ))
        : null}
    </>
  );
}

export default NavBarNews;
