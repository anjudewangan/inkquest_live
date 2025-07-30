"use client";
import { InstagramEmbed } from "react-social-media-embed";

function Instagram() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed
        url="https://www.instagram.com/reel/Cw-oEFFRVd1/?utm_source=ig_embed&amp;utm_campaign=loading"
        width={328}
      />
    </div>
  );
}

export default Instagram;
