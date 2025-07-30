"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";
function EditorsChoiceFooter({ skip }) {
  const [news, setnews] = useState();
  useEffect(() => {
    fetch(
      `/api/news?sort-date=true&limit=2&editorsChoice=1${
        skip && `&skip=${skip}`
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
  }, []);
  return (
    <>
      <ul>
        {news
          ? news.map((value) => (
              <Link
                href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                key={value._id["$oid"]}
              >
                <li>
                  <div className="grid lg:grid-cols-2 my-2 py-3 group">
                    <div className="px-2">
                      <Image
                        height="500"
                        width="500"
                        className=" h-[150px] lg:w-[262px] object-cover"
                        src={
                          value.local_image_url
                            ? value.local_image_url
                            : value.Title_image
                        }
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(500, 500)
                        )}`}
                        alt="image"
                      />
                    </div>
                    <div className="ml-2">
                      <p className=" font-bold tracking-wider mt-1 group-hover:text-[#382f92]">
                        {value.Title}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            ))
          : null}
      </ul>
    </>
  );
}

export default EditorsChoiceFooter;
