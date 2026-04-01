"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const productList = useSelector((state) => state.products.product);

  const normalizeProduct = (rawProduct) => {
    if (!rawProduct) return null;

    const toAbsolute = (url) => {
      if (!url) return "/plant-placeholder.png";
      if (String(url).startsWith("http")) return url;
      return `${API_BASE_URL}${url}`;
    };

    const thumbnail = toAbsolute(
      rawProduct.thumbnail || rawProduct.image_url || rawProduct.image,
    );

    const rawImages =
      Array.isArray(rawProduct.images) && rawProduct.images.length > 0
        ? rawProduct.images
        : [rawProduct.image_url || rawProduct.thumbnail || rawProduct.image];

    return {
      ...rawProduct,
      id: rawProduct.id,
      title: rawProduct.title || rawProduct.name || "Product",
      description: rawProduct.description || "",
      price: Number(rawProduct.price) || 0,
      thumbnail,
      images: rawImages.filter(Boolean).map(toAbsolute),
    };
  };

  const isFavorited = favorites?.some(
    (item) => String(item.id) === String(productId),
  );

  // 🔹 Fetch product
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        // Prefer already-loaded Redux product list to avoid an extra request.
        if (Array.isArray(productList) && productList.length > 0) {
          const matched = productList.find(
            (item) => String(item.id) === String(productId),
          );
          if (matched) {
            setProduct(normalizeProduct(matched));
            return;
          }
        }

        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        const matched = Array.isArray(data)
          ? data.find((item) => String(item.id) === String(productId))
          : null;

        setProduct(normalizeProduct(matched));
      } catch (error) {
        console.error("Fetch error:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, productList]);

  // 🔹 Reset "Added" state
  useEffect(() => {
    if (!isAddedToCart) return;
    const timer = setTimeout(() => setIsAddedToCart(false), 2000);
    return () => clearTimeout(timer);
  }, [isAddedToCart]);

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

  const reviews =
    Array.isArray(product.reviews) && product.reviews.length > 0
      ? product.reviews
      : [
          {
            name: "Ayesha Rahman",
            rating: 5,
            comment:
              "Beautiful healthy plant and premium packaging. It arrived fresh and looked exactly like the photos.",
            date: "2026-03-21",
          },
          {
            name: "Nafis Ahmed",
            rating: 4,
            comment:
              "Very good quality overall. The leaves were vibrant and the support team was helpful.",
            date: "2026-03-08",
          },
          {
            name: "Samia Islam",
            rating: 5,
            comment:
              "Absolutely love this one. It elevated my living room and care instructions were clear.",
            date: "2026-02-27",
          },
        ];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + Number(review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const suggestedProducts = Array.isArray(productList)
    ? productList
        .filter((item) => String(item.id) !== String(product.id))
        .slice(0, 4)
    : [];

  const resolveSuggestedImage = (item) => {
    const source = item.image_url || item.thumbnail || item.image;
    if (!source) return "/plant-placeholder.png";
    if (String(source).startsWith("http")) return source;
    return `${API_BASE_URL}${source}`;
  };

  // ✅ CART — uses cartReducer (your slice)
  const handleAddToCart = () => {
    requireAuthOrRun(async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return;

      const payload = {
        product_id: product.id,
        quantity,
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
          quantity,
          image: product.thumbnail,
          size: "Standard",
        }),
      );
      setIsAddedToCart(true);
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbf6_0%,#eef4ea_100%)] pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <Container className="relative z-10 pt-10">
        <div className="rounded-2xl border border-emerald-100 bg-white/75 backdrop-blur-sm px-5 py-3 mb-8">
          <p className={`${openSans.className} text-sm text-[#607066]`}>
            Home / Shop /{" "}
            <span className="text-[#2f7f54]">{product.title}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-4xl border border-emerald-100 bg-white/85 backdrop-blur-sm p-5 md:p-7 shadow-[0_28px_70px_-42px_rgba(17,42,28,0.45)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-3 flex md:flex-col gap-3 max-h-[540px] overflow-y-auto pr-1">
                {displayImages.slice(0, 6).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-22 h-22 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-[#00be62] shadow-lg shadow-emerald-300/30"
                        : "border-emerald-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title}-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="md:col-span-9 min-h-[420px] md:min-h-[560px] rounded-3xl bg-[linear-gradient(180deg,#f9fcf7_0%,#edf4ea_100%)] border border-emerald-100 flex items-center justify-center overflow-hidden">
                <img
                  src={displayImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-7 md:p-10"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-4xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_24px_60px_-38px_rgba(17,42,28,0.42)]">
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#357f55]`}
              >
                Premium Selection
              </p>

              <h1
                className={`${arapey.className} mt-2 text-4xl leading-tight text-[#15261d] md:text-5xl`}
              >
                {product.title}
              </h1>

              <div className="mt-5 flex items-end gap-3">
                <p className={`${inter.className} text-3xl text-[#00be62]`}>
                  ${product.price}
                </p>
                <p
                  className={`${openSans.className} text-sm text-[#6b7a72] pb-1`}
                >
                  x {quantity} = ${(product.price * quantity).toFixed(2)}
                </p>
              </div>

              <p
                className={`${openSans.className} mt-5 text-[#596a61] leading-7`}
              >
                {product.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl border border-emerald-100 bg-[#f7fbf6]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-[#4f6157] hover:text-[#00be62]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`px-7 py-3 font-bold rounded-xl text-white transition shadow-lg ${
                    isAddedToCart
                      ? "bg-[#00be62] shadow-emerald-500/30"
                      : "bg-[#1f2f25] hover:bg-[#17221b] shadow-neutral-900/20"
                  }`}
                >
                  {isAddedToCart ? "Added!" : "Add to Cart"}
                </button>

                <button
                  onClick={handleAddToFavorites}
                  className={`border p-3 rounded-xl transition ${
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

        <div className="mt-8 rounded-4xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_24px_60px_-38px_rgba(17,42,28,0.36)]">
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
                  {averageRating}/5
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
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {reviews.map((review, index) => (
                <article
                  key={`${review.name}-${index}`}
                  className="rounded-2xl border border-emerald-100 bg-[#f8fbf7] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={`${inter.className} text-base text-[#1f3127]`}
                    >
                      {review.name || "Customer"}
                    </h3>
                    <span className="text-xs text-[#6d7b74]">
                      {review.date || "Recent"}
                    </span>
                  </div>

                  <p className="mt-2 text-[#00be62] tracking-wide">
                    {"★".repeat(Number(review.rating || 0))}
                    {"☆".repeat(5 - Number(review.rating || 0))}
                  </p>

                  <p
                    className={`${openSans.className} mt-3 text-sm leading-7 text-[#5b6b62]`}
                  >
                    {review.comment || "Great product and service."}
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 rounded-4xl border border-emerald-100 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_24px_60px_-38px_rgba(17,42,28,0.36)]">
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

          {suggestedProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {suggestedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/productDetails?id=${item.id}`}
                  className="group rounded-2xl border border-emerald-100 bg-[#f8fbf7] overflow-hidden hover:border-[#00be62] transition"
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
