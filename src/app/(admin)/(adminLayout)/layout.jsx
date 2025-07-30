import { Inter } from "next/font/google";
import "@/app/(news)/globals.css";

export const metadata = {
  title: "Inkquest | Admin Login",
  description: "Admin Login",
};
const inter = Inter({ subsets: ["latin"] });
function layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default layout;
