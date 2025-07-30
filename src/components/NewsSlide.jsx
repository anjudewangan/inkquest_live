import React from "react";

import { shimmer, toBase64 } from "@/utils/shimmer";
import Link from "next/link";
import Image from "next/image";
function NewsSlide({ value, idx }) {
  return (
    <swiper-slide key={idx}>
      <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
        <div className="flex  justify-around dark:text-white gap-2 py-3">
          <div className="flex flex-col p-2 items-center ">
            <div className="relative">
              <div className="absolute w-full flex mt-1 px-3">
                <div className=" ml-auto w-[40px] h-[40px] bg-[#00000073] rounded-full text-white dark:text-black flex justify-center items-center">
                  <p>{idx + 1}</p>
                </div>
              </div>
              <Image
                width="500"
                height="500"
                className="rounded-md h-[180px] w-[262px]"
                src={
                  value.local_image_url
                    ? value.local_image_url
                    : value.Title_image
                }
                alt="image"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(500, 500)
                )}`}
              />
            </div>
            <div className="mt-5">
              <h3 className="lg:text-lg px-7">
                {value.Title.slice(0, 70)}{" "}
                {value.Title.length > 70 ? "..." : ""}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </swiper-slide>
  );
}

export default NewsSlide;
