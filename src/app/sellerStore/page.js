"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, openSans, arapey } from "@/lib/fonts";
import { STATIC_PRODUCTS, getStaticProductById } from "@/data/staticProducts";

function SellerStoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const sellerName = searchParams.get("seller") || "Green Flora Nursery";
  const shopName = searchParams.get("shop") || "Gachpala Official Garden";
  const sellerLocation = searchParams.get("location") || "Dhaka, Bangladesh";

  const currentProduct = useMemo(
    () => getStaticProductById(productId) || STATIC_PRODUCTS[0],
    [productId],
  );

  const products = useMemo(() => {
    const sellerProducts = STATIC_PRODUCTS.filter(
      (p) =>
        (p.seller_name && p.seller_name === currentProduct.seller_name) ||
        p.seller_id === currentProduct.seller_id,
    );
    return sellerProducts.length > 0
      ? sellerProducts
      : STATIC_PRODUCTS.slice(0, 8);
  }, [currentProduct]);

  const seller = useMemo(
    () => ({
      name: sellerName || currentProduct.seller_name || "Green Flora Nursery",
      shop: shopName || currentProduct.shop_name || "Gachpala Official Garden",
      location:
        sellerLocation ||
        currentProduct.seller_location ||
        "Dhaka, Bangladesh",
      status: "active",
      verified: true,
    }),
    [sellerName, currentProduct, sellerLocation, shopName],
  );

  const stats = useMemo(
    () => ({
      totalProducts: products.length,
      rating: 4.9,
      reviewsCount: 142,
      joinedYear: "2023",
    }),
    [products.length],
  );

  const isLoading = false;

  const sellerInfo = {
    name: seller?.seller_name || sellerName,
    shop: seller?.shop_name || shopName,
    location: seller?.location || sellerLocation,
    about: seller?.about_this_seller || "About This Seller",
    status: String(seller?.status || "active"),
    verified: Boolean(seller?.verified_seller),
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7faf5_0%,#edf3ea_100%)] pb-16 md:pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <Container className="relative z-10 pt-8 md:pt-10">
        <div className="mb-3 md:mb-4">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
                return;
              }
              router.push("/shop");
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-semibold text-[#2f7f54] shadow-sm hover:bg-white transition"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 md:p-8 shadow-[0_24px_60px_-42px_rgba(17,42,28,0.36)] backdrop-blur-sm">
          <p
            className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
          >
            Seller Store
          </p>
          <h1
            className={`${arapey.className} mt-2 text-4xl md:text-5xl text-[#15261d]`}
          >
            {sellerInfo.name}
          </h1>
          <p className={`${inter.className} mt-2 text-lg text-[#2f7f54]`}>
            {sellerInfo.shop}
          </p>
          <p className={`${openSans.className} mt-2 text-sm text-[#607066]`}>
            Location: {sellerInfo.location}
          </p>
          <p className={`${openSans.className} mt-2 text-sm text-[#5b6b62]`}>
            {sellerInfo.about}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${sellerInfo.verified ? "bg-[#e7f7ef] text-[#00a757]" : "bg-[#f4f7f1] text-[#4f6157]"}`}
            >
              {sellerInfo.verified ? "Verified Seller" : "Seller"}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#f4f7f1] px-3 py-1 text-xs font-semibold text-[#4f6157] capitalize">
              {sellerInfo.status}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#f4f7f1] px-3 py-1 text-xs font-semibold text-[#4f6157]">
              {stats?.total_products ?? products.length} products available
            </span>
            <span className="inline-flex items-center rounded-full bg-[#f4f7f1] px-3 py-1 text-xs font-semibold text-[#4f6157]">
              {Number(stats?.avg_rating ?? 0).toFixed(1)} avg rating
            </span>
            <span className="inline-flex items-center rounded-full bg-[#f4f7f1] px-3 py-1 text-xs font-semibold text-[#4f6157]">
              {stats?.total_reviews ?? 0} reviews
            </span>
            <span className="inline-flex items-center rounded-full bg-[#f4f7f1] px-3 py-1 text-xs font-semibold text-[#4f6157]">
              {stats?.total_sold ?? 0} sold
            </span>
          </div>
        </div>

        <div className="mt-6 md:mt-8 rounded-3xl border border-emerald-100 bg-white/95 p-5 md:p-8 shadow-[0_24px_60px_-42px_rgba(17,42,28,0.36)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
              >
                Store Products
              </p>
              <h2 className={`${inter.className} mt-2 text-2xl text-[#1a2b22]`}>
                Browse Products
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              products.map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  img={item.image_url || item.thumbnail || item.image}
                  alt={item.name || item.title || "Product"}
                  title={item.name || item.title || "Product"}
                  price={`${item.price ?? 0}`}
                  description={item.description || ""}
                  stock={item.stock}
                  category_id={item.category_id}
                  category_name={item.category_name}
                  is_featured={item.is_featured}
                  created_at={item.created_at}
                  status={item.status}
                  weight={item.weight}
                  dimensions={item.dimensions}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className={`${openSans.className} text-sm text-[#5b6b62]`}>
                  No products found for this seller right now.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function SellerStorePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <SellerStoreContent />
    </Suspense>
  );
}
