"use client";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { Hindi, English, categories } from "@/lib/mappings";
import "./arrowStyle.css";
function NewsSectionHeader({ category }) {
  const isHindi = useLanguageStore((state) => state.isHindi);
  return (
    <>
      <div className="mb-2 flex content-center justify-between">
        <div className="flex items-center gap-2 dark:text-white">
          <div className="h-4 w-4 bg-[#382f92]" content=" " />
          <h3 className="text-2xl font-bold tracking-wider">
            {isHindi
              ? categories[category].hindi
              : categories[category].english}
          </h3>
        </div>
        <Link
          href={`/category/${category}`}
          className="text-xl font-bold tracking-wider flex gap-x-6"
        >
          <div className="container-test">
            <ul id="test-ul">
              <li id="test-li">
                <p className="animated-arrow">
                  <span className="the-arrow -left">
                    <span className="shaft"></span>
                  </span>
                  <span className="main">
                    <span className="text">
                      {isHindi ? Hindi["readMore"] : English["readMore"]}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </>
  );
}

export default NewsSectionHeader;
