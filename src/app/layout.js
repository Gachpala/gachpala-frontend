import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "GachPala",
  description:
    "GachPala.com a online store for plants and gardening essentials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Link
          href="/ai"
          className={` h-fit text-[20px] rounded-full text-white fixed right-10 bottom-10 z-50 `}
        >
          <img src="/nim.gif" className="w-[80px] rounded-full " />
        </Link>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

// app/layout.js
import "./globals.css";
