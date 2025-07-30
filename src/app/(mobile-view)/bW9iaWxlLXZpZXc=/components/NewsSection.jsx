import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";
import NewsSectionHeader from "./NewsSectionHeader";
import prisma from "@/utils/db";
async function getData(category) {
  const data = await prisma.all_news.findMany({
    where: {
      Category: {
        has: category,
      },
    },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return data;
}
async function NewsSection({ category }) {
  const news = await getData(category);
  if (news.length === 0) {
    return null;
  }
  return (
    <div className="mt-7">
      <NewsSectionHeader category={category} />
      <ul className="grid grid-cols-2 gap-3">
        {news.map((value) => (
          <li className="" key={value.id}>
            <div className="  rounded-lg h-fll">
              <Image
                height="200"
                width="200"
                className="h-[85px] rounded-lg"
                src={
                  value.local_image_url
                    ? value.local_image_url
                    : value.Title_image
                }
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(800, 380)
                )}`}
                alt="image"
              />
              <div className="p-1">
                <Link
                  href={`/bW9iaWxlLXZpZXc=/news/${value.Heading.replaceAll(
                    " ",
                    "-"
                  )}`}
                >
                  <p>{value.Title.slice(0, 75)}</p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center dark:bg-black pt-4">
        <div className="border-t-[2px] border-gray-800 w-[85%]"></div>
      </div>
    </div>
  );
}

export default NewsSection;
