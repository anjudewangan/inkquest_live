import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
function SubPage({ type, label }) {
  const [news, setnews] = useState([]);

  useEffect(() => {
    fetch(
      `/api/news?limit=3&sort-date=true&${
        type === "tags" ? `tag=${label}` : `category=${label}`
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setnews(data.news);
      });
  }, [label, type]);
  return (
    <>
      <div>
        <swiper-container
          slides-per-view="1"
          centered-slides="true"
          autoplay-delay="4000"
          autoplay-disable-on-interaction="false"
        >
          {news
            ? news.map((value) => (
                <swiper-slide key={value.id}>
                  <Link href={`/news/${value.Heading.replaceAll(" ", "-")}`}>
                    <div className="">
                      <Image
                        width="1920"
                        height="1080"
                        // className="w-full"
                        src={value.Title_image}
                        alt="image"
                      />
                      <span className="absolute top-[75%] px-3">
                        {value.Title}
                      </span>
                    </div>
                  </Link>
                </swiper-slide>
              ))
            : null}
        </swiper-container>
      </div>
    </>
  );
}

export default SubPage;
