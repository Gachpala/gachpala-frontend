"use client";
import { inter, openSans } from "@/lib/fonts";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Product from "./product";

export default function Arrival() {
  return (
    <section className="py-8 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 gap-2 md:gap-4 px-2 md:px-0">
        <div className="text-center md:text-left">
            <h1
            className={`${inter.className} text-2xl md:text-5xl font-medium text-gray-900 mb-1 md:mb-2`}
            >
            Fresh Arrivals
            </h1>
            <p className={`${openSans.className} text-sm md:text-base text-gray-500`}>Find your perfect plant companion</p>
        </div>
        
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-medium group border-b-2 border-transparent hover:border-green-700 pb-0.5">
          View All Products <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {[1, 2, 3, 4].map((_, i) => (
          <Product key={i} />
        ))}
      </div>

      <Link href="/shop" className="md:hidden w-full mt-6 md:mt-8 flex justify-center items-center gap-2 bg-green-700 text-white py-3 rounded-lg font-medium active:scale-95 transition-transform text-sm">
        View All Products <BsArrowRight />
      </Link>
    </section>
  );
}
