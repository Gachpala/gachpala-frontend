"use client";
import React from "react";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";
import { useSelector } from "react-redux";

export default function CategorySection() {
  let categoryData = useSelector((state) => state.products.product);

  const displayCats = [
    { name: "Indoor", img: "/indoor.png", category: "beauty" },
    { name: "Outdoor", img: "/outdoor.png", category: "groceries" },
    { name: "Tools", img: "/tools.png", category: "furniture" },
    { name: "Gifts", img: "/gifts.png", category: "fragrances" },
    { name: "Orchids", img: "/indoor2.jpg", category: "orchids" },
    { name: "Cactus", img: "/indoor3.jpg", category: "cactus" },
    { name: "Seeds", img: "/outdoor2.jpg", category: "seeds" },
    { name: "Sale", img: "/gift3.jpg", category: "sale" },
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
              href={`/shop?category=${cat.category}`}
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
                {cat.category}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
