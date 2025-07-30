import Banner from "./components/Banner";
import TopNews from "./components/TopNews";
import Slider from "./components/Slider";
import VideoSlider from "./components/VideoSlider";
import NewsList from "./components/NewsList";
import prisma from "@/utils/db";
import NewsSection from "./components/NewsSection";
import { baseUrl } from "@/utils/baseUrl";

async function getData(limit, skip = 0) {
  // const dataRes = await fetch(`${baseUrl}/api/news?limit=3&sort-date=true`, {
  //   next: { revalidate: 3600 },
  // });
  // const newData = await dataRes.json();
  const data = await prisma.all_news.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });
  return JSON.parse(JSON.stringify(data));
}

async function Page() {
  const sliderData = getData(4);
  const bannerData = getData(4, 10);
  const newsListData = getData(6, 10);
  const topNewsData = getData(8, 6);
  const [slider, banner, topNews, newsList] = await Promise.all([
    sliderData,
    bannerData,
    topNewsData,
    newsListData,
  ]);
  const categoryList = [
    "Politics",
    "Entertainment",
    "Sports",
    "Crime",
    "Administrative",
    "World-cup",
    "Election",
    "Other",
    "Finance",
    "Technology",
    "Business",
  ];
  return (
    <>
      <Slider data={slider} />
      <div className="px-3">
        <TopNews data={topNews} />
        <VideoSlider />
        <Banner data={banner} />
        {/* <NewsList data={newsList} /> */}
        {categoryList.map((category) => (
          <NewsSection category={category} key={category} />
        ))}
      </div>
    </>
  );
}

export default Page;
