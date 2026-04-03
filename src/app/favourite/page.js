"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY } from "@/lib/authGate";

export default function Favourite() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistError, setWishlistError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setWishlistItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setWishlistError("");

        const response = await fetch(`${API_BASE_URL}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();
        let data = [];

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = [];
          }
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              `Failed to load wishlist (${response.status})`,
          );
        }

        const rows = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.products)
              ? data.products
              : [];

        setWishlistItems(rows);
      } catch (error) {
        setWishlistError(error?.message || "Unable to load wishlist.");
        setWishlistItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

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

        {wishlistError ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {wishlistError}
          </div>
        ) : null}

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
                  product.product_image || product.image || product.thumbnail
                }
                alt={product.product_name || product.name || "Wishlist product"}
                title={product.product_name || product.name}
                price={`${product.unit_price || product.price || 0}`}
                stock={
                  product.stock ??
                  product.product_stock ??
                  product.quantity ??
                  product?.product?.stock
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
            <p
              className={`${openSans.className} text-gray-600 text-center max-w-md px-4`}
            >
              Start adding your favourite plants to this collection. They will
              appear here for easy access.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-xl bg-[#00be62] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00a757] transition"
            >
              Explore Shop
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
