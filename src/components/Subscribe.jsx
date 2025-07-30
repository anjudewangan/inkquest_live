"use client";
import { English, Hindi } from "@/lib/mappings";
import { useLanguageStore } from "@/store/languageStore";
function Subscribe() {
  const isHindi = useLanguageStore((state) => state.isHindi);

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-[#382f92]" content=" " />
        <p className="text-2xl font-bold tracking-wider">
          {isHindi ? Hindi["subscribe"] : English["subscribe"]}
        </p>
      </div>
      <form action="#" className="mt-3 flex flex-col gap-5 w-[75%]">
        <input
          type="text"
          name="name"
          id="name"
          placeholder={isHindi ? "नाम" : "Name"}
          className="bg-transparent border border-gray-500 -skew-x-12 p-2 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder={isHindi ? "अपना ईमेल दर्ज करें" : "Enter Your Email"}
          className="bg-transparent border border-gray-500 -skew-x-12 p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#382f92] -skew-x-12 p-2 tracking-widest uppercase "
        >
          {isHindi ? Hindi["subscribe"] : English["subscribe"]}
        </button>
      </form>
    </>
  );
}

export default Subscribe;
