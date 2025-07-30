"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi } from "@/lib/mappings";
import { shimmer, toBase64 } from "@/utils/shimmer";
function EconomicGuide() {
  const [news, setnews] = useState([]);
  const isHindi = useLanguageStore((state) => state.isHindi);
  useEffect(() => {
    fetch("/api/news?limit=4&sort-date=true&category=Politics")
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
  }, []);
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-[#382f92]" content=" " />
        <h5 className="text-2xl font-bold tracking-wider">
          {isHindi ? Hindi["economicGuide"] : English["economicGuide"]}
        </h5>
      </div>
      <div>
        <ul className="mt-1">
          {news.map((value) => (
            <Link
              href={`/news/${value.Heading.replaceAll(" ", "-")}`}
              key={value.id}
            >
              <li className="flex flex-col lg:flex-row gap-2 lg:p-2 lg:items-center group cursor-pointer my-3 lg:my-0">
                <div>
                  <Image
                    width="500"
                    height="500"
                    className="rounded-md h-auto lg:max-w-lg lg:w-[200px] w-full"
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(500, 500)
                    )}`}
                    src={
                      value.local_image_url
                        ? value.local_image_url
                        : value.Title_image
                    }
                    alt="image"
                  />
                </div>
                <div>
                  <p className="group-hover:text-[#382f92]">{value.Title}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EconomicGuide;
