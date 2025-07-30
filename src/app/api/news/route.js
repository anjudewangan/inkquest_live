import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const search = new URL(req.nextUrl).search;
  const urlParams = new URLSearchParams(search);

  const params = {
    limit: Number(urlParams.get("limit")),
    page: Number(urlParams.get("page")),
    sortDate: Boolean(urlParams.get("sort-date")),
    category: urlParams.get("category"),
    editorsChoice: urlParams.get("editorsChoice"),
    sideBanner: urlParams.get("side-banner"),
    tags: urlParams.get("tag"),
    skip: urlParams.get("skip"),
    exclude: urlParams.get("exclude"),
    trending: urlParams.get("trending"),
  };

  const limit = params.limit || 10;
  const page = params.page || 1;
  let skip = limit * page - limit;
  const pipeline = [{ $match: { $and: [{ createdAt: { $exists: true } }] } }];

  if (params.editorsChoice) {
    pipeline[0]["$match"]["$and"].push({ EditorChoice: true });
  }
  if (params.category) {
    pipeline[0]["$match"]["$and"].push({ Category: params.category });
  }

  if (params.sortDate) {
    pipeline.push({ $sort: { createdAt: -1 } });
  }
  if (params.sideBanner) {
    skip = 4;
  }

  if (params.tags) {
    pipeline[0]["$match"]["$and"].push({ Tag: params.tags });
  }
  if (params.skip) {
    skip += Number(params.skip);
  }
  if (params.exclude) {
    pipeline[0]["$match"]["$and"].push({
      $expr: { $ne: ["$Heading", params.exclude] },
    });
  }
  if (params.trending) {
    pipeline[0]["$match"]["$and"].push({ Sub_category: { $in: ["trending"] } });
  }
  let count = await prisma.all_news.aggregateRaw({
    pipeline: [
      ...pipeline,
      { $group: { _id: null, count: { $sum: 1 } } },
      {
        $project: {
          count: 1,
          _id: 0,
        },
      },
    ],
  });
  if (count.length === 0) {
    count = 0;
  } else {
    count = count[0].count;
  }
  const news = await prisma.all_news.aggregateRaw({
    pipeline: [
      ...pipeline,
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          Title: 1,
          local_image_url: 1,
          Title_image: 1,
          updatedAt: 1,
          createdAt: 1,
          currentDate: 1,
          Heading: 1,
          Category: 1,
          Author: 1,
        },
      },
    ],
  });

  return NextResponse.json({
    news,
    ...(params.skip ? { count: count - Number(params.skip) } : { count }),
  });
}
