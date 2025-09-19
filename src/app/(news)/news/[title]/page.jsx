import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import { utcToZonedTime } from "date-fns-tz";
import SocialLinks from "@/components/SocialLinks";
import MustRead from "./components/MustRead";
import ShareButton from "@/components/ShareButton";
import Twitter from "./components/Twitter";
import { baseUrl } from "@/utils/baseUrl";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";
import MustReadTitle from "./components/MustReadTitle";
import LoadNews from "@/components/LoadNews";
import prisma from "@/utils/db";
import "./style.css";
import AdsSlider from "./components/AdsSlider";

const HTMLPartToTextPart = (HTMLPart) =>
  HTMLPart.replace(/\n/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/gi, "")
    .replace(/<\/\s*(?:p|div)>/gi, "\n")
    .replace(/<br[^>]*\/?>/gi, "\n")
    .replace(/<[^>]*>/gi, "")
    .replace("&nbsp;", " ")
    .replace(/[^\S\r\n][^\S\r\n]+/gi, " ")
    .slice(0, 500);

async function getData(url) {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

async function getMustReadNews(categories, heading) {
  let news = [];
  switch (categories.length) {
    case 1: {
      news = await prisma.all_news.aggregateRaw({
        pipeline: [
          {
            $match: {
              $and: [
                { "Category.0": categories[0] },
                { $expr: { $ne: ["$Heading", heading] } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 3 },
        ],
      });
      break;
    }
    case 2: {
      let temp = await prisma.all_news.aggregateRaw({
        pipeline: [
          {
            $match: {
              $and: [
                { "Category.0": categories[0] },
                { $expr: { $ne: ["$Heading", heading] } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 2 },
        ],
      });
      news = [...temp];
      temp = await prisma.all_news.aggregateRaw({
        pipeline: [
          {
            $match: {
              $and: [
                { "Category.0": categories[1] },
                { $expr: { $ne: ["$Heading", heading] } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
      });
      news = [...news, ...temp];
      break;
    }
    default: {
      let temp = await prisma.all_news.aggregateRaw({
        pipeline: [
          {
            $match: {
              $and: [
                { "Category.0": categories[0] },
                { $expr: { $ne: ["$Heading", heading] } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
      });
      news = [...temp];
      temp = await prisma.all_news.aggregateRaw({
        pipeline: [
          {
            $match: {
              $and: [
                { "Category.0": categories[1] },
                { $expr: { $ne: ["$Heading", heading] } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
      });
      news = [...news, ...temp];
      temp = await prisma.all_news.aggregateRaw({
        pipeline: [
          {
            $match: {
              $and: [
                { "Category.0": categories[2] },
                { $expr: { $ne: ["$Heading", heading] } },
              ],
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
      });
      news = [...news, ...temp];
      break;
    }
  }
  return news;
}

export async function generateMetadata({ params }, parent) {
  // fetch data
  const title = params.title;
  const news = await getData(`${baseUrl}/api/news/${title}/`);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: news[0].Title,
    description: `${HTMLPartToTextPart(news[0].Description)}`,
    openGraph: {
      images: [news[0].Title_image],
      title: news[0].Title,
      description: `${HTMLPartToTextPart(news[0].Description)}`,
      type: "article",
      publishedTime: utcToZonedTime(news[0].createdAt, "Asia/Kolkata"),
      modifiedTime: utcToZonedTime(news[0].updatedAt, "Asia/Kolkata"),
      authors: [news[0].Author],
      siteName: "Inkquest Media",
    },
    appLinks: {
      android: {
        package: "io.kodular.e_jeevita_rao.InkquestMedia",
        app_name: "Inkquest Media",
      },
      web: {
        url: "https://inkquest.in",
        should_fallback: true,
      },
    },
    authors: [{ name: news[0].Author }],
    publisher: "Inkquest Media",
    keywords: `${news[0].Tag.join(" ")} ${news[0].Category.join(
      " "
    )} ${news[0].Sub_category.join(" ")}`,

    twitter: {
      card: "summary_large_image",
      title: news[0].Title,
      description: `${HTMLPartToTextPart(news[0].Description)}`,
      site: "@Inkquest_in",
      creator: "@Inkquest_in",
      images: [news[0].Title_image],
    },
    alternates: {
      canonical: `https://inkquest.in/news/${news[0].Heading.replaceAll(
        " ",
        "-"
      )}`,
    },
    other: {
      news_keywords: news[0].Tag.join(" "),
    },
  };
}

async function page({ params }) {
  const title = params.title;
  const news = await getData(`${baseUrl}/api/news/${title}/`);
  if (news.error) {
    redirect("/404");
  }
  const ads = await getData(`${baseUrl}/api/ads?limit=3`);
  const mainAds = [ads.shift()];
  const tagsAds = ads.shift();
  const sidebarAds = ads.shift();
  const topAds = await getData(`${baseUrl}/api/ads?limit=12`);
  const mustReadNews = await getMustReadNews(news[0].Category, news[0].Heading);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: news[0].Author,
    headline: news[0].Title,
    datePublished: utcToZonedTime(news[0].createdAt, "Asia/Kolkata"),
    dateModified: utcToZonedTime(news[0].updatedAt, "Asia/Kolkata"),
    image: news[0].local_image_url,
  };

  return (
    <>
      <div className="dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container px-2 lg:px-12 py-6 dark:text-white">
          <div className="grid lg:grid-cols-7">
            <div className="lg:col-span-5 px-2 lg:pr-8 overflow-hidden">
              <div>
                <h1 className=" text-4xl pt-2 font-semibold tracking-wide capitalize leading-tight">
                  {news[0].Title}
                </h1>
                <div className="flex justify-between  mt-2">
                  <div>
                    By: <span>{news[0].Author}</span>{" "}
                  </div>
                  <div className="grid lg:grid-cols-[auto,auto]">
                    <div>
                      {news[0].Location ? (
                        <span className="capitalize">
                          {news[0].Location}{" "}
                          <span className="hidden lg:inline mr-1">|</span>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {utcToZonedTime(
                        news[0].updatedAt,
                        "Asia/Kolkata"
                      ).toLocaleString()}
                    </div>
                  </div>
                  {/* <p className="">
                    {news[0].Location ? (
                      <span className="capitalize">{news[0].Location} |</span>
                    ) : (
                      ""
                    )}{" "}
                    Date:{" "}
                    <span className=" ">
                      {utcToZonedTime(
                        news[0].updatedAt,
                        "Asia/Kolkata"
                      ).toLocaleString()}
                    </span>
                  </p> */}
                </div>
                <div className="flex flex-col items-center justify-center mt-5 ">
                  <Image
                    src={
                      news[0].local_image_url
                        ? news[0].local_image_url
                        : news[0].Title_image
                    }
                    height="1080"
                    width="1920"
                    alt="image"
                    className="w-full   rounded-none"
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(500, 500)
                    )}`}
                  />
                  <p className="mt-1 text-sm italic pb-1 mb-5 self-start border-b-2 border-[#fff] text-gray-500 w-[95%]">
                    {news[0].Image_description}
                  </p>
                </div>

                {/* <AdsSlider images={topAds} /> */}
                {/* <LoadNews ads={topAds} />
                <div
                  className="flex news-content flex-col gap-y-2"
                  id="news-text"
                  dangerouslySetInnerHTML={{
                    __html: news[0].Description.replaceAll(
                      /PDF@(https:\/\/[^\s<]+)/gm,
                      (match, url) =>
                        `<iframe src="https://docs.google.com/viewer?url=${url}f&embedded=true" class="pdf-view" style="" loading="lazy"></iframe>`
                    ),
                  }}
                ></div> */}
                {(() => {
                  const descriptionHtml = news[0].Description.replaceAll(
                    /PDF@(https:\/\/[^\s<]+)/gm,
                    (match, url) =>
                      `<iframe src="https://docs.google.com/viewer?url=${url}f&embedded=true" class="pdf-view" style="" loading="lazy"></iframe>`
                  );

                  const parts = descriptionHtml.split("</p>");

                  return (
                    <div className="flex news-content flex-col gap-y-2" id="news-text">
                      {parts.map((part, index) => {
                        if (!part.trim()) return null;

                        return (
                          <React.Fragment key={index}>
                            <div dangerouslySetInnerHTML={{ __html: part + "</p>" }} />

                            {index === 0 && <AdsSlider images={topAds} />}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  );
                })()}
                {news[0].x_id && <Twitter link={news[0].x_id} />}
                <div className="lg:mt-4 mt-2 flex gap-3 flex-wrap">
                  {news[0].Tag.map((tag) =>
                    tag !== "" ? (
                      <span
                        key={tag}
                        className="border-2 border-[#382f92] px-3 -skew-x-12 "
                      >
                        <Link href={`/tags/${tag}`}>{tag}</Link>
                      </span>
                    ) : null
                  )}
                </div>
                <AdsSlider images={topAds} />
                <div className="flex justify-center mt-4 items-center ">
                  <a
                    href="https://whatsapp.com/channel/0029VaFAgjy545uuG6Al1T3F"
                    target="_blank"
                    className="px-3 py-1 bg-[#25d366]  border-2 border-[#25d366]  rounded-xl flex justify-between items-center group hover:cursor-pointer gap-x-2"
                  >
                    <span className="font-semibold mt-[3px] ">
                      व्हॉट्सऐप चैनल फॉलो करें
                    </span>
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" className="" />
                  </a>
                </div>
                <ShareButton title={news[0].Title} />

                {/* <Instagram /> */}
              </div>
            </div>
            <div className="lg:col-span-2">
              <MustReadTitle />
              <div>
                <MustRead title={params.title} mustRead={mustReadNews} />
                {sidebarAds && (
                  <div className="flex flex-col p-2 mt-5 items-center ">
                    <div className="relative">
                      <div className="absolute w-full flex mt-1 px-3"></div>
                      <Image
                        width="500"
                        height="500"
                        className="rounded-md h-[180px] w-[262px]"
                        src={sidebarAds.imageUrl}
                        alt="image"
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(500, 500)
                        )}`}
                      />
                    </div>
                  </div>
                )}
                <div className="mt-6">
                  <SocialLinks />
                </div>
                {/* <div className="mt-6">
              <Subscribe />
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
