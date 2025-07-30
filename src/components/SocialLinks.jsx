"use client";
import { English, Hindi } from "@/lib/mappings";
import { useLanguageStore } from "@/store/languageStore";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
function SocialLinks() {
  const isHindi = useLanguageStore((state) => state.isHindi);
  const social = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-lg m-2 bg" />,
      link: "https://www.facebook.com/inkquestmedia/",
    },
    // {
    //   name: "Youtube",
    //   icon: <BsYoutube className="text-lg m-2 bg" />,
    //   link: "",
    // },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-lg m-2 bg" />,
      link: "https://twitter.com/inkquest_in",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-lg m-2 bg" />,
      link: "https://www.instagram.com/inkquestmedia/",
    },
  ];
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-[#382f92]" content=" " />
        <p className="text-2xl font-semibold tracking-wider">
          {isHindi ? Hindi["socialLinks"] : English["socialLinks"]}
        </p>
      </div>
      <ul className=" flex flex-col gap-6 mt-7">
        {social.map((val) => (
          <li
            className="group hover:cursor-pointer lg:w-[75%] w-[95%]"
            key={val.name}
          >
            <a target="_blank" href={val.link}>
              <span className="flex items-center gap-2 border-2 border-[#252525] group-hover:border-[#382f92] -skew-x-12">
                <div className="dark:bg-[#252525] group-hover:bg-[#382f92]">
                  {val.icon}
                </div>
                <p>{val.name}</p>
                <div className="pr-2 ml-auto">Follow</div>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SocialLinks;
