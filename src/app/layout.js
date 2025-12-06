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
        <AIButton />
        <Footer />
      </body>
    </html>
  );
}

// app/layout.js
import "./globals.css";
import AIButton from "@/components/aiButton";
