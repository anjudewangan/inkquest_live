import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Footer";

import "./globals.css";
import NavbarEng from "@/components/english/NavbarEng";
import MobilePopup from "@/components/MobilePopup";
import ScrollToTop from "@/components/ScrollToTop";
import ImageModal from "@/app/(news)/ImageModal";
config.autoAddCss = false;

export const metadata = {
  title: "Inkquest Media",
  description:
    "Inkquest - रोज़ाना ताज़ा समाचार और विश्लेषण। आपकी प्रमुख स्रोत जो आपको दुनिया के सभी महत्वपूर्ण घटनाओं से अपडेट रखता है।",
  verification: {
    google: "v1sJ2p3Ij4n2ai6lQ3QsvhWUHdONRFxyMxG1-f3CfqI",
  },
  keywords:
    " Inkquest, inkquest news, news inkquest, inkquest Raipur, inkquest Chhattisgarh, Chhattisgarh News in Hindi, CG Samachar, Read latest Chhattisgarh Hindi news, CG news, Chhattisgarh local news in Hindi, Chhattisgarh breaking news & updates, Chhattisgarh news with Hindi news exclusively from Inkquest, इंकक्वेस्ट, इंकक्वेस्टन्यूज, न्यूज इंकक्वेस्ट, इंकक्वेस्ट रायपुर, इंकक्वेस्ट छत्तीसगढ़, छत्तीसगढ़ समाचार हिंदी में (सीजी समाचार) - नवीनतम छत्तीसगढ़ हिंदी समाचार (सीजी समाचार), छत्तीसगढ़ स्थानीय समाचार हिंदी में, छत्तीसगढ़ ब्रेकिंग न्यूज और अपडेट, छत्तीसगढ़ समाचार हिंदी समाचार के साथ विशेष रूप से पढ़ें इंकक्वेस्ट",
  openGraph: {
    images: [
      "https://inkquest.in/_next/image?url=%2Fassets%2Fimg%2Flogo%2Flogo-img.jpg&w=96&q=75",
    ],
    title: "Inkquest Media",
    url: "https://www.inkquest.in/",
    siteName: "Inkquest Media",
    type: "website",
    description:
      "इंकक्वेस्ट - रोज़ाना ताज़ा समाचार और विश्लेषण। आपकी प्रमुख स्रोत जो आपको दुनिया के सभी महत्वपूर्ण घटनाओं से अपडेट रखता है।",
  },
  alternates: {
    canonical: `https://inkquest.in`,
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  address: "412, Wallfort Ozone Fafadih, Raipur, C.G.",
  brand: "Inkquest Media",
  email: "contact@inkquest.in",
  founder: "Dr. Shireesh Mishra",
  legalName: "Inkquest Media",
  logo: "https://inkquest.in/_next/image?url=%2Fassets%2Fimg%2Flogo%2Flogo-img.jpg&w=96&q=75",
  description:
    "इंकक्वेस्ट - रोज़ाना ताज़ा समाचार और विश्लेषण। आपकी प्रमुख स्रोत जो आपको दुनिया के सभी महत्वपूर्ण घटनाओं से अपडेट रखता है।",
  url: "https://inkquest.in",
};
export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head></head>
      <Script
        id="Absence-banner"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8301296811032896`}
        crossOrigin="anonymous"
      />
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className="font-sf_pro " id="reading-mode">
        <NavbarEng />
        <MobilePopup />
         <ImageModal />
        <div className="mt-3 bg-white">
         {/* <div id="imageModal" className="modal bg-white">
            <div className="modal-content !bg-white">
              <span className="close-btn" id="closeModal">&times;</span>
              <img id="popupImage" alt="Popup Image" />
            </div>
          </div> */}
          {children}
        </div>
        <Footer />
        <ScrollToTop />
        <GoogleAnalytics gaId="G-SSP45738CG" />
      </body>
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://platform.twitter.com/widgets.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://www.instagram.com/embed.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://samvad.cg.nic.in/displaypanel/assets/js/pretor.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://samvad.cg.nic.in/displaypanel/assets/js/myad.js"
      />
      <Script
        strategy="afterInteractive"
        charset="utf-8"
        src="https://cdn.iframe.ly/embed.js?api_key=7d3ec49422c9a4ea14b650"
      />
    </html>
  );
}
