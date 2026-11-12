"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { STATIC_PRODUCTS } from "@/data/staticProducts";

export default function Favourite() {
  const reduxFavorites = useSelector((state) => state.products.favorites);
  const isLoading = false;

  const wishlistItems = useMemo(() => {
    if (Array.isArray(reduxFavorites) && reduxFavorites.length > 0) {
      return reduxFavorites;
    }
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("favorites");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch {}
    return [STATIC_PRODUCTS[0], STATIC_PRODUCTS[1]];
  }, [reduxFavorites]);

  return (
    <section className="pb-16 bg-[radial-gradient(circle_at_8%_15%,#e4f4e8_0%,#f5faf3_35%,#f8fbf6_100%)]">
      <div className="relative overflow-hidden px-4 sm:px-6 md:px-10 py-10 md:py-14 mb-10 md:mb-14 bg-[linear-gradient(130deg,#e8f2e7_0%,#f4f9f1_52%,#f8fbf5_100%)]">
        <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/35 blur-3xl" />

        <Container>
          <div className="relative z-10">
            <p
              className={`${openSans.className} text-[11px] uppercase tracking-[0.2em] text-[#357f55]`}
            >
              Your Personalized Space
            </p>
            <h1
              className={`${inter.className} mt-2 text-3xl leading-tight text-[#15261d] md:text-5xl`}
            >
              Wishlist
            </h1>
            <p
              className={`${openSans.className} mt-3 text-sm text-[#55665d] md:text-base`}
            >
              Save your favorite plants and come back anytime to shop them.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link
                href="/"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#4f6358] hover:border-[#00be62]"
              >
                Home
              </Link>
              <span className="text-xs text-[#73837a]">/</span>
              <span className="rounded-full border border-[#00be62] bg-[#e8f7ef] px-3 py-1.5 text-xs font-semibold text-[#1f7a4d]">
                Wishlist
              </span>
              <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#4f6358]">
                {wishlistItems.length} saved
              </span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="max-w-[1400px]! rounded-3xl border border-emerald-200/70 bg-white/70 p-3 shadow-[0_26px_60px_-46px_rgba(17,42,28,0.4)] backdrop-blur-sm sm:p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <p
            className={`${openSans.className} text-xs uppercase tracking-[0.15em] text-[#597066]`}
          >
            Saved Green Picks
          </p>
          <Link
            href="/shop"
            className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#356f50] hover:border-[#00be62]"
          >
            Continue Shopping
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {wishlistItems.map((product) => (
              <Product
                key={product.product_id || product.id}
                id={product.product_id || product.id}
                img={
                  product.product_image ||
                  product.image ||
                  product.thumbnail ||
                  product.image_url
                }
                alt={product.product_name || product.name || "Wishlist product"}
                title={product.product_name || product.title || product.name}
                price={`${product.unit_price || product.price || 0}`}
                description={product.description || ""}
                category_name={product.category_name || "Indoor Plants"}
                stock={
                  product.stock ??
                  product.product_stock ??
                  product.quantity ??
                  product?.product?.stock ??
                  15
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 mb-8 rounded-2xl border border-emerald-100 bg-[#f8fbf7]">
            <p
              className={`${inter.className} text-2xl font-bold text-gray-800 mb-4`}
            >
              No Favourites Yet
            </p>
            <p className={`${openSans.className} text-gray-600 mb-8`}>
              Explore our fresh collection and save items you love!
            </p>
            <Link
              href="/shop"
              className="bg-[#00be62] text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
