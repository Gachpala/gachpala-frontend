"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  cartReducer,
  addToFavorites,
  removeFromFavorites,
} from "@/app/slices/products_slices";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY, requireAuthOrRun } from "@/lib/authGate";

const ProductCard = ({
  id,
  img,
  alt,
  title,
  price,
  description,
  stock,
  category_id,
  category_name,
  is_featured,
  created_at,
  status,
  weight,
  dimensions,
  className,
}) => {
  const router = useRouter();
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isCartSubmitting, setIsCartSubmitting] = useState(false);
  const [usePlaceholder, setUsePlaceholder] = useState(!img);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorited = favorites?.some((item) => item.id === id) || false;

  useEffect(() => {
    if (isCartAdded) {
      const timer = setTimeout(() => {
        setIsCartAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCartAdded]);

  useEffect(() => {
    if (isCartAnimating) {
      const timer = setTimeout(() => {
        setIsCartAnimating(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isCartAnimating]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isCartSubmitting) return;

    setIsCartAnimating(true);

    requireAuthOrRun(async () => {
      setIsCartSubmitting(true);
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) return;

        const payload = {
          product_id: id,
          quantity: 1,
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

        const newItem = {
          id,
          name: title,
          price: parseFloat(price),
          quantity: 1,
          image: img,
          size: "Standard",
          description,
          stock,
          category_id,
          category_name,
          is_featured,
          created_at,
          status,
          weight,
          dimensions,
        };
        dispatch(cartReducer(newItem));

        setIsCartAdded(true);
      } catch (error) {
        console.error("Add to cart request failed:", error);
      } finally {
        setIsCartSubmitting(false);
      }
    }, "product-card:add-to-cart");
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();

    requireAuthOrRun(async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return;

      if (isFavorited) {
        const response = await fetch(`${API_BASE_URL}/wishlist/${id}`, {
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

        dispatch(removeFromFavorites(id));
      } else {
        const response = await fetch(`${API_BASE_URL}/wishlist`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: id }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Add to wishlist failed:", text || response.status);
          return;
        }

        const newItem = {
          id,
          name: title,
          price: parseFloat(price),
          image: img,
          description,
          stock,
          category_id,
          category_name,
          is_featured,
          created_at,
          status,
          weight,
          dimensions,
        };
        dispatch(addToFavorites(newItem));
      }
    }, "product-card:wishlist");
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("shopScrollY", String(window.scrollY));
    }
    router.push(`/productDetails?id=${id}`);
  };

  const placeholder = "/plant-placeholder.png";
  const imageSrc = useMemo(() => {
    const src = usePlaceholder ? placeholder : img;
    if (!usePlaceholder && src && src.startsWith("/")) {
      return `${API_BASE_URL}${src}`;
    }
    return src || placeholder;
  }, [img, usePlaceholder]);

  const textShorter = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const shortDescription = useMemo(
    () => textShorter(description, 55),
    [description],
  );

  const hasStock = stock == null || Number(stock) > 0;
  const stockLabel = hasStock
    ? stock == null
      ? "In stock"
      : `${stock} in stock`
    : "Out of stock";

  return (
    <article
      onClick={handleDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleDetails(e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
      className={`group w-full h-full min-h-[300px] sm:min-h-[360px] bg-[#f8f8f8] border border-[#eef0ea] rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_22px_rgba(0,0,0,0.08)] transition-all duration-300 relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00be62]/35 hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 ${className || ""}`}
    >
      <div className="flex h-full flex-col gap-2.5 sm:gap-3">
        <div className="relative overflow-hidden rounded-xl bg-[#ebebeb]">
          {is_featured ? (
            <span className="absolute left-2 top-2 z-20 rounded-full bg-[#00be62] px-2 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm sm:left-3 sm:top-3 sm:text-xs">
              Featured
            </span>
          ) : null}

          <button
            type="button"
            onClick={handleAddToFavorites}
            title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isFavorited}
            aria-label={
              isFavorited ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`absolute right-2 top-2 z-20 rounded-full border p-2 min-h-10 min-w-10 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00be62]/35 sm:right-3 sm:top-3 ${
              isFavorited
                ? "border-red-100 bg-red-50 text-[#c00000]"
                : "border-white/70 bg-white/80 text-black hover:text-[#c00000]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFavorited ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          <img
            src={imageSrc}
            alt={alt || title}
            loading="lazy"
            decoding="async"
            onError={() => setUsePlaceholder(true)}
            className="h-36 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-44 md:h-48"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/35 to-transparent p-2.5 sm:p-3">
            <p className="inline-flex rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-neutral-700 sm:text-xs">
              {category_name || "Plant"}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-1 pb-1 sm:px-2 sm:pb-2">
          <div className="mb-1.5 flex items-start justify-between gap-2 sm:mb-2">
            <h2 className="line-clamp-1 text-[15px] font-semibold leading-tight text-[#1f1f1f] sm:text-lg">
              {title}
            </h2>
            <p className="shrink-0 rounded-full bg-[#e7f7ef] px-2 py-1 text-[11px] font-semibold text-[#009a52] sm:text-xs">
              {stockLabel}
            </p>
          </div>

          <p className="line-clamp-2 min-h-10 text-[12px] leading-relaxed text-neutral-600 sm:min-h-11 sm:text-[13px]">
            {shortDescription || "Healthy plant from Gachpala collection."}
          </p>

          <div className="mt-auto pt-3 flex items-center justify-between">
            <p className="text-base font-bold text-[#2b2b2b] sm:text-lg">
              {price}{" "}
              <span className="text-[11px] font-medium text-[#00be62] sm:text-xs">
                BDT
              </span>
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isCartSubmitting || !hasStock}
              aria-live="polite"
              className={`min-h-10 rounded-full px-3 py-2 text-[12px] font-semibold text-white shadow-md transition-[background-color,transform,box-shadow,opacity] duration-300 ease-out sm:min-h-11 sm:px-4 sm:text-sm ${
                hasStock
                  ? "bg-[#00be62] hover:bg-green-600"
                  : "bg-neutral-400 cursor-not-allowed"
              } active:scale-[0.98] disabled:opacity-75 motion-reduce:transform-none ${
                isCartAnimating ? "animate-cart-bump" : ""
              }`}
            >
              {isCartSubmitting
                ? "Adding..."
                : isCartAdded
                  ? "Added"
                  : hasStock
                    ? "Add to Cart"
                    : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
