import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const heading = context.params.newsId.replaceAll('-', ' ');
  try {
    const news = await prisma.all_news.findMany({ where: { Heading: heading } });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: true });
  }
}
