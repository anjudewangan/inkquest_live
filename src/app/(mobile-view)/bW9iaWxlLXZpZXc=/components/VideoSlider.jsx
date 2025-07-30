"use client";
import { useState, useEffect } from "react";

function VideoSlider() {
  const [shorts, setShorts] = useState();
  useEffect(() => {
    fetch("api/shorts?limit=10")
      .then((res) => res.json())
      .then((data) => setShorts(data));
  }, []);
  if (!shorts || shorts.data.length === 0) {
    return null;
  }
  return (
    <div className="text-white h-full no-scrollbar ">
      <h1 className="text-2xl font-bold mb-3">Youtube Trending</h1>
      <ul className="grid grid-rows-1 grid-flow-col gap-3 h-full overflow-x-scroll no-scrollbar  ">
        {shorts.data.map((value) => (
          <li className="relative w-[240px] py-1" key={value.id}>
            <iframe
              width="220"
              height="450"
              src={`https://youtube.com/embed/${value.ShortUrl}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoSlider;
