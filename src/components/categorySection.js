"use client";
import React, { useEffect, useState } from "react";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";
import { useMemo } from "react";

const API_BASE = "https://api.gachpala.com";
const PLACEHOLDER = "/plant-placeholder.png";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok)
          throw new Error(`Failed to load categories: ${res.status}`);
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Category fetch error", err);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const skeletons = useMemo(() => Array.from({ length: 12 }), []);

  const resolveImage = (img) => {
    if (!img) return PLACEHOLDER;
    if (img.startsWith("http")) return img;
    return `${API_BASE}${img}`;
  };

  return (
    <section className="py-8 bg-white">
      <Container>
        <h2
          className={`${inter.className} text-xl font-bold text-gray-800 mb-6`}
        >
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {(isLoading ? skeletons : categories).map((cat, idx) => {
            if (isLoading) {
              return (
                <div
                  key={`skeleton-${idx}`}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 animate-pulse mb-2" />
                  <div className="h-3 w-16 rounded-full bg-gray-100 animate-pulse" />
                </div>
              );
            }

            const name = cat.name || "Category";
            const imgSrc = resolveImage(cat.category_image);
            const query = encodeURIComponent(name);

            return (
              <Link
                key={cat.id ?? idx}
                href={`/shop?category=${query}`}
                className="flex flex-col items-center group cursor-none"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 p-2 mb-2 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-all duration-300">
                  <img
                    src={imgSrc}
                    alt={name}
                    className="w-full h-full object-contain rounded-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span
                  className={`${openSans.className} text-sm font-medium text-gray-700 group-hover:text-green-600 text-center`}
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
