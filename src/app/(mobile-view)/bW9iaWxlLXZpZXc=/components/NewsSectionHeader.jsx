"use client";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { Hindi, English, categories } from "@/lib/mappings";
function NewsSectionHeader({ category }) {
  const isHindi = useLanguageStore((state) => state.isHindi);
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="mb-1 text-2xl font-bold border-b-2 border-[#fff]">
          {isHindi ? categories[category].hindi : categories[category].english}
        </h3>
        <Link
          className="lg:mr-4 border-b-2 border-[#fff]"
          href={`bW9iaWxlLXZpZXc=/categories/${category}`}
          title={`Page for ${category}`}
        >
          {isHindi ? Hindi["readMore"] : English["readMore"]}
        </Link>
      </div>
    </>
  );
}

export default NewsSectionHeader;
