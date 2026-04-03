"use client";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Product from "./product";
import ProductSkeleton from "./productSkeleton";

export default function Arrival({ products }) {
  const isLoading = !products || products.length === 0;
  const arrivalProducts = Array.isArray(products)
    ? [...products]
        .sort((a, b) => {
          const aTime = new Date(a?.created_at || 0).getTime() || 0;
          const bTime = new Date(b?.created_at || 0).getTime() || 0;
          return bTime - aTime;
        })
        .slice(0, 4)
    : [];

  return (
    <section className="relative w-full py-8 md:py-10 select-none overflow-hidden">
      <div className="pointer-events-none absolute -left-16 -top-8 h-36 w-36 rounded-full bg-emerald-300/25 blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-44 w-44 rounded-full bg-lime-200/35 blur-2xl" />

      <div className="relative z-10 rounded-3xl border border-emerald-200/80 bg-[linear-gradient(140deg,#f9fff6_0%,#eff8eb_45%,#f6fbf3_100%)] p-4 shadow-[0_20px_45px_-35px_rgba(17,42,28,0.35)] md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`${openSans.className} text-[11px] uppercase tracking-[0.2em] text-[#2f7f54]`}
            >
              New In Store
            </p>
            <h2
              className={`${inter.className} mt-2 text-[30px] leading-tight text-[#15261d] md:text-[42px]`}
            >
              Fresh Arrivals
            </h2>
            <p
              className={`${openSans.className} mt-2 max-w-2xl text-sm text-[#5a6b62] md:text-base`}
            >
              Newly listed plants chosen for healthy growth and easy care.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-[#2f7f54]">
              Latest Picks
            </span>
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-[#496257]">
              Fast Delivery
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </>
          ) : (
            arrivalProducts.map((item) => (
              <div key={item.id}>
                <Product
                  id={item.id}
                  img={
                    item.image_url === null ? item.thumbnail : item.image_url
                  }
                  alt={item.name}
                  title={item.name}
                  price={`${item.price}`}
                  description={item.description}
                  stock={item.stock}
                  category_id={item.category_id}
                  category_name={item.category_name}
                  is_featured={item.is_featured}
                  created_at={item.created_at}
                  status={item.status}
                  weight={item.weight}
                  dimensions={item.dimensions}
                />
              </div>
            ))
          )}
        </div>

        <Link
          href="/shop"
          className="hidden md:inline-flex mt-7 items-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#2f7f54] hover:bg-emerald-50 transition"
        >
          Explore All Arrivals <BsArrowRight />
        </Link>
      </div>

      <Link
        href="/shop"
        className="md:hidden w-full mt-6 flex justify-center items-center gap-2 bg-[#1f2f25] text-white py-3 rounded-xl font-semibold active:scale-95 transition-transform text-sm"
      >
        Explore All Arrivals <BsArrowRight />
      </Link>
    </section>
  );
}
