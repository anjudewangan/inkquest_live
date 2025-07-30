import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const search = new URL(req.nextUrl).search;
    const urlParams = new URLSearchParams(search);

    const params = {
      search: urlParams.get("s"),
      page: urlParams.get("page"),
      limit: urlParams.get("limit"),
    };

    if (!params.search) {
      return NextResponse.json({ error: "Invalid params" }, { status: 400 });
    }

    const limit = params.limit || 10;
    const page = Number(params.page) || 1;
    let skip = limit * page - limit;
    console.debug({ limit, page, skip });

    const pipeline = [
      {
        $match: {
          $or: [
            { Title: { $regex: params.search, $options: "i" } },
            { Tags: { $regex: params.search, $options: "i" } },
          ],
        },
      },
    ];

    const news = await prisma.all_news.aggregateRaw({
      pipeline: [
        ...pipeline,
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            _id: 1,
            Title: 1,
            doc_count: 1,
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
    // let count = 0;
    let count = await prisma.all_news.aggregateRaw({ pipeline: [...pipeline] });
    count = count.length;
    return NextResponse.json({ count, news });
}
