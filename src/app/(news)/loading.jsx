import React from "react";
import Image from "next/image";
function Loading() {
  return (
    <div className="h-screen w-screen dark:bg-black text-white text-4xl capitalize flex justify-center items-center">
      <Image src="/loader.gif" width="600" height="600" alt="spinner" />
    </div>
  );
}

export default Loading;
