import prisma from "@/utils/db";
import { NextResponse } from "next/server";
export async function GET(req) {
    const search = new URL(req.nextUrl).search;
    const urlParams = new URLSearchParams(search);

    const params = {
        limit: Number(urlParams.get("limit")),
    };

    const limit = params.limit || 10;
    const data = await prisma.youtube_shorts.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: limit,
    });

    return NextResponse.json({
        data
    });
}
