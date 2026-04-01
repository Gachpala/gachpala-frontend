"use client";
import React, { useMemo, useState, useEffect } from "react";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";
import Product from "./product";
import ProductSkeleton from "./productSkeleton";
import { IoFlash } from "react-icons/io5";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

export default function FlashSale({ products }) {
  const [isLoading, setIsLoading] = useState(
    !products || products.length === 0,
  );

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  const COUNTDOWN_END_TIME = new Date("2026-04-05 23:59:59 UTC");

  const countdownDate = useMemo(() => {
    return COUNTDOWN_END_TIME.getTime();
  }, []);

  const Completionist = () => <span>Flash Sale is over!</span>;

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
                  img={product.thumbnail}
                  alt={product.title}
                  title={product.title}
                  price={`${product.price}`}
                />
              ))
          )}
        </div>
      </Container>
    </section>
  );
}
