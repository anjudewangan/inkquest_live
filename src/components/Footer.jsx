"use client";
import { useEffect } from "react";
import Link from "next/link";
import EditorsChoiceFooter from "./EditorsChoiceFooter";
import { useLanguageStore } from "@/store/languageStore";
import { English, Hindi, categories } from "@/lib/mappings";
import Image from "next/image";
import CustomTagCloud from "./TagCloud";
function Footer() {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const tags = [
    "Election",
    "Politics",
    "Entertainment",
    "Sports",
    "Crime",
    "Administrative",
    "Finance",
    "Technology",
    "Business",
  ];
  // disable inspect menu
  useEffect(() => {
    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
      }
    };
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }, []);
  const date = new Date().getFullYear();
  return (
    <>
      <div className="dark:bg-black grid lg:grid-cols-6  dark:text-white py-6 lg:px-28 px-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mt-4 lg:mt-0 px-4">
            <div className="h-4 w-4 bg-[#382f92]" content=" " />
            <p className="text-2xl font-bold tracking-wider">
              {isHindi ? Hindi["editorsChoice"] : English["editorsChoice"]}
            </p>
          </div>
          <EditorsChoiceFooter />
        </div>
        <div className="col-span-2 mt-8">
          <EditorsChoiceFooter skip={2} />
        </div>
        <div className="col-span-2 pl-3">
          <div className="mt-10 flex flex-col justify-center items-center gap-y-3 ">
            <p className="text-xl font-bold">
              सुर्खियों से परे, सच्चाई तक: ऐप डाउनलोड करें, खबरों का असली चेहरा
              देखें।
            </p>
            <Link
              href="https://play.google.com/store/apps/details?id=io.kodular.e_jeevita_rao.InkquestMedia"
              target="_blank"
            >
              <Image
                src="/assets/img/logo/google.jpg"
                alt="logo"
                height="175"
                width="250"
                priority
                className=""
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-7 lg:mt-7 ">
            <div className="h-4 w-4 bg-[#382f92]" content=" " />
            <p className="text-2xl font-bold tracking-wider">
              {isHindi ? Hindi["tagsCloud"] : English["tagsCloud"]}
            </p>
          </div>
          <CustomTagCloud />
        </div>
      </div>
      <div className=" dark:bg-black dark:text-white px-5">
        <div className="flex items-center justify-center">
          <div className="  border-t-[1px] border-gray-800 w-[85%]"></div>
        </div>
        <div className="grid gap-y-4 grid-cols-1 lg:grid-cols-[150px_repeat(3,_auto)] py-4 lg:px-28">
          <div className="p-2 flex justify-center items-center lg:block">
            <Image
              src="/assets/img/inkquest-img.jpeg"
              alt="logo"
              height="75"
              width="95"
              className=""
            />
          </div>
          {/* <div className="flex justify-center flex-col items-center p-2">
            <ul>
              <li className="text-xl mb-2">Contact Details Owner</li>
              <li>Dr. Shireesh Mishra</li>
              <li>412, Wallfort Ozone Fafadih, Raipur, C.G.</li>
              <li>+917898986008</li>
              <li>contact@inkquest.in</li>
            </ul>
          </div> */}
          <div className="pl-5 lg:pl-2 p-2">
            <ul className="ca-links mt-3 lg:mt-0  gap-3 grid grid-rows-4 grid-flow-col">
              <li className="hover:text-[#382f92] cursor-pointer">
                <Link href="/about-us">About</Link>
              </li>
              <li className="hover:text-[#382f92] cursor-pointer">
                <Link href="/sitemap.xml">Sitemap</Link>
              </li>
              <li className="hover:text-[#382f92] cursor-pointer">
                <Link href="/api/feed">RSS Feed</Link>
              </li>
              <li className="hover:text-[#382f92] cursor-pointer">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="hover:text-[#382f92] cursor-pointer">Subscribe</li>
              <li className="hover:text-[#382f92] cursor-pointer">Contact</li>
              <li className="hover:text-[#382f92] cursor-pointer">Support</li>
            </ul>
          </div>
          <div className="flex justify-center flex-col items-center p-2">
            <ul>
              <li className="text-xl mb-2">Contact Details Operator</li>
              <li>Ch Lata Rao, Executive Editor</li>
              <li>412, Wallfort Ozone Fafadih, Raipur, C.G.</li>
              <li>+917880103323</li>
              <li>contact@inkquest.in</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col  justify-between items-center pb-6 lg:px-14">
          <div className="text-center">
            <p>
              Copyright &copy; {date} rights reserved by{" "}
              <Link
                href="https://www.patiodigital.com/"
                className="hover:text-[#382f92]"
                target="_blank"
              >
                Inkquest Media
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
