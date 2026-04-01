"use client";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import Product from "./product";
import ProductSkeleton from "./productSkeleton";

export default function BestCollection({ products }) {
  const [isLoading, setIsLoading] = useState(
    !products || products.length === 0,
  );

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <section className=" py-15 select-none ">
      <h1
        className={`${inter.className} font-normal 2xl:text-[48px] xl:text-[48px] lg:text-[48px] md:text-[38px] text-[28px] leading-[1.2] text-black`}
      >
        Best Collections
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-[25px]">
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
                title={item.name}
                id={item.id}
                img={item.image_url === null ? item.thumbnail : item.image_url}
                alt={item.title}
                price={`${item.price}`}
                description={item.description}
                stock={item.stock}
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
