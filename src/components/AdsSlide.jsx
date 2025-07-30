import React from "react";

import { shimmer, toBase64 } from "@/utils/shimmer";
import Image from "next/image";
function AdsSlide({ ads }) {
  return (
    <swiper-slide key={ads.id}>
      <div className="flex  justify-around dark:text-white text-black gap-2 py-3">
        <div className="flex flex-col p-2 items-center ">
          <div className="relative">
            <div className="absolute w-full flex mt-1 px-3"></div>
            <Image
              width="500"
              height="500"
              className="rounded-md h-[180px] w-[262px]"
              src={ads.imageUrl}
              alt="image"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(500, 500)
              )}`}
            />
          </div>
          <div className="mt-5">
            <h3 className="lg:text-lg px-7"></h3>
          </div>
        </div>
      </div>
    </swiper-slide>
  );
}

export default AdsSlide;
