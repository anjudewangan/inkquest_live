import Image from "next/image";
import Link from "next/link";
import NewsSectionHeader from "./NewsSectionHeader";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { baseUrl } from "@/utils/baseUrl";

async function getData(url) {
  const res = await fetch(url, { next: { revalidate: 100 } });
  return res.json();
}
async function NewsSection({ category }) {
  const news = await getData(`${baseUrl}/api/category?cat=${category}&limit=8`);
  if (!(news.length > 0)) {
    return null;
  }
  return (
    <>
      <div className="dark:bg-black">
        <div className="relative px-4 dark:bg-black dark:text-white py-5 container">
          <NewsSectionHeader category={category} />
          <div className="grid grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2 pr-[0.25rem]  dark:lg:border-none lg:border-r-[2px] lg:border-dotted lg:border-[#392b95] ">
              <div className="lg:pr-6 pr-0">
                <Link
                  href={`/news/${news[0].Heading.replaceAll(" ", "-")}`}
                  title={news[0].Heading.trim()}
                  className="lg:col-span-3 relative"
                  prefetch={true}
                >
                  <div>
                    <div className="">
                      <Image
                        width="1900"
                        height="380"
                        className="rounded-xl w-full lg:w-[65vw] h-[45vh] 2xl:h-[75vh] lg:h-[75vh] "
                        src={
                          news[0].local_image_url
                            ? news[0].local_image_url
                            : news[0].Title_image
                        }
                        alt="image"
                        title={news[0].Image_description}
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(800, 380)
                        )}`}
                      />
                    </div>
                    <div className="absolute bottom-0 w-full px-3 lg:text-md bg-gradient-to-t from-gray-700 h-full rounded-xl ">
                      <p className="text-3xl grid font-ruchi h-full self-end text-white content-end pb-3">
                        {news[0].Title}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="grid lg:pr-6 pr-0 lg:grid-cols-2 lg:mt-4 dark:lg:border-none lg:border-t-2 lg:border-dotted lg:border-[#392b95] lg:pt-2">
                {news.slice(1, 3).map((item) => (
                  <div key={item.id} className="mt-4 lg:mt-0">
                    <Link
                      href={`/news/${item.Heading.replaceAll(" ", "-")}`}
                      title={item.Heading.trim()}
                      className=" block mr-[4px]"
                    >
                      <Image
                        width="250"
                        height="250"
                        alt="img"
                        className=" w-[50%] h-[9rem] lg:w-[12vw] lg:h-[17vh] float-left mr-2 rounded-xl"
                        src={
                          item.local_image_url
                            ? item.local_image_url
                            : item.Title_image
                        }
                        title={item.Image_description}
                      />
                      <p>
                        {item.Title.slice(0, 130)}{" "}
                        {item.Title.length > 130 ? "..." : ""}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-2 col-span-2 lg:col-span-1">
              <ul className="flex flex-col gap-3 pt-3 lg:pt-0 ">
                {news.slice(3).map((item) => (
                  <li key={item.id} className="">
                    <Link
                      href={`/news/${item.Heading.replaceAll(" ", "-")}`}
                      title={item.Heading.trim()}
                    >
                      <div>
                        <Image
                          width="250"
                          height="250"
                          alt="img"
                          className=" w-full lg:w-[12vw] lg:h-[17vh] lg:float-left mr-2 rounded-xl"
                          src={
                            item.local_image_url
                              ? item.local_image_url
                              : item.Title_image
                          }
                          title={item.Image_description}
                        />
                        <p className="pt-3 lg:pt-0">
                          {item.Title.slice(0, 125)}{" "}
                          {item.Title.length > 125 ? "..." : ""}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center dark:bg-black">
          <div className="  border-t-[2px] border-gray-800 w-[85%]"></div>
        </div>
      </div>
    </>
  );
}

export default NewsSection;
