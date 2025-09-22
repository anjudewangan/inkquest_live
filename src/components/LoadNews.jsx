// "use client";
// import { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import "./LoadNews.css";
// import AdsSlider from "@/app/(news)/news/[title]/components/AdsSlider";
// function LoadNews({ ads }) {
//   useEffect(() => {
//     if (window.twttr) {
//       window.twttr.widgets.load();
//     }
//     if (window?.instgrm?.Embeds?.process) {
//       setTimeout(() => {
//         window?.instgrm?.Embeds?.process();
//       }, 700);
//     }
//   }, []);

//   const isDirectVideoUrl = (url) => {
//     return /\.(mp4|webm|ogg)$/.test(url);
//   };
//   const isYouTubeUrl = (url) => {
//     return url.includes("youtube.com") || url.includes("youtu.be");
//   };

//   const fetchYouTubeEmbed = async (url) => {
//     const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
//       url
//     )}&format=json`;

//     try {
//       const response = await fetch(oEmbedUrl);
//       const data = await response.json();
//       const pattern = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
//       const match = data.html.match(pattern);
//       // Extract the video ID
//       if (match) {
//         const videoId = match[1];
//         return videoId;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching YouTube oEmbed data:", error);
//     }
//   };

//   const createElementFromHTML = (htmlString) => {
//     const tempDiv = document.createElement("div"); // Temporary container
//     tempDiv.innerHTML = htmlString.trim(); // Set HTML and trim whitespace
//     return tempDiv.firstChild; // Return the first child element
//   };
//   useEffect(() => {
//     const paragraphs = document.querySelectorAll("#news-text p");
//     for (let i = 0; i < paragraphs.length - 2; i++) {
//       const advert = ads[i];
//       if (i % 2 === 0) {
//         const div = document.createElement("div");

//         // render react to dom
//         const node = ReactDOM.createRoot(div);
//         node.render(<AdsSlider images={ads} />);
//         // div.innerHTML = `<h1><img src="${advert.imageUrl}" alt="Girl in a jacket" width="300" height="300"></h1>`;
//         div.classList.add("flex", "flex-col", "p-2", "items-center");
//         paragraphs[i].parentNode.insertBefore(div, paragraphs[i].nextSibling);
//       }
//     }
//     console.log("news element", paragraphs);
//     document.querySelectorAll("oembed[url]").forEach(async (oembedElement) => {
//       const videoUrl = oembedElement.getAttribute("url");
//       if (isDirectVideoUrl(videoUrl)) {
//         const videoElement = document.createElement("video");
//         videoElement.setAttribute("controls", true);
//         videoElement.setAttribute("width", "100%");
//         videoElement.setAttribute("src", videoUrl);
//         oembedElement.replaceWith(videoElement);
//       }
//       if (isYouTubeUrl(videoUrl)) {
//         const markup = await fetchYouTubeEmbed(videoUrl);
//         if (markup) {
//           oembedElement.innerHTML = `<iframe id="${markup}" width="100%"></iframe>`;
//           document.getElementById(
//             markup
//           ).src = `https://www.youtube.com/embed/${markup}?feature=oembed`;
//           const iframe = document.getElementById(markup);
//           iframe.style.height = "55vh";
//         }
//       }
//     });
//     window?.instgrm?.Embeds?.process();
//   }, []);
//   return <></>;
// }

// export default LoadNews;


"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./LoadNews.css";
import AdsSlider from "@/app/(news)/news/[title]/components/AdsSlider";

function LoadNews({ ads }) {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
    if (window?.instgrm?.Embeds?.process) {
      setTimeout(() => {
        window?.instgrm?.Embeds?.process();
      }, 700);
    }
  }, []);

  const isDirectVideoUrl = (url) => {
    return /\.(mp4|webm|ogg)$/.test(url);
  };

  const isYouTubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const fetchYouTubeEmbed = async (url) => {
    const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      url
    )}&format=json`;

    try {
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      const pattern = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
      const match = data.html.match(pattern);
      if (match) {
        return match[1];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching YouTube oEmbed data:", error);
    }
  };

  const createElementFromHTML = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString.trim();
    return tempDiv.firstChild;
  };

  useEffect(() => {
    const paragraphs = document.querySelectorAll("#news-text p");

    if (paragraphs.length > 0 && ads.length > 0) {
      const firstParagraph = paragraphs[0];
      const div = document.createElement("div");

      ReactDOM.createRoot(div).render(<AdsSlider images={ads} />);

      div.classList.add("flex", "flex-col", "p-2", "items-center");

      firstParagraph.parentNode.insertBefore(div, firstParagraph.nextSibling);
    }

    console.log("news element", paragraphs);

    document.querySelectorAll("oembed[url]").forEach(async (oembedElement) => {
      const videoUrl = oembedElement.getAttribute("url");

      if (isDirectVideoUrl(videoUrl)) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("controls", true);
        videoElement.setAttribute("width", "100%");
        videoElement.setAttribute("src", videoUrl);
        oembedElement.replaceWith(videoElement);
      }

      if (isYouTubeUrl(videoUrl)) {
        const markup = await fetchYouTubeEmbed(videoUrl);
        if (markup) {
          oembedElement.innerHTML = `<iframe id="${markup}" width="100%"></iframe>`;
          document.getElementById(
            markup
          ).src = `https://www.youtube.com/embed/${markup}?feature=oembed`;
          const iframe = document.getElementById(markup);
          iframe.style.height = "55vh";
        }
      }
    });

    window?.instgrm?.Embeds?.process();
  }, []);

  return <></>;
}

export default LoadNews;
