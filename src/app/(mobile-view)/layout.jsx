import Navbar from "./components/Navbar";
import Script from "next/script";
import "./global.css";
export const metadata = {
  title: "Mobile View",
  description: "This is mobile view for inkquest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className="dark:bg-black dark:text-white" id="reading-mode">
        <Navbar />
        <div className="">{children}</div>
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
        charset="utf-8"
        src="https://cdn.iframe.ly/embed.js?api_key=7d3ec49422c9a4ea14b650"
      />
    </html>
  );
}
