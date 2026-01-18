"use client";
import React from "react";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";
import Product from "./product";
import { IoFlash } from "react-icons/io5";

export default function FlashSale({ products }) {
  console.log(products);

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2
              className={`${inter.className} text-2xl font-bold text-orange-500 flex items-center gap-2`}
            >
              Flash Sale <IoFlash className="animate-pulse" />
            </h2>
            <div className="hidden md:flex items-center gap-2 text-gray-500 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-md">
              <span>Ending in</span>
              <span className="bg-orange-500 text-white px-1 rounded">12</span>:
              <span className="bg-orange-500 text-white px-1 rounded">45</span>:
              <span className="bg-orange-500 text-white px-1 rounded">22</span>
            </div>
          </div>

          <Link
            href="/shop"
            className={`${openSans.className} text-orange-500 border border-orange-500 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-500 hover:text-white transition-colors`}
          >
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.isArray(products) &&
            products
              .slice(0, 5)
              .map((product) => (
                <Product
                  key={product.id}
                  img={product.thumbnail}
                  alt={product.title}
                  title={product.title}
                  price={`${product.price}`}
                />
              ))}
        </div>
      </Container>
    </section>
  );
}
