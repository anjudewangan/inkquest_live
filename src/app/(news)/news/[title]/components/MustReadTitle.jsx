"use client";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi } from "@/lib/mappings";
function MustReadTitle() {
  const isHindi = useLanguageStore((state) => state.isHindi);
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-[#382f92]" content=" " />
      <p className="text-2xl font-bold tracking-wider">
        {isHindi ? Hindi["newsUpdate"] : English["newsUpdate"]}
      </p>
    </div>
  );
}

export default MustReadTitle;
