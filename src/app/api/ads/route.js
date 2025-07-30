import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const search = new URL(req.nextUrl).search;
  const urlParams = new URLSearchParams(search);

  const params = {
    limit: urlParams.get("limit"),
  };
  const query = {
    orderBy: { createdAt: "desc" },
    take: 1,
  };
  if (params.limit) {
    query["take"] = Number(params.limit);
  }
  const ads = await prisma.ads.findMany(query);
  return NextResponse.json(ads);
}
