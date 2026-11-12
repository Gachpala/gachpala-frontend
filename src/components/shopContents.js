"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, openSans } from "@/lib/fonts";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { productReducer } from "@/app/slices/products_slices";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { STATIC_PRODUCTS } from "@/data/staticProducts";

export default function ShopContents() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search") || "";
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const normalizedCategory = String(selectedCategory || "")
    .trim()
    .toLowerCase();
  const [allProducts] = useState(STATIC_PRODUCTS);
  const isLoading = false;
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    dispatch(productReducer(STATIC_PRODUCTS));
  }, [dispatch]);

  // Filter products based on selected category
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      !normalizedCategory ||
      String(product?.category_name || "").toLowerCase() ===
        normalizedCategory;

    if (!matchesCategory) return false;

    if (!normalizedSearch) return true;

    const haystacks = [
      product?.name,
      product?.description,
      product?.category_name,
    ]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    return haystacks.some((value) => value.includes(normalizedSearch));
  });

  useEffect(() => {
    if (isLoading) return;
    if (typeof window === "undefined") return;

    const saved = sessionStorage.getItem("shopScrollY");
    if (!saved) return;

    const y = Number(saved);
    if (!Number.isNaN(y)) {
      // Delay one frame so layout has settled before scrolling.
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "auto" });
      });
    }

    sessionStorage.removeItem("shopScrollY");
  }, [isLoading, filteredProducts.length]);

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, endIdx);
  const displayStart = totalProducts === 0 ? 0 : startIdx + 1;
  const displayEnd = Math.min(endIdx, totalProducts);

  const categories = useMemo(() => {
    const set = new Set();
    allProducts.forEach((product) => {
      const name = product?.category_name?.trim();
      if (name) set.add(name);
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [allProducts]);

  const activeSearch = searchTerm.trim();
  const hasSearch = Boolean(activeSearch);
  const searchLabel = hasSearch ? ` for "${activeSearch}"` : "";
  const categoryLabel = selectedCategory ? ` in ${selectedCategory}` : "";
  const filterLabel = `${searchLabel}${categoryLabel}`;
  const hasFilters = hasSearch || Boolean(selectedCategory);

  const buildShopLink = (category) => {
    const params = new URLSearchParams();
    if (hasSearch) {
      params.set("search", activeSearch);
    }
    if (category) {
      params.set("category", category);
    }
    const query = params.toString();
    return query ? `/shop?${query}` : "/shop";
  };

  const pageWindow = useMemo(() => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <section className="pb-16">
      <div className="relative overflow-hidden bg-[linear-gradient(130deg,#e8f2e7_0%,#f4f9f1_52%,#f8fbf5_100%)] px-4 py-10 sm:px-6 md:px-10 md:py-14 mb-10 md:mb-14">
        <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/35 blur-3xl" />

        <Container>
          <div className="relative z-10">
            <p
              className={`${openSans.className} text-[11px] uppercase tracking-[0.2em] text-[#357f55]`}
            >
              Gachpala Marketplace
            </p>
            <h1
              className={`${inter.className} mt-2 text-3xl leading-tight text-[#15261d] md:text-5xl`}
            >
              Shop Plants
            </h1>
            <p
              className={`${openSans.className} mt-3 text-sm text-[#55665d] md:text-base`}
            >
              Showing {displayStart}-{displayEnd} of {totalProducts} products
              {filterLabel ? `${filterLabel}.` : "."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link
                href={buildShopLink()}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  !selectedCategory
                    ? "border-[#00be62] bg-[#e8f7ef] text-[#1f7a4d]"
                    : "border-emerald-200 bg-white text-[#4f6358] hover:border-[#00be62]"
                }`}
              >
                All Categories
              </Link>
              {categories.slice(0, 8).map((category) => {
                const isActive =
                  String(selectedCategory || "").toLowerCase() ===
                  category.toLowerCase();
                return (
                  <Link
                    key={category}
                    href={buildShopLink(category)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "border-[#00be62] bg-[#e8f7ef] text-[#1f7a4d]"
                        : "border-emerald-200 bg-white text-[#4f6358] hover:border-[#00be62]"
                    }`}
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <Container className="max-w-[1400px]! rounded-3xl border border-emerald-200/70 bg-white/70 p-3 shadow-[0_26px_60px_-46px_rgba(17,42,28,0.4)] backdrop-blur-sm sm:p-4 md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-1 md:mb-7">
          <p
            className={`${openSans.className} text-xs uppercase tracking-[0.15em] text-[#597066]`}
          >
            Curated Green Collection
          </p>
          {hasFilters ? (
            <Link
              href="/shop"
              className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#356f50] hover:border-[#00be62]"
            >
              Clear Filters
            </Link>
          ) : null}
        </div>

        <div className="mx-auto mb-6 grid grid-cols-2 gap-3 sm:gap-6 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: productsPerPage }).map((_, i) => (
              <ProductSkeleton key={i} className={`my-4 sm:my-6 mx-auto`} />
            ))
          ) : Array.isArray(currentProducts) && currentProducts.length > 0 ? (
            // Show products when loaded
            currentProducts.map((product) => (
              <Product
                className="my-4 sm:my-6 mx-auto"
                key={product.id}
                id={product.id}
                img={
                  product.image_url === ""
                    ? product.thumbnail
                    : product.image_url
                }
                alt={product.name}
                title={product.name}
                price={`${product.price}`}
                description={product.description}
                stock={product.stock}
                category_id={product.category_id}
                category_name={product.category_name}
                is_featured={product.is_featured}
                created_at={product.created_at}
                status={product.status}
                weight={product.weight}
                dimensions={product.dimensions}
              />
            ))
          ) : (
            // Show empty state when no products
            <div className="col-span-full rounded-2xl border border-emerald-100 bg-[#f8fbf7] text-center py-14">
              <p className={`${inter.className} text-xl text-[#27392f]`}>
                {hasSearch
                  ? `No results for "${activeSearch}"`
                  : "No products found"}
              </p>
              <p className="mt-2 text-sm text-[#64746c]">
                {hasFilters
                  ? "Try a different keyword or clear filters."
                  : "Try switching category or browsing all products."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-[#4e6559] disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {pageWindow.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                    page === currentPage
                      ? "bg-[#00be62] text-white"
                      : "border border-emerald-200 bg-white text-[#4e6559] hover:border-[#00be62]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-[#4e6559] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
