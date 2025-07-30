"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowDropdown } from "@react-icons/all-files/io/IoIosArrowDropdown";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { BsClockHistory } from "@react-icons/all-files/bs/BsClockHistory";
import { GoPrimitiveDot } from "@react-icons/all-files/go/GoPrimitiveDot";

import { useLanguageStore } from "@/store/languageStore";
import Link from "next/link";
import NavBarNews from "../NavBarNews";
import SocialFollow from "../SocialFollow";
import { Hindi, English, categories } from "@/lib/mappings";
function NavbarHindi() {
  const changeLanguage = useLanguageStore((state) => state.changeLanguage);
  const isHindi = useLanguageStore((state) => state.isHindi);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);

  const menuWrapper = useRef(null);
  const menuOverlay = useRef(null);
  const navOptions = useRef(null);

  const hambergerChange = () => {
    menuWrapper.current.classList.toggle("show-humberger-menu");
    menuOverlay.current.classList.toggle("active");
    navOptions.current.classList.toggle("humberger-change");
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <div
            className="humberger-menu-overlay"
            onClick={hambergerChange}
            ref={menuOverlay}
          ></div>
          <div className="humberger-menu-wrapper" ref={menuWrapper}>
            <div className="hw-logo">
              <Link href="/">
                <img
                  src="/assets/img/logo/logo-img.jpg"
                  alt=""
                  className="h-[45px] w-[45px]"
                />
              </Link>
            </div>
            <button
              className=" text-zinc-300 sm:hidden"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            >
              मेन्यू &darr;
            </button>
            <div
              className={`hw-menu mobile-menu ${
                mobileMenu ? "block" : "hidden"
              }`}
            >
              <ul>
                <li>
                  <Link href="/" onClick={hambergerChange}>
                    मुख्य पृष्ठ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/Sports"
                    onClick={hambergerChange}
                    className="cursor-pointer"
                  >
                    खेल खबर
                    {/* <IoIosArrowDropdown className="text-lg" /> */}
                  </Link>
                  {/* <ul className={`dropdown ${dropdown1 ? "block" : "hidden"}`}>
                    <li>
                      <a href="#">बेसबॉल</a>
                    </li>
                    <li>
                      <a href="#">क्रिकेट</a>
                    </li>
                    <li>
                      <a href="#">फ़ुटबॉल</a>
                    </li>
                    <li>
                      <a href="#">हॉकी</a>
                    </li>
                    <li>
                      <a href="#">बैडमिंटन</a>
                    </li>
                    <li>
                      <a href="#">टेनिस</a>
                    </li>
                    <li>
                      <a href="#">टेबल टेनिस</a>
                    </li>
                  </ul> */}
                </li>
                <li>
                  <Link
                    href="/category/Business"
                    onClick={hambergerChange}
                    className="cursor-pointer"
                  >
                    व्यवसाय
                    {/* <IoIosArrowDropdown className="text-lg" /> */}
                  </Link>
                  {/* <ul className={`dropdown ${dropdown2 ? "block" : "hidden"}`}>
                    <li>
                      <a href="#">सॉफ़्टवेयर </a>
                    </li>
                    <li>
                      <a href="#">हार्डवेयर </a>
                    </li>
                    <li>
                      <a href="#">ऑटोमोबाइल</a>
                    </li>
                  </ul> */}
                </li>
                <li>
                  <Link
                    href="/category/Entertainment"
                    onClick={hambergerChange}
                    className="cursor-pointer"
                  >
                    मनोरंजन
                    {/* <IoIosArrowDropdown className="text-lg" /> */}
                  </Link>
                  {/* <ul className={`dropdown ${dropdown3 ? "block" : "hidden"}`}>
                    <li>
                      <a href="#">वीडियो</a>
                    </li>
                    <li>
                      <a href="#">गेलरी</a>
                    </li>
                    <li>
                      <a href="#">बॉलीवुड</a>
                    </li>
                    <li>
                      <a href="#">हस्तियाँ</a>
                    </li>
                    <li>
                      <a href="#">टीवी</a>
                    </li>
                    <li>
                      <a href="#">समीक्षा</a>
                    </li>
                    <li>
                      <a href="#">भोजपुरी</a>
                    </li>
                    <li>
                      <a href="#">गप करना</a>
                    </li>
                    <li>
                      <a href="#">क्षेत्रीय</a>
                    </li>
                    <li>
                      <a href="#">हॉलीवुड</a>
                    </li>
                    <li>
                      <a href="#">ओटीटी</a>
                    </li>
                  </ul> */}
                </li>
                <li>
                  <Link href="/category/Politics" onClick={hambergerChange}>
                    राजनीति
                  </Link>
                </li>
                {/* <li>
                  <a href="#">देश दुनिया</a>
                </li>
                <li>
                  <a href="#">राज्य-शहर</a>
                </li> */}
                {/* <li>
                  <Link href="/category/Finance" onClick={hambergerChange}>
                    वित्त{" "}
                  </Link>
                </li> */}
                {/* <li>
                  <a href="#">नौकरियाँ और आजीविका</a>
                </li>
                <li>
                  <a href="#">स्वास्थ्य एवं मन</a>
                </li>
                <li>
                  <a href="#">समानता</a>
                </li>
                <li>
                  <a href="#">समाज</a>
                </li>
                <li>
                  <a href="#">उद्योग</a>
                </li>
                <li>
                  <a href="#">अर्थशास्त्र</a>
                </li>
                <li>
                  <a href="#">पॉडकास्ट</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setDropdown4(!dropdown4);
                    }}
                    className="cursor-pointer"
                  >
                    जीवन शैली <IoIosArrowDropdown className="text-lg" />
                  </a>
                  <ul className={`dropdown ${dropdown4 ? "block" : "hidden"}`}>
                    <li>
                      <a href="#">स्वास्थ्य</a>
                    </li>
                    <li>
                      <a href="#">रिश्ता</a>
                    </li>
                    <li>
                      <a href="#">पहनावा</a>
                    </li>
                    <li>
                      <a href="#">खाना</a>
                    </li>
                    <li>
                      <a href="#">सुंदरता </a>
                    </li>
                    <li>
                      <a href="#">संस्कृति</a>
                    </li>
                    <li>
                      <a href="#">यात्रा</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">समाचार</a>
                </li>
                <li>
                  <a href="#">काम</a>
                </li>
                <li>
                  <a href="#">ज्योतिष</a>
                </li>
                <li>
                  <a href="#">ओपिनियन</a>
                </li>
                <li>
                  <a href="#">ऑटो</a>
                </li>
                <li>
                  <a href="#">विज्ञान</a>
                </li>
                <li>
                  <a href="#">अपराध </a>
                </li>
                <li>
                  <a href="#">तथ्यों की जांच</a>
                </li>
                <li>
                  <a href="#">एफवायआई</a>
                </li> */}
                <li>
                  <Link href="/category/CG-Election" onClick={hambergerChange}>
                    सीजी चुनाव
                  </Link>
                </li>
                <li>
                  <Link href="/category/MP-Election" onClick={hambergerChange}>
                    एमपी चुनाव
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/Administrative"
                    onClick={hambergerChange}
                  >
                    प्रशासनिक
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hw-social mt-4">
              <a
                href="https://www.facebook.com/inkquestmedia/"
                target="_blank"
                className="p-1 "
              >
                <FaFacebook className="text-lg m-2" />
              </a>
              <a
                href="https://twitter.com/inkquest_in"
                target="_blank"
                className="p-1 "
              >
                <FaTwitter className="text-lg m-2" />
              </a>
              <a
                href="https://youtube.com/@inkquestmedia?si=VMBhEnDY4TNjImdD"
                className="p-1 "
                target="_blank"
              >
                <FaYoutube className="text-lg m-2" />
              </a>
              <a
                href="https://www.instagram.com/inkquestmedia/"
                className="p-1 "
                target="_blank"
              >
                <FaInstagram className="text-lg m-2" />
              </a>
              {/* <a href="#" className="p-1 ">
                <GoPrimitiveDot className="text-2xl m-1 ml-1" />
              </a> */}
              {/* <a href="#" data-toggle="modal" data-target="#webStoryPopup">
                <BsClockHistory className="text-2xl m-2" />
              </a> */}
            </div>
            {/* <div className="hw-insta-media">
              <div className="section-title">
                <h5>इंस्टाग्राम</h5>
              </div>
              <div className="insta-pic">
                <img
                  src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iGyJjGmGIjBM/v1/280x210.jpg"
                  alt=""
                />
                <img
                  src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iHPtQ8p8iY1c/v1/280x210.jpg"
                  alt=""
                />
                <img
                  src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iFh5cE.0G4Ns/v0/280x210.jpg"
                  alt=""
                />
                <img
                  src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/idheyef7c3so/v0/280x210.jpg"
                  alt=""
                />
              </div>
              <div className="hw-copyright">
                कॉपीराइट © 2023 सभी अधिकार Patio Digital Pvt Ltd द्वारा सुरक्षित
              </div>
            </div> */}
          </div>

          <header className="header-section">
            <div className="nav-options" ref={navOptions}>
              <div className="container">
                <div className="nav-logo ml-20">
                  <Link href="/">
                    <Image
                      width="48"
                      height="38"
                      src="/assets/img/logo/logo-img.jpg"
                      alt="logo"
                      quality={100}
                      // className="h-[45px] w-[45px]"
                    />
                  </Link>
                </div>
                <div
                  className="sm:hidden humberger-menu humberger-open "
                  onClick={hambergerChange}
                >
                  <FontAwesomeIcon icon={faBars} className="sm:hidden" />
                </div>
                <div className="nav-search signup-switch signup-open">
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                </div>
                <div className="nav-language">
                  <a>
                    <i className="fa fa-language" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="nav-menu">
                  <ul>
                    <li className="active">
                      <Link href={"/"}>
                        <span> मुख्य पृष्ठ </span>
                      </Link>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Election">
                        <span>
                          {isHindi
                            ? categories["Election"].hindi
                            : categories["Election"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Election"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Ploitics">
                        <span>
                          {isHindi
                            ? categories["Politics"].hindi
                            : categories["Politics"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Politics"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Crime">
                        <span>
                          {isHindi
                            ? categories["Crime"].hindi
                            : categories["Crime"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Crime"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Entertainment">
                        <span>
                          {isHindi
                            ? categories["Entertainment"].hindi
                            : categories["Entertainment"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Entertainment"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Sports">
                        <span>
                          {isHindi
                            ? categories["Sports"].hindi
                            : categories["Sports"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Sports"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Administrative">
                        <span>
                          {isHindi
                            ? categories["Administrative"].hindi
                            : categories["Administrative"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Administrative"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu">
                      <Link href="/category/Technology">
                        <span>
                          {isHindi
                            ? categories["Technology"].hindi
                            : categories["Technology"].english}{" "}
                          &darr;
                        </span>
                      </Link>
                      <div className="megamenu-wrapper">
                        <div className="mw-post">
                          <NavBarNews category={"Technology"} />
                        </div>
                      </div>
                    </li>
                    <li className="mega-menu"></li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- Popup --> */}
          <div
            className="modal fade"
            id="webStoryPopup"
            data-backdrop="static"
            data-keyboard="false"
            tabIndex="-1"
            aria-labelledby="webStoryPopupLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: " #392B95" }}
                >
                  <h5 className="modal-title" id="webStoryPopupLabel">
                    वेब स्टोरीज
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="preview-container">
                    {/* <!-- Storyline --> */}
                    <div className="storyline">
                      <div className="storyline-header">
                        <h6 className="storyline-title">कथानक</h6>
                      </div>
                      <div className="storyline-slider">
                        <div className="storyline-slide">
                          <img
                            src="https://images.pexels.com/photos/2272854/pexels-photo-2272854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt=""
                            className="storyline-image"
                          />
                          <div className="storyline-text text-x-left text-y-bottom">
                            बेसिक सा मेकअप करने के लिए अपनी मेकअप लिस्‍ट में
                            रखें ये जरूरी प्रोडक्‍ट्स
                          </div>
                        </div>
                        <div className="storyline-slide">
                          <img
                            src="https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt=""
                            className="storyline-image"
                          />
                          <div className="storyline-text text-x-right text-y-top">
                            सर्वप्रथम &apos;संगीतरत्नाकर&apos; ग्रन्थ में गायन,
                            वादन और नृत्य के मेल को ही &apos;संगीत&apos; कहा गया
                            है।
                          </div>
                        </div>
                        <div className="storyline-slide">
                          <img
                            src="https://images.pexels.com/photos/1727280/pexels-photo-1727280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt=""
                            className="storyline-image"
                          />
                          <div className="storyline-text text-x-center text-y-center">
                            स्मार्ट चश्मे में नैनो टेक्नोलॉजी की मदद से लेंस की
                            छोटी सी जगह के बीच कई विशेषताएं समाहित होती हैं।
                          </div>
                        </div>
                      </div>
                      <div className="storyline-footer">
                        <img
                          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                          alt=""
                          className="storyline-image-author"
                        />
                        <span className="storyline-author">
                          लेखक सुनील वर्मा
                        </span>
                        {/* <!-- <a href="#" className="storyline-btn">अनुसरण करें</a> --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default NavbarHindi;
