import prisma from "@/utils/db";
import { NextResponse } from "next/server";

// Exclude keys from category
function exclude(news, keys) {
  return Object.fromEntries(
    Object.entries(news).filter(([key]) => !keys.includes(key))
  );
}

export async function GET(req, res) {
  const search = new URL(req.nextUrl).search;
  const urlParams = new URLSearchParams(search);

  const params = {
    category: urlParams.get("cat"),
    exclude: urlParams.get("exclude"),
    limit: urlParams.get("limit"),
  };

  const query = {
    where: {
      Category: {
        has: params.category,
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
          Title: true,
          local_image_url: true,
          Title_image: true,
          updatedAt: true,
          createdAt: true,
          currentDate: true,
          Heading: true,
          Category: true,
          Author: true,
          id: true,
          Title: true,
          local_image_url: true,
          Title_image: true,
          updatedAt: true,
          createdAt: true,
          currentDate: true,
          Heading: true,
          Category: true,
          Author: true,
    },
    take: 3,
  };

  if (params.limit) {
    query["take"] = Number(params.limit);
  }
  if (params.exclude) {
    query["where"]["NOT"] = {
      Heading: {
        equals: params.exclude.replaceAll("-", " "),
      },
    };
  }

  const news = await prisma.all_news.findMany(query);
  return NextResponse.json(news);
}