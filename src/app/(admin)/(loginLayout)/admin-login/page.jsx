"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

function Page() {
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    if (loginId === "admin" && password === "admin") {
      router.push("/admin");
    } else {
      setError("Incorrect user name or password");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center ">
      <Card className="border-2 border-[#382f92] shadow-lg">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex justify-between items-center">
              <label htmlFor="userId" className="px-1 font-semibold">
                Login Id
              </label>
              <input
                type="text"
                name="userId"
                id="userId"
                onChange={(e) => setLoginId(e.target.value)}
                className="outline-none ml-4 border border-[#382f92] bg-slate-100 px-2 py-1"
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="px-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none ml-4 border border-[#382f92] bg-slate-100 px-2 py-1"
              />
            </div>

            <div className={` text-red-600 font-semibold`}>{error}</div>
            <div className="ml-auto">
              <button className="bg-[#372f92e5] px-2 py-1 text-white ">
                Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
