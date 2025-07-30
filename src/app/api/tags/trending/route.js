import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const search = new URL(req.nextUrl).search;
  const urlParams = new URLSearchParams(search);
  const news = await prisma.all_news.aggregateRaw({
    pipeline: [
      {
        $project: {
          Tag: 1,
        },
      },
      {
        $unwind: {
          path: "$Tag",
        },
      },
      {
        $group: {
          _id: "$Tag",
          count: { $count: {} },
        },
      },
      {
        $match: {
          _id: { $ne: "" },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: Number(urlParams.get("limit")) || 5,
      },
      {
        $project: {
          value: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ],
  });
  return NextResponse.json(news);
}
