import dynamic from "next/dynamic";
import HeroSlider from "@/components/HeroSlider";
// import NewsSection from "@/components/NewsSection";
// import YtShorts from "@/components/YTShorts";
import TopNewsSlider from "@/components/TopNewsSlider";
// import Script from "next/script";
// import WebStories from "@/components/WebStories";
// import VideoGroup from "@/components/VideoGroup";

const NewsSection = dynamic(() => import("@/components/NewsSection"));
const YtShorts = dynamic(() => import("@/components/YTShorts"))

const categoryList = [
  "Chhattisgarh",
  "Weather",
  "Election",
  "Entertainment",
  "Education",
  "Employment",
  "Lok-Sabha-Election",
  "Naxal",
  "Politics",
  "Accident",
  "Sports",
  "Disaster",
  "Crime",
  "Administrative",
  "Judiciary",
  "World-cup",
  "Finance",
  "Technology",
  "Business",
  "Other",
];

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <TopNewsSlider />
      <YtShorts />
      {/* <div className="flex ">
        <iframe src="https://www.tradingview-widget.com/embed-widget/hotlists/?locale=in#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22exchange%22%3A%22BSE%22%2C%22showChart%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Afalse%2C%22showFloatingTooltip%22%3Afalse%2C%22width%22%3A400%2C%22height%22%3A407%2C%22utm_source%22%3A%22localhost%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22hotlists%22%2C%22page-uri%22%3A%22localhost%3A3000%2F%22%7D"></iframe>
        <iframe
          src="https://widget.crictimes.org/"
          style={{ width: "25%", minHeight: "450px" }}
        ></iframe>
      </div> */}
      {/* <WebStories /> */}
      {/* <VideoGroup /> */}
      {categoryList.map((category) => (
        <NewsSection category={category} key={category} />
      ))}
    </div>
  );
}
