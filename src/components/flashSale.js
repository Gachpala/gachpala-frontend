"use client";
import React, { useMemo } from "react";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";
import Product from "./product";
import ProductSkeleton from "./productSkeleton";
import { IoFlash } from "react-icons/io5";
import Countdown from "react-countdown";

// Flash sale runs for 24h from when the module first loads unless an explicit
// end time is passed. Computed at module scope (not during render) to stay pure.
const DEFAULT_END_TIME = Date.now() + 24 * 60 * 60 * 1000;

function Completionist() {
  return <span>Flash Sale is over!</span>;
}

export default function FlashSale({ products, isLoading = false, endTime }) {
  const countdownDate = useMemo(() => {
    return endTime ? new Date(endTime).getTime() : DEFAULT_END_TIME;
  }, [endTime]);

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
            <div className="hidden md:flex items-center gap-2 text-gray-500 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-md select-none ">
              <Countdown
                date={countdownDate}
                className=" text-lg text-orange-600 "
              >
                <Completionist />
              </Countdown>
            </div>
          </div>

          <Link
            href="/shop"
            className={`${openSans.className} text-orange-500 border border-orange-500 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-500 hover:text-white transition-colors`}
          >
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </>
          ) : (
            Array.isArray(products) &&
            products
              .slice(0, 4)
              .map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  img={product.image_url || product.thumbnail || product.image}
                  alt={product.name || product.title || "Product"}
                  title={product.name || product.title || "Product"}
                  price={`${product.price ?? 0}`}
                />
              ))
          )}
        </div>
      </Container>
    </section>
  );
}
