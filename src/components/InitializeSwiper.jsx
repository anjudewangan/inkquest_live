"use client";
import { useEffect } from "react";

function InitializeSwiper() {
  useEffect(() => {
    const swiperEl = document.querySelector("swiper-container");
    const params = {
      pagination: {
        clickable: true,
      },
      autoplay: { pauseOnMouseEnter: true },
    };
    Object.assign(swiperEl, params);

    swiperEl.initialize();
  }, []);
  return null;
}

export default InitializeSwiper;
