import { redirect } from "next/navigation";

import prisma from "@/utils/db";
import Slider from "../../components/Slider";
import TopNews from "../../components/TopNews";
import Banner from "../../components/Banner";
import NewsList from "../../components/NewsList";
import CategoryPagination from "./components/CategoryPagination";

async function getData(category, limit, skip = 0) {
  const data = await prisma.all_news.findMany({
    where: {
      Category: {
        has: category,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });
  return JSON.parse(JSON.stringify(data));
}
async function Category({ params }) {
  const category = params.category;
  const sliderData = getData(category, 4);
  const topNewsData = getData(category, 8, 6);
  const bannerData = getData(category, 4, 14);
  // const newsListData = getData(category, 6, 10);
  const [slider, banner, topNews] = await Promise.all([
    sliderData,
    bannerData,
    topNewsData,
  ]);
  if (slider.length === 0) {
    redirect("/_404");
  }
  return (
    <>
      <Slider category={category} />
      <div className="p-3">
        <TopNews data={topNews} />
        <Banner data={banner} />
        {/* <NewsList data={newsList} /> */}
        <CategoryPagination category={params.category} />
      </div>
    </>
  );
}

export default Category;
