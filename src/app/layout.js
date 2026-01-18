import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AIButton from "@/components/aiButton";
import { Providers } from "./providers";

export const metadata = {
  title: "GachPala",
  description:
    "GachPala.com a online store for plants and gardening essentials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <AIButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
