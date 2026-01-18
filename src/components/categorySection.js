"use client";
import React from "react";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";

export default function CategorySection() {
  const categories = [
    { name: "Indoor", img: "/indoor.png", href: "/shop" },
    { name: "Outdoor", img: "/outdoor.png", href: "/shop" },
    { name: "Tools", img: "/tools.png", href: "/shop" },
    { name: "Gifts", img: "/gifts.png", href: "/shop" },
    { name: "Seeds", img: "/b3.gif", href: "/shop" }, // Placeholder
    { name: "Pots", img: "/flowerpot.png", href: "/shop" }, // Placeholder if exists or generic
    { name: "Fertilizer", img: "/indoor2.jpg", href: "/shop" }, // Placeholder
    { name: "Accessories", img: "/tools3.jpg", href: "/shop" }, // Placeholder
  ];

  // We'll use the first 4 if icon exist, or reuse standard images cropped to circles
  const displayCats = [
    { name: "Indoor", img: "/indoor.png" },
    { name: "Outdoor", img: "/outdoor.png" },
    { name: "Tools", img: "/tools.png" },
    { name: "Gifts", img: "/gifts.png" },
    { name: "Orchids", img: "/indoor2.jpg" },
    { name: "Cactus", img: "/indoor3.jpg" },
    { name: "Seeds", img: "/outdoor2.jpg" },
    { name: "Sale", img: "/gift3.jpg" },
  ];

  return (
    <section className="py-8 bg-white">
      <Container>
        <h2
          className={`${inter.className} text-xl font-bold text-gray-800 mb-6`}
        >
          Shop by Category
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
          {displayCats.map((cat, idx) => (
            <Link
              key={idx}
              href="/shop"
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 p-2 mb-2 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-all duration-300">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span
                className={`${openSans.className} text-sm font-medium text-gray-700 group-hover:text-green-600 text-center`}
              >
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
