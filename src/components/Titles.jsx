"use client";
import { Hindi, English } from "@/lib/mappings";
import { useLanguageStore } from "@/store/languageStore";

function Titles({ title }) {
  const isHindi = useLanguageStore((state) => state.isHindi);
  return <>{isHindi ? Hindi[title] : English[title]}</>;
}

export default Titles;
