"use client";
import { inter, openSans } from "@/lib/fonts";
import Container from "./container";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "AI Assistant", href: "/ai" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Profile", href: "/profile" },
      { label: "Favorites", href: "/favourite" },
      { label: "Cart", href: "/cart" },
      { label: "Sign In", href: "/signInUp" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  const hideOn = ["/ai"];

  if (hideOn.includes(pathname)) {
    return null;
  }

  return (
    <footer className="mt-12 border-t border-[#d7ddd2] bg-[#ebeee3] select-none">
      <section className="2xl:px-0 xl:px-12 lg:px-8 md:px-8 mx-4">
        <Container className="py-14 md:py-18">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="md:col-span-2 lg:col-span-2">
              <img src="/logo.png" className="w-32 md:w-36" alt="GachPala" />
              <p
                className={`${openSans.className} mt-5 max-w-[440px] text-sm leading-7 text-[#516057] md:text-[15px]`}
              >
                GachPala curates healthy plants and thoughtful green essentials
                for modern homes, helping every space feel calm, fresh, and
                alive.
              </p>
              <Link
                href="/shop"
                className={`${inter.className} mt-6 inline-flex rounded-xl bg-[#1d6b43] px-5 py-3 text-xs tracking-[0.12em] text-white transition hover:bg-[#165335]`}
              >
                SHOP COLLECTION
              </Link>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3
                  className={`${inter.className} text-base font-bold uppercase tracking-[0.08em] text-[#1f2b23]`}
                >
                  {column.title}
                </h3>
                <div className="mt-4 flex flex-col items-start gap-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`${openSans.className} text-sm text-[#5c6b62] transition hover:text-[#1d6b43]`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[#d5dccc] pt-6 text-xs text-[#66756b] md:flex-row md:items-center md:justify-between md:text-sm">
            <p className={openSans.className}>
              © 2026 GachPala. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/contact" className="transition hover:text-[#1d6b43]">
                Contact
              </Link>
              <Link href="/about" className="transition hover:text-[#1d6b43]">
                About
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}
