"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./LoadNews.css";
import htmlReactParser from "html-react-parser";
function LoadNews({ news, ads }) {
  const [load, setLoad] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [parsedHTML, setParsedHTML] = useState("");
  const camelCase = (str) =>
    str.includes("-")
      ? str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
      : str;

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
    if (window?.instgrm?.Embeds?.process) {
      setTimeout(() => {
        window.instgrm.Embeds.process();
      }, 700);
    }
  }, []);
  useEffect(() => {
    setIsClient(true);
    function insertDivBetweenParagraphs(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const paragraphs = doc.querySelectorAll("p");
      for (let i = 0; i < paragraphs.length - 1; i++) {
        const advert = ads[i];
        if (advert) {
          const div = document.createElement("div");
          // div.innerHTML = `<div class="relative">
          // <div class="absolute w-full flex mt-1 px-3"></div>
          // <img src='${advert.imageUrl}' width="500" height="600" >
          // </div>`;
          div.innerHTML = `<h1><img src="${advert.imageUrl}" alt="Girl in a jacket" width="300" height="300"></h1>`;
          div.classList.add("flex", "flex-col", "p-2", "items-center");
          paragraphs[i].parentNode.insertBefore(div, paragraphs[i].nextSibling);
        }
      }

      return doc.documentElement.outerHTML;
    }
    function parseAndRenderHTML(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const elements = doc.body.childNodes;
      const renderedElements = [];

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const type = element.nodeType;

        if (type === Node.ELEMENT_NODE) {
          const attributes = { key: i };
          for (let j = 0; j < element.attributes.length; j++) {
            const attribute = element.attributes[j];
            if (attribute.name === "style") {
              const styleObject = parseStyleAttribute(attribute.value);
              attributes.style = styleObject;
            } else if (attribute.name === "class") {
              attributes["className"] = attribute.value;
            } else if (attribute.name === "stroke-width") {
              attributes["strokeWidth"] = attribute.value;
            } else if (attribute.name === "fill-rule") {
              attributes["fillRule"] = attribute.value;
            } else if (attribute.name === "xmlns:xlink") {
              attributes["xmlnsXlink"] = attribute.value;
            } else {
              attributes[attribute.name] = attribute.value;
            }
          }

          const children = parseAndRenderHTML(element.innerHTML);
          renderedElements.push(
            React.createElement(
              element.tagName.toLowerCase(),
              attributes,
              ["img", "br"].includes(element.tagName.toLowerCase())
                ? null
                : children
            )
          );
        } else if (type === Node.TEXT_NODE) {
          renderedElements.push(element.textContent);
        }
      }
      return renderedElements;
    }
    function parseStyleAttribute(styleString) {
      const styleObject = {};
      const styleRules = styleString.split(";");

      for (let i = 0; i < styleRules.length; i++) {
        const rule = styleRules[i].trim();
        if (rule !== "") {
          const [property, value] = rule.split(":");
          styleObject[camelCase(property)] = value;
        }
      }

      return styleObject;
    }
    let renderHTML = "";

    renderHTML = insertDivBetweenParagraphs(
      JSON.parse(news).replaceAll(
        /PDF@(https:\/\/[^\s<]+)/gm,
        (match, url) =>
          `<iframe src="https://docs.google.com/viewer?url=${url}f&embedded=true" class="pdf-view" style=""></iframe>`
      )
    );
    setParsedHTML(parseAndRenderHTML(renderHTML));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const paragraphs = document.querySelectorAll("#news-text p");
      for (let i = 0; i < paragraphs.length - 1; i++) {
        const advert = ads[i];
        if (advert) {
          const div = document.createElement("div");

          div.innerHTML = `<h1><img src="${advert.imageUrl}" alt="Girl in a jacket" width="300" height="300"></h1>`;
          div.classList.add("flex", "flex-col", "p-2", "items-center");
          paragraphs[i].parentNode.insertBefore(div, paragraphs[i].nextSibling);
        }
      }
      console.log("news element", paragraphs);
      document.querySelectorAll("oembed[url]").forEach((element) => {
        iframely.load(element, element.attributes.url.value);
      });
      window.instgrm.Embeds.process();
    }, 500);
  }, []);
  function insertDivBetweenParagraphs(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const paragraphs = doc.querySelectorAll("p");
    for (let i = 0; i < paragraphs.length - 1; i++) {
      const advert = ads[i];
      if (advert) {
        const div = document.createElement("div");
        // div.innerHTML = `<div class="relative">
        // <div class="absolute w-full flex mt-1 px-3"></div>
        // <img src='${advert.imageUrl}' width="500" height="600" >
        // </div>`;
        div.innerHTML = `<h1><img src="${advert.imageUrl}" alt="Girl in a jacket" width="300" height="300"></h1>`;
        div.classList.add("flex", "flex-col", "p-2", "items-center");
        paragraphs[i].parentNode.insertBefore(div, paragraphs[i].nextSibling);
      }
    }

    return doc.documentElement.outerHTML;
  }
  function parseAndRenderHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const elements = doc.body.childNodes;
    const renderedElements = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const type = element.nodeType;

      if (type === Node.ELEMENT_NODE) {
        const attributes = {};
        for (let j = 0; j < element.attributes.length; j++) {
          const attribute = element.attributes[j];
          if (attribute.name === "style") {
            const styleObject = parseStyleAttribute(attribute.value);
            attributes.style = styleObject;
          } else {
            attributes[attribute.name] = attribute.value;
          }
        }

        const children = parseAndRenderHTML(element.innerHTML);
        renderedElements.push(
          React.createElement(element.tagName, attributes, children)
        );
      } else if (type === Node.TEXT_NODE) {
        renderedElements.push(element.textContent);
      }
    }

    return renderedElements;
  }
  function parseStyleAttribute(styleString) {
    const styleObject = {};
    const styleRules = styleString.split(";");

    for (let i = 0; i < styleRules.length; i++) {
      const rule = styleRules[i].trim();
      if (rule !== "") {
        const [property, value] = rule.split(":");
        styleObject[property] = value;
      }
    }

    return styleObject;
  }
  let renderHTML = "";
  // let parsedHTML;
  // renderHTML = insertDivBetweenParagraphs(
  //   JSON.parse(news).replaceAll(
  //     /PDF@(https:\/\/[^\s<]+)/gm,
  //     (match, url) =>
  //       `<iframe src="https://docs.google.com/viewer?url=${url}f&embedded=true" class="pdf-view" style=""></iframe>`
  //   )
  // );

  // parsedHTML = parseAndRenderHTML(renderHTML);

  return (
    <>
      {isClient ? (
        <div
          className="flex news-content flex-col gap-y-2"
          id="news-text"
          dangerouslySetInnerHTML={{
            __html: JSON.parse(news).replaceAll(
              /PDF@(https:\/\/[^\s<]+)/gm,
              (match, url) =>
                `<iframe src="https://docs.google.com/viewer?url=${url}f&embedded=true" class="pdf-view" style=""></iframe>`
            ),
          }}
        >
          {/* {isClient && parsedHTML} */}
        </div>
      ) : null}
    </>
  );
}

export default LoadNews;
