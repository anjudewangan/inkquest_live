"use client";
import Image from "next/image";
import Link from "next/link";
import { baseUrl } from "@/utils/baseUrl";
import SocialLinks from "@/components/SocialLinks";
import { useEffect, useState } from "react";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi } from "@/lib/mappings";

function MustRead() {
  const [news, setnews] = useState();
  const isHindi = useLanguageStore((state) => state.isHindi);
  useEffect(() => {
    fetch(`/api/news?sort-date=true&limit=2`)
      .then((res) => res.json())
      .then((data) => setnews(data.news));
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <div className="h-4 w-4 bg-[#382f92]" content=" " />
          <p className="text-3xl font-bold tracking-wider">
            {isHindi ? Hindi["mustRead"] : English["mustRead"]}
          </p>
        </div>
        <ul className="mt-3 flex flex-col gap-4 w-[95%]">
          {news &&
            news.map((value) => (
              <Link
                href={`/news/${value.Heading.replaceAll(" ", "-")}`}
                key={value._id["$oid"]}
              >
                <li className="relative my-3">
                  <Image
                    src={
                      value.local_image_url
                        ? value.local_image_url
                        : value.Title_image
                    }
                    alt="image"
                    height="300"
                    width="400"
                    className="object-fill rounded-none h-[170px]"
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}
                  />
                  <p className="bg-[#392b95] shadow-md font-semibold py-1 text-white px-6 absolute -bottom-4 w-[85%] left-[50%] -translate-x-[50%]">
                    {value.Title.slice(0, 60)} ...
                  </p>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
}

export default MustRead;
