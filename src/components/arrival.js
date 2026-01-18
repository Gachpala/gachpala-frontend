"use client";
import { inter, openSans, interSec } from "@/lib/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import Product from "./product";
import ProductSkeleton from "./productSkeleton";

export default function Arrival({ products }) {
  const [isLoading, setIsLoading] = useState(
    !products || products.length === 0,
  );

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <section className="  2xl:mx-0 xl:mx-24 lg:mx-18 md:mx-16 mx-6 mt-[50px] select-none ">
      <h1
        className={`${inter.className} font-normal 2xl:text-[48px] xl:text-[48px] lg:text-[48px] md:text-[38px] text-[28px] leading-12 text-black`}
      >
        Fresh arrivals
      </h1>
      <div className=" grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 2xl:grid-rows-none xl:grid-rows-none lg:grid-rows-none md:grid-rows-2 grid-rows-2 gap-6 mt-[25px] ">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </>
        ) : (
          Array.isArray(products) &&
          products.slice(0, 4).map((item) => (
            <div key={item.id}>
              <Product
                id={item.id}
                img={item.thumbnail}
                alt={item.title}
                title={item.title}
                price={`${item.price}`}
              />
            </div>
          ))
        )}
      </div>

      <Link
        href="/shop"
        className="md:hidden w-full mt-6 md:mt-8 flex justify-center items-center gap-2 bg-green-700 text-white py-3 rounded-lg font-medium active:scale-95 transition-transform text-sm"
      >
        View All Products <BsArrowRight />
      </Link>
    </section>
  );
}
