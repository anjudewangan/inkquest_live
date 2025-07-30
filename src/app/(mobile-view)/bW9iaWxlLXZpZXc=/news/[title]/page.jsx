import Image from "next/image";
import { utcToZonedTime } from "date-fns-tz";
import { redirect } from "next/navigation";

import prisma from "@/utils/db";
import LoadNews from "@/components/LoadNews";
import { shimmer, toBase64 } from "@/utils/shimmer";
import BackButton from "./components/BackButton";
import ShareButton from "@/components/ShareButton";

import "./style.css";
async function getData(title) {
  const data = await prisma.all_news.findMany({ where: { Heading: title } });
  return data;
}

async function getAds(limit) {
  const query = {
    orderBy: { createdAt: "desc" },
    take: limit || 1,
  };
  const ads = await prisma.ads.findMany(query);
  return ads;
}

async function Page({ params }) {
  const title = params.title;
  const news = await getData(title.replaceAll("-", " "));
  const ads = await getAds(1);
  const mainAds = [...ads];
  if (news.error) {
    redirect("/404");
  }
  return (
    <div>
      <div className="relative">
        <Image
          height="281"
          width="375"
          className="rounded-b-3xl w-full h-[281px] fixed top-0 -z-20"
          src={news[0].Title_image}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(375, 281)
          )}`}
          alt="image"
        />
        <BackButton />
      </div>
      <div className="px-2 mt-[65%] pb-7 z-50 dark:bg-black bg-white rounded-t-xl pt-3">
        <h1 className=" text-2xl font-semibold tracking-wide capitalize leading-tight">
          {news[0].Title}
        </h1>
        <div className="flex justify-between  pt-4 mb-4">
          <div>
            By: <span>{news[0].Author}</span>
          </div>
          <p className="">
            Date:{" "}
            <span className=" ">
              {utcToZonedTime(
                news[0].updatedAt,
                "Asia/Kolkata"
              ).toLocaleString()}
            </span>
            {/* <div>
              {news[0].Location ? (
                <span className="capitalize">city {news[0].Location} </span>
              ) : (
                ""
              )}
            </div> */}
          </p>
        </div>
        <LoadNews news={JSON.stringify(news[0].Description)} ads={mainAds} />
        <ShareButton title={news[0].Title} />
      </div>
    </div>
  );
}

export default Page;
