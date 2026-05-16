"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/container";
import { arapey, inter, openSans } from "@/lib/fonts";
import { FaRegHeart } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  cartReducer,
  addToFavorites,
  removeFromFavorites,
} from "@/app/slices/products_slices";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY, requireAuthOrRun } from "@/lib/authGate";

function ProductDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const openReviews = searchParams.get("review") === "1";

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isCartSubmitting, setIsCartSubmitting] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isSuggestedLoading, setIsSuggestedLoading] = useState(false);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [isSellerLoading, setIsSellerLoading] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);

  const normalizeProduct = (rawProduct) => {
    if (!rawProduct) return null;

    const toAbsolute = (url) => {
      if (!url) return "/plant-placeholder.png";
      if (String(url).startsWith("http")) return url;
      return `${API_BASE_URL}${url}`;
    };

    const thumbnail = toAbsolute(
      rawProduct.product_image ||
        rawProduct.thumbnail ||
        rawProduct.image_url ||
        rawProduct.image,
    );

    const rawImages =
      Array.isArray(rawProduct.product_gallery) &&
      rawProduct.product_gallery.length > 0
        ? rawProduct.product_gallery
        : Array.isArray(rawProduct.images) && rawProduct.images.length > 0
          ? rawProduct.images
          : [
              rawProduct.product_image ||
                rawProduct.image_url ||
                rawProduct.thumbnail ||
                rawProduct.image,
            ];

    const wishlistValue = String(
      rawProduct.product_wishlist || rawProduct.wishlist || "no",
    ).toLowerCase();

    return {
      ...rawProduct,
      id: rawProduct.product_id || rawProduct.id,
      title:
        rawProduct.product_title ||
        rawProduct.title ||
        rawProduct.name ||
        "Product",
      description:
        rawProduct.product_description || rawProduct.description || "",
      price: Number(rawProduct.product_price ?? rawProduct.price) || 0,
      category:
        rawProduct.product_category ||
        rawProduct.category_name ||
        rawProduct.category ||
        "",
      stock: Number(rawProduct.product_stock ?? rawProduct.stock) || 0,
      discount: Number(rawProduct.product_discount ?? rawProduct.discount) || 0,
      rating: Number(rawProduct.product_rating ?? rawProduct.rating) || 0,
      wishlist:
        wishlistValue === "yes" ||
        wishlistValue === "true" ||
        wishlistValue === "1",
      seller: {
        name:
          rawProduct.seller_name ||
          rawProduct.seller?.name ||
          rawProduct.shop_name ||
          "Gachpala Store",
        shop:
          rawProduct.seller_shop_name ||
          rawProduct.seller?.shop ||
          rawProduct.shop_name ||
          "Verified Plant Seller",
        phone:
          rawProduct.seller_phone || rawProduct.seller?.phone || "Not provided",
        email:
          rawProduct.seller_email || rawProduct.seller?.email || "Not provided",
        location:
          rawProduct.seller_location ||
          rawProduct.seller?.location ||
          "Bangladesh",
        storeUrl:
          rawProduct.seller_store_url ||
          rawProduct.seller?.store_url ||
          rawProduct.seller?.storeUrl ||
          null,
      },
      thumbnail,
      images: rawImages.filter(Boolean).map(toAbsolute),
    };
  };

  const isFavorited =
    favorites?.some((item) => String(item.id) === String(productId)) ||
    Boolean(product?.wishlist);

  // 🔹 Fetch product
  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/products/product-details/${productId}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details: ${response.status}`,
          );
        }

        const data = await response.json();
        setProduct(normalizeProduct(data));
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Fetch error:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [productId]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [productId]);

  useEffect(() => {
    if (openReviews) {
      setShowReviews(true);
    }
  }, [openReviews]);

  useEffect(() => {
    if (!productId) {
      setReviews([]);
      setIsReviewsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchReviews = async () => {
      try {
        setIsReviewsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/products/${productId}/reviews`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const data = await response.json();
        const normalized = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id,
              name: item.user_name || `Customer #${item.user_id || ""}`.trim(),
              rating: Number(item.rating) || 0,
              comment: item.comment || "",
              date: String(item.created_at || "").slice(0, 10) || "Recent",
            }))
          : [];

        setReviews(normalized);
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Review fetch error:", error);
        setReviews([]);
      } finally {
        setIsReviewsLoading(false);
      }
    };

    fetchReviews();

    return () => {
      controller.abort();
    };
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      setSuggestedProducts([]);
      setIsSuggestedLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestedProducts = async () => {
      try {
        setIsSuggestedLoading(true);
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        const normalized = Array.isArray(data)
          ? data
              .filter((item) => String(item.id) !== String(productId))
              .slice(0, 4)
          : [];

        setSuggestedProducts(normalized);
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Suggested products fetch error:", error);
        setSuggestedProducts([]);
      } finally {
        setIsSuggestedLoading(false);
      }
    };

    fetchSuggestedProducts();

    return () => {
      controller.abort();
    };
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      setSellerInfo(null);
      setIsSellerLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchSellerInfo = async () => {
      try {
        setIsSellerLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/products/product-details/${productId}/seller`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch seller information: ${response.status}`,
          );
        }

        const data = await response.json();
        setSellerInfo({
          about: data?.about_this_seller || "About This Seller",
          sellerId: data?.seller_id,
          name: data?.seller_name || "Gachpala Store",
          shop: data?.shop_name || "Verified Plant Seller",
          location: data?.location || "Bangladesh",
          status: String(data?.status || "active"),
          verified: Boolean(data?.verified_seller),
          storeUrl:
            data?.seller_store_url || data?.store_url || data?.storeUrl || null,
        });
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Seller fetch error:", error);
        setSellerInfo(null);
      } finally {
        setIsSellerLoading(false);
      }
    };

    fetchSellerInfo();

    return () => {
      controller.abort();
    };
  }, [productId]);

  // 🔹 Reset "Added" state
  useEffect(() => {
    if (!isAddedToCart) return;
    const timer = setTimeout(() => setIsAddedToCart(false), 2000);
    return () => clearTimeout(timer);
  }, [isAddedToCart]);

  useEffect(() => {
    const stockValue = Number(product?.stock || 0);
    const allowedMax = stockValue > 0 ? stockValue : 1;
    setQuantity((prev) => Math.min(Math.max(1, prev), allowedMax));
  }, [product?.stock]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[linear-gradient(180deg,#f8fbf6_0%,#eff4ea_100%)] text-[#335544]">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[linear-gradient(180deg,#f8fbf6_0%,#eff4ea_100%)] text-[#335544]">
        Product not found
      </div>
    );
  }

  const displayImages =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + Number(review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : Number(product.rating || 0).toFixed(1);

  const roundedRating = Math.max(
    0,
    Math.min(5, Math.round(Number(averageRating) || 0)),
  );
  const hasRating = Number(averageRating) > 0;

  const resolveSuggestedImage = (item) => {
    const source = item.image_url || item.thumbnail || item.image;
    if (!source) return "/plant-placeholder.png";
    if (String(source).startsWith("http")) return source;
    return `${API_BASE_URL}${source}`;
  };

  const inStock = Number(product.stock || 0) > 0;
  const maxQuantity = inStock ? Math.max(1, Number(product.stock || 1)) : 1;
  const hasDiscount = Number(product.discount || 0) > 0;
  const seller = sellerInfo ||
    product.seller || {
      about: "About This Seller",
      sellerId: null,
      name: "Gachpala Store",
      shop: "Verified Plant Seller",
      location: "Bangladesh",
      status: "active",
      verified: true,
      storeUrl: null,
    };
  const sellerStoreHref =
    seller.storeUrl ||
    `/sellerStore?productId=${encodeURIComponent(String(product.id || productId || ""))}&seller=${encodeURIComponent(seller.name || "Gachpala Store")}&shop=${encodeURIComponent(seller.shop || "Verified Plant Seller")}&location=${encodeURIComponent(seller.location || "Bangladesh")}${seller.sellerId ? `&id=${encodeURIComponent(String(seller.sellerId))}` : ""}`;
  const isExternalSellerStore = String(sellerStoreHref).startsWith("http");

  // ✅ CART — uses cartReducer (your slice)
  const handleAddToCart = () => {
    if (isCartSubmitting || !inStock) return;

    requireAuthOrRun(async () => {
      setIsCartSubmitting(true);
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) return;

        const safeQuantity = Math.min(Math.max(1, quantity), maxQuantity);

        const payload = {
          product_id: product.id,
          quantity: safeQuantity,
        };

        const response = await fetch(`${API_BASE_URL}/cart`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Add to cart failed:", text || response.status);
          return;
        }

        dispatch(
          cartReducer({
            id: product.id,
            name: product.title,
            price: product.price,
            quantity: safeQuantity,
            image: product.thumbnail,
            size: "Standard",
          }),
        );
        setIsAddedToCart(true);
      } finally {
        setIsCartSubmitting(false);
      }
    }, "product-details:add-to-cart");
  };

  // ✅ FAVORITES — matches slice
  const handleAddToFavorites = () => {
    requireAuthOrRun(async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return;

      if (isFavorited) {
        const response = await fetch(`${API_BASE_URL}/wishlist/${product.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error(
            "Remove from wishlist failed:",
            text || response.status,
          );
          return;
        }

        dispatch(removeFromFavorites(product.id));
      } else {
        const response = await fetch(`${API_BASE_URL}/wishlist`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: product.id }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Add to wishlist failed:", text || response.status);
          return;
        }

        dispatch(
          addToFavorites({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.thumbnail,
          }),
        );
      }
    }, "product-details:wishlist");
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
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

        <div className="mb-6 rounded-2xl border border-emerald-100/80 bg-white/80 px-4 py-3 backdrop-blur-sm md:mb-8 md:px-5">
          <p
            className={`${openSans.className} text-xs md:text-sm text-[#607066]`}
          >
            <Link href="/" className="hover:text-[#2f7f54] transition-colors">
              Home
            </Link>{" "}
            /{" "}
            <Link
              href="/shop"
              className="hover:text-[#2f7f54] transition-colors"
            >
              Shop
            </Link>{" "}
            / <span className="text-[#2f7f54]">{product.title}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 rounded-3xl border border-emerald-100 bg-white/90 p-4 shadow-[0_26px_60px_-44px_rgba(17,42,28,0.45)] backdrop-blur-sm md:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
              <div className="order-2 md:order-1 md:col-span-3 flex md:flex-col gap-2.5 md:gap-3 md:max-h-[560px] overflow-x-auto md:overflow-y-auto md:pr-1">
                {displayImages.slice(0, 6).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-22 md:w-22 ${
                      selectedImage === index
                        ? "border-[#00be62] shadow-lg shadow-emerald-300/30"
                        : "border-emerald-100 hover:border-emerald-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title}-${index}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 md:order-2 md:col-span-9 min-h-[300px] sm:min-h-[380px] md:min-h-[560px] rounded-2xl md:rounded-3xl bg-[linear-gradient(180deg,#f9fcf7_0%,#edf4ea_100%)] border border-emerald-100 flex items-center justify-center overflow-hidden">
                <img
                  src={displayImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-5 sm:p-7 md:p-10"
                  onError={(e) => {
                    e.target.src = "/plant-placeholder.png";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-[0_24px_56px_-40px_rgba(17,42,28,0.42)] backdrop-blur-sm md:sticky md:top-24 md:p-7">
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
              >
                Premium Selection
              </p>

              <h1
                className={`${arapey.className} mt-2 text-3xl leading-tight text-[#15261d] md:text-5xl`}
              >
                {product.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#eef8f2] px-3 py-1 text-xs font-semibold text-[#2f7f54]">
                  {inStock ? `${product.stock || 0} in stock` : "Out of stock"}
                </span>
                {product.category ? (
                  <span className="inline-flex items-center rounded-full bg-[#edf4ea] px-3 py-1 text-xs font-semibold text-[#496257]">
                    {product.category}
                  </span>
                ) : null}
                {hasDiscount ? (
                  <span className="inline-flex items-center rounded-full bg-[#e7f7ef] px-3 py-1 text-xs font-semibold text-[#00a757]">
                    {product.discount}% off
                  </span>
                ) : null}
              </div>

              {hasRating ? (
                <div className="mt-3 flex items-center gap-2 text-sm text-[#00be62]">
                  <span>{"★".repeat(roundedRating)}</span>
                  <span className="text-[#9aa79f]">
                    {"☆".repeat(5 - roundedRating)}
                  </span>
                  <span className="text-xs text-[#607066]">
                    ({averageRating})
                  </span>
                </div>
              ) : (
                <p
                  className={`${openSans.className} mt-3 text-xs text-[#7c8a83]`}
                >
                  No ratings yet
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-end gap-2 md:gap-3">
                <p
                  className={`${inter.className} text-2xl md:text-3xl text-[#00be62]`}
                >
                  {product.price} ৳
                </p>
                <p
                  className={`${openSans.className} text-xs sm:text-sm text-[#6b7a72] pb-1`}
                >
                  x {quantity} = {(product.price * quantity).toFixed(2)} ৳
                </p>
              </div>

              <p
                className={`${openSans.className} mt-4 text-sm md:text-base text-[#596a61] leading-7`}
              >
                {product.description ||
                  "No description available for this product yet."}
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex w-fit items-center rounded-xl border border-emerald-100 bg-[#f7fbf6]">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="px-4 py-2 text-[#4f6157] hover:text-[#00be62]"
                  >
                    −
                  </button>
                  <input
                    readOnly
                    value={quantity}
                    className="w-11 text-center bg-transparent border-x border-emerald-100 text-[#182820]"
                  />
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={!inStock || quantity >= maxQuantity}
                    className="px-4 py-2 text-[#4f6157] hover:text-[#00be62] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isCartSubmitting || !inStock}
                    className={`flex-1 px-6 py-3 font-semibold rounded-xl text-white transition shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${
                      isAddedToCart
                        ? "bg-[#00be62] shadow-emerald-500/30"
                        : "bg-[#1f2f25] hover:bg-[#17221b] shadow-neutral-900/20"
                    }`}
                  >
                    {isCartSubmitting
                      ? "Adding..."
                      : isAddedToCart
                        ? "Added!"
                        : inStock
                          ? "Add to Cart"
                          : "Out of Stock"}
                  </button>

                  <button
                    onClick={handleAddToFavorites}
                    aria-label={
                      isFavorited ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={`border px-4 py-3 rounded-xl transition flex items-center justify-center min-w-14 ${
                      isFavorited
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-emerald-100 hover:border-[#00be62]"
                    }`}
                  >
                    {isFavorited ? (
                      <IoHeart className="text-red-500 text-2xl" />
                    ) : (
                      <FaRegHeart className="text-[#5c6f65] text-2xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 rounded-3xl border border-emerald-100 bg-white/95 p-5 md:p-8 shadow-[0_24px_60px_-42px_rgba(17,42,28,0.36)] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
              >
                Seller Information
              </p>
              <h2 className={`${inter.className} mt-2 text-2xl text-[#1a2b22]`}>
                {seller.about || "About This Seller"}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold w-fit ${seller.verified ? "bg-[#e7f7ef] text-[#00a757]" : "bg-[#f4f7f1] text-[#5c6f65]"}`}
              >
                {seller.verified ? "Verified Seller" : "Seller"}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#f4f7f1] px-3 py-1 text-xs font-semibold text-[#4f6157] w-fit capitalize">
                {seller.status || "active"}
              </span>
            </div>
          </div>

          {isSellerLoading ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={`seller-skeleton-${i}`}
                  className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-4"
                >
                  <div className="h-3 w-24 rounded bg-emerald-100/70 shimmer mb-2" />
                  <div className="h-4 w-3/4 rounded bg-emerald-100/60 shimmer" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <article className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-4">
                <p className={`${openSans.className} text-xs text-[#6d7b74]`}>
                  Seller Name
                </p>
                <p className={`${inter.className} mt-1 text-sm text-[#1f3127]`}>
                  {seller.name}
                </p>
              </article>

              <article className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-4">
                <p className={`${openSans.className} text-xs text-[#6d7b74]`}>
                  Shop
                </p>
                <p className={`${inter.className} mt-1 text-sm text-[#1f3127]`}>
                  {seller.shop}
                </p>
              </article>

              <article className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-4">
                <p className={`${openSans.className} text-xs text-[#6d7b74]`}>
                  Location
                </p>
                <p className={`${inter.className} mt-1 text-sm text-[#1f3127]`}>
                  {seller.location}
                </p>
              </article>
            </div>
          )}

          <div className="mt-6">
            {isExternalSellerStore ? (
              <a
                href={sellerStoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00be62] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#00a757] transition"
              >
                Go to Seller Store
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link
                href={sellerStoreHref}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00be62] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#00a757] transition"
              >
                Go to Seller Store
              </Link>
            )}
          </div>
        </div>

        <div
          id="reviews"
          className="mt-6 md:mt-8 rounded-3xl border border-emerald-100 bg-white/95 p-5 md:p-8 shadow-[0_24px_60px_-42px_rgba(17,42,28,0.36)] backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
              >
                Customer Feedback
              </p>
              <h2 className={`${inter.className} mt-2 text-2xl text-[#1a2b22]`}>
                Reviews ({reviews.length})
              </h2>
              <p
                className={`${openSans.className} mt-1 text-sm text-[#607066]`}
              >
                Average rating:{" "}
                <span className="font-semibold text-[#00be62]">
                  {hasRating ? `${averageRating}/5` : "No ratings yet"}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowReviews((prev) => !prev)}
              className="w-fit px-5 py-2.5 rounded-xl bg-[#00be62] text-white font-semibold hover:bg-[#00a757] transition"
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>
          </div>

          {showReviews ? (
            <div className="mt-6">
              {isReviewsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={`review-skeleton-${i}`}
                      className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-5"
                    >
                      <div className="h-4 w-28 bg-emerald-100/70 rounded shimmer mb-3" />
                      <div className="h-3 w-20 bg-emerald-100/60 rounded shimmer mb-4" />
                      <div className="h-3 w-full bg-emerald-100/60 rounded shimmer mb-2" />
                      <div className="h-3 w-4/5 bg-emerald-100/60 rounded shimmer" />
                    </div>
                  ))}
                </div>
              ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={`${inter.className} text-base text-[#1f3127]`}
                        >
                          {review.name || "Customer"}
                        </h3>
                        <span className="text-xs text-[#6d7b74]">
                          {review.date}
                        </span>
                      </div>

                      <p className="mt-2 text-[#00be62] tracking-wide">
                        {"★".repeat(Number(review.rating || 0))}
                        {"☆".repeat(5 - Number(review.rating || 0))}
                      </p>

                      <p
                        className={`${openSans.className} mt-3 text-sm leading-7 text-[#5b6b62]`}
                      >
                        {review.comment || "No comment added."}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <article className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-5">
                  <p className={`${openSans.className} text-sm text-[#5b6b62]`}>
                    No customer reviews yet for this product.
                  </p>
                </article>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-6 md:mt-8 rounded-3xl border border-emerald-100 bg-white/95 p-5 md:p-8 shadow-[0_24px_60px_-42px_rgba(17,42,28,0.36)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
              >
                Suggested For You
              </p>
              <h2 className={`${inter.className} mt-2 text-2xl text-[#1a2b22]`}>
                More You Might Love
              </h2>
            </div>
          </div>

          {isSuggestedLoading ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`suggested-skeleton-${i}`}
                  className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] overflow-hidden"
                >
                  <div className="h-44 bg-[#edf4ea] shimmer" />
                  <div className="p-4">
                    <div className="h-4 w-3/4 rounded bg-emerald-100/70 shimmer" />
                    <div className="h-3 w-1/3 rounded bg-emerald-100/60 shimmer mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : suggestedProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {suggestedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/productDetails?id=${item.id}`}
                  className="group rounded-2xl border border-emerald-100 bg-[#f8fbf7] overflow-hidden hover:border-[#00be62] hover:shadow-md transition"
                >
                  <div className="h-44 bg-[#edf4ea] overflow-hidden">
                    <img
                      src={resolveSuggestedImage(item)}
                      alt={item.name || item.title || "Suggested product"}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3
                      className={`${inter.className} text-base text-[#1f3127] line-clamp-1`}
                    >
                      {item.name || item.title || "Product"}
                    </h3>
                    <p
                      className={`${openSans.className} mt-1 text-sm text-[#00be62] font-semibold`}
                    >
                      ${Number(item.price || 0).toFixed(2)}
                    </p>
                    <p
                      className={`${openSans.className} mt-2 text-xs text-[#6b7a72]`}
                    >
                      View details
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`${openSans.className} mt-5 text-sm text-[#64736b]`}>
              More suggested products will appear here soon.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
