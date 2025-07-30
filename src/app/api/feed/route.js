import Rss from "rss";
import { utcToZonedTime } from "date-fns-tz";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

const SITE_URL = "https://inkquest.in";
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
    .slice(0, 250);
export async function GET(req) {
  const search = new URL(req.nextUrl).search;
  const news = await await prisma.all_news.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  const feed = new Rss({
    title: "InkQuest Media",
    description:
      "Your News, Your Voice, where we embark on a relentless quest for news and insights that matter",
    feed_url: `${SITE_URL}/feed`,
    site_url: SITE_URL,
    language: "en",
    custom_namespaces: {
      content: "http://purl.org/rss/1.0/modules/content/",
      media: "http://search.yahoo.com/mrss/",
    },
  });

  news.forEach((article) => {
    feed.item({
      title: article.Title,
      description: HTMLPartToTextPart(article.Description),
      url: `${SITE_URL}/news/${article.Heading.replaceAll(" ", "-")}?cat=${
        article.Category
      }`,
      date: utcToZonedTime(article.updatedAt, "Asia/Kolkata"),
      author: article.Author,
      categories: article.Category,
      custom_elements: [
        {
          "media:content": {
            _attr: {
              url: article.Title_image,
              medium: "image",
            },
          },
        },
        {
          "content:encoded": `<![CDATA[<div><img src="${
            article.Title_image
          }" alt="${article.Title}"></div> <div>${HTMLPartToTextPart(
            article.Description
          )}</div>]]>`,
        },
        {
          "media:thumbnail": {
            _attr: {
              url: article.Title_image,
            },
          },
        },
      ],
    });
  });

  return new NextResponse(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}