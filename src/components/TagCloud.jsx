"use client";

import { TagCloud } from "react-tagcloud";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import "./TagCloud.css";

const customRenderer = (tag, size, color) => (
  <Link
    href={`/tags/${tag.value.trim().replace(/\s+/g, "%20")}`}
    key={tag.value}
    className="tag-cloud-hover"
    style={{
      fontSize: `${size / 3.7}em`,
      margin: "3px",
      padding: "3px",
      transform: "",
      display: "inline-block",
    }}
  >
    {tag.value.toUpperCase()}
  </Link>
);

function CustomTagCloud() {
  const [tagsData, setTagsData] = useState();
  useEffect(() => {
    fetch(`/api/tags/trending?limit=10`)
      .then((res) => res.json())
      .then((data) => setTagsData(data));
  }, []);
  const router = useRouter();
  if (!tagsData) {
    return null;
  }
  return (
    <TagCloud
      minSize={2}
      maxSize={6}
      tags={tagsData}
      renderer={customRenderer}
    />
  );
}

export default CustomTagCloud;
