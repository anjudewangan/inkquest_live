"use client";
import { categories } from "@/lib/mappings";
import { useLanguageStore } from "@/store/languageStore";
function CategoryTitles({ category, className }) {
  const isHindi = useLanguageStore((state) => state.isHindi);
  return (
    <>{isHindi ? categories[category].hindi : categories[category].english}</>
  );
}

export default CategoryTitles;
