import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faXTwitter,
  faWhatsapp,
  faFacebook,
  faLinkedinIn,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function SocialFollow() {
  return (
    <div className=" ">
      <div className="flex gap-x-4  ">
        <div className="">
          <Link
            href="https://whatsapp.com/channel/0029VaFAgjy545uuG6Al1T3F"
            target="_blank"
            className=" flex justify-center items-center "
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="lg"
              className="text-white text-2xl"
            />
          </Link>
        </div>
        <div className="">
          <Link
            href="https://twitter.com/inkquest_in"
            target="_blank"
            className=" flex justify-center items-center "
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              size="lg"
              className="text-white text-2xl"
            />
          </Link>
        </div>
        <div className="">
          <Link
            href="https://www.linkedin.com/company/inkquestmedia"
            target="_blank"
            className=" flex justify-center items-center "
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              size="lg"
              className="text-white text-2xl"
            />
          </Link>
        </div>
        <div className="">
          <Link
            href="https://www.facebook.com/inkquestmedia/"
            target="_blank"
            className=" flex justify-center items-center "
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="text-white text-2xl"
            />
          </Link>
        </div>
        <div className="">
          <Link
            href="https://youtube.com/@inkquestmedia?si=J23QJEJPrc-x19b2"
            target="_blank"
            className=" flex justify-center items-center "
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="lg"
              className="text-white text-2xl"
            />
          </Link>
        </div>
        <div className="">
          <Link
            href="https://www.instagram.com/inkquestmedia/"
            target="_blank"
            className=" flex justify-center items-center "
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="text-white text-2xl"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SocialFollow;
