"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <div
      className="fixed top-12 left-2 bg-violet-700 opacity-70 p-2 rounded-full"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft className="h-7 w-7" />
    </div>
  );
}

export default BackButton;
