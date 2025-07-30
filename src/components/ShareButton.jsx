"use client";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "next-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faWhatsapp,
  faTelegram,
  faFacebook,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

function ShareButton({ title }) {
  const [url, seturl] = useState();
  useEffect(() => {
    seturl(window.location.href);
  });
  return (
    <div className="flex w-full justify-center py-4 lg:pt-6">
      <ul className="flex gap-4">
        <li>
          <WhatsappShareButton url={url} title={title} separator=":: ">
            <div className="  rounded-full h-10 w-10 flex justify-center items-center ">
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="2x"
                className="text-[#382f92]"
              />
            </div>
          </WhatsappShareButton>
        </li>
        <li>
          <TwitterShareButton url={url} title={title}>
            <div className="  rounded-full h-10 w-10 flex justify-center items-center ">
              <FontAwesomeIcon
                icon={faXTwitter}
                size="2x"
                className="text-[#382f92]"
              />
            </div>
          </TwitterShareButton>
        </li>
        <li>
          <LinkedinShareButton url={url}>
            <div className="  rounded-full h-10 w-10 flex justify-center items-center ">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                size="2x"
                className="text-[#382f92]"
              />
            </div>
          </LinkedinShareButton>
        </li>
        <li>
          <FacebookShareButton url={url} quote={title}>
            <div className="  rounded-full h-10 w-10 flex justify-center items-center ">
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                className="text-[#382f92]"
              />
            </div>
          </FacebookShareButton>
        </li>
        <li>
          <TelegramShareButton url={url} title={title}>
            <div className="  rounded-full h-10 w-10 flex justify-center items-center ">
              <FontAwesomeIcon
                icon={faTelegram}
                size="2x"
                className="text-[#382f92]"
              />
            </div>
          </TelegramShareButton>
        </li>
      </ul>
    </div>
  );
}

export default ShareButton;
