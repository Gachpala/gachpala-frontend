"use client";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Product from "./product";
import ProductSkeleton from "./productSkeleton";

export default function BestCollection({ products }) {
  const isLoading = !products || products.length === 0;
  const allProducts = Array.isArray(products) ? products : [];
  const featuredProducts = allProducts.filter((item) => item?.is_featured);
  const fallbackProducts = allProducts.filter((item) => !item?.is_featured);
  const collectionProducts = [...featuredProducts, ...fallbackProducts].slice(
    0,
    4,
  );

  return (
    <section className="relative w-full py-8 md:py-10 select-none overflow-hidden">
      <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-teal-200/30 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 top-2 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative z-10 rounded-3xl border border-[#123126]/10 bg-[linear-gradient(140deg,#183127_0%,#254536_55%,#2f5a45_100%)] p-4 shadow-[0_26px_56px_-40px_rgba(17,42,28,0.55)] md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`${openSans.className} text-[11px] uppercase tracking-[0.2em] text-emerald-200/90`}
            >
              Curated Selection
            </p>
            <h2
              className={`${inter.className} mt-2 text-[30px] leading-tight text-white md:text-[42px]`}
            >
              Best Collections
            </h2>
            <p
              className={`${openSans.className} mt-2 max-w-2xl text-sm text-emerald-100/85 md:text-base`}
            >
              Handpicked plants from our top-rated and featured collection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-100/25 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              Featured First
            </span>
            <span className="rounded-full border border-emerald-100/25 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              Trusted Picks
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
            collectionProducts.map((item) => (
              <div key={item.id}>
                <Product
                  title={item.name}
                  id={item.id}
                  img={
                    item.image_url === null ? item.thumbnail : item.image_url
                  }
                  alt={item.title}
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
          className="hidden md:inline-flex mt-7 items-center gap-2 rounded-xl border border-emerald-100/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
        >
          Shop Best Collection <BsArrowRight />
        </Link>
      </div>

      <Link
        href="/shop"
        className="md:hidden w-full mt-6 flex justify-center items-center gap-2 bg-[#1f2f25] text-white py-3 rounded-xl font-semibold active:scale-95 transition-transform text-sm"
      >
        Shop Best Collection <BsArrowRight />
      </Link>
    </section>
  );
}
