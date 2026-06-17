"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import HeroSection from "@/components/heroSection";
import AutoPlayText from "@/components/autoPlayText";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productReducer } from "@/app/slices/products_slices";
import { API_BASE_URL } from "@/app/config";
import { inter } from "@/lib/fonts";

export default function Landing() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${API_BASE_URL}/products`);
        const body = data.data;
        const rows = Array.isArray(body)
          ? body
          : Array.isArray(body?.products)
            ? body.products
            : [];

        if (isCancelled) return;

        setAllProducts(rows);
        dispatch(productReducer(rows));
      } catch (error) {
        if (isCancelled) return;
        console.error("Error fetching products:", error);
        setAllProducts([]);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const freshArrivals = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => {
        const aTime = new Date(a?.created_at || 0).getTime() || 0;
        const bTime = new Date(b?.created_at || 0).getTime() || 0;
        return bTime - aTime;
      })
      .slice(0, 8);
  }, [allProducts]);

  const bestCollections = useMemo(() => {
    const featured = allProducts.filter((item) => item?.is_featured);
    const regular = allProducts.filter((item) => !item?.is_featured);
    return [...featured, ...regular].slice(0, 8);
  }, [allProducts]);

  const topCategories = useMemo(() => {
    const categoryMap = new Map();

    allProducts.forEach((item) => {
      const name = item?.category_name?.trim();
      if (!name) return;
      categoryMap.set(name, (categoryMap.get(name) || 0) + 1);
    });

    return [...categoryMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_15%,#e4f4e8_0%,#f5faf3_35%,#f8fbf6_100%)]">
      <HeroSection />

      <section className="pb-8 md:pb-10">
        <Container>
          <div className="rounded-3xl border border-emerald-200/70 bg-white/70 p-5 backdrop-blur-sm md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2
                className={`${inter.className} text-2xl text-[#15261d] md:text-3xl`}
              >
                Shop by Category
              </h2>
              <Link
                href="/shop"
                className="text-sm font-semibold text-[#2f7f54] hover:text-[#00a757]"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {topCategories.map((category) => (
                <Link
                  key={category.name}
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="rounded-2xl border border-emerald-100 bg-[#f7fbf6] px-3 py-4 text-center transition hover:border-[#00be62] hover:bg-white"
                >
                  <p className="text-sm font-semibold text-[#1f3027] line-clamp-1">
                    {category.name}
                  </p>
                  <p className="mt-1 text-xs text-[#64746c]">
                    {category.count} items
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8 md:pb-10">
        <Container>
          <div className="rounded-3xl border border-emerald-200/70 bg-white/70 p-5 backdrop-blur-sm md:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#2f7f54]">
                  Latest Green Drops
                </p>
                <h2
                  className={`${inter.className} text-2xl text-[#15261d] md:text-3xl`}
                >
                  Fresh Arrivals
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-sm font-semibold text-[#2f7f54] hover:text-[#00a757]"
              >
                Explore more
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {isLoading
                ? [...Array(8)].map((_, i) => (
                    <ProductSkeleton key={`fa-${i}`} />
                  ))
                : freshArrivals
                    .slice(0, 8)
                    .map((item) => (
                      <Product
                        key={item.id}
                        id={item.id}
                        img={
                          item.image_url === null
                            ? item.thumbnail
                            : item.image_url
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
                    ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="rounded-3xl border border-emerald-100 bg-[linear-gradient(140deg,#173126_0%,#234335_55%,#2c5843_100%)] p-5 shadow-[0_28px_70px_-45px_rgba(17,42,28,0.55)] md:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-emerald-100/90">
                  Editor&apos;s Choice
                </p>
                <h2
                  className={`${inter.className} text-2xl text-white md:text-3xl`}
                >
                  Best Collections
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-sm font-semibold text-emerald-100 hover:text-white"
              >
                Shop featured
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {isLoading
                ? [...Array(8)].map((_, i) => (
                    <ProductSkeleton key={`bc-${i}`} />
                  ))
                : bestCollections
                    .slice(0, 8)
                    .map((item) => (
                      <Product
                        key={item.id}
                        id={item.id}
                        img={
                          item.image_url === null
                            ? item.thumbnail
                            : item.image_url
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
                    ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-white">
        <AutoPlayText />
      </div>
    </div>
  );
}
