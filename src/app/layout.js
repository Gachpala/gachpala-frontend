import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AIButton from "@/components/aiButton";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://gachpala.com"),
  title: {
    default: "GachPala",
    template: "%s | GachPala",
  },
  description:
    "GachPala.com a online store for plants and gardening essentials.",
  applicationName: "GachPala",
  openGraph: {
    title: "GachPala",
    description:
      "GachPala.com a online store for plants and gardening essentials.",
    type: "website",
    url: "https://gachpala.com",
    siteName: "GachPala",
  },
  twitter: {
    card: "summary_large_image",
    title: "GachPala",
    description:
      "GachPala.com a online store for plants and gardening essentials.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0f5132]"
        >
          Skip to content
        </a>
        <Providers>
          <NavBar />
          <main id="main-content">{children}</main>
          <AIButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
