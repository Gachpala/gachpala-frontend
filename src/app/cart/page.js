"use client";
/* eslint-disable @next/next/no-img-element */
import Container from "@/components/container";
import { arapey, inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiArrowRight,
  FiPackage,
  FiChevronRight,
} from "react-icons/fi";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY } from "@/lib/authGate";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartError, setCartError] = useState("");
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setCartData({ items: [], summary: { subtotal: 0, currency: "BDT" } });
        setIsCartLoading(false);
        return;
      }

      try {
        setIsCartLoading(true);
        setCartError("");

        const response = await fetch(`${API_BASE_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();
        let data = {};

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = {};
          }
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              `Failed to load cart (${response.status})`,
          );
        }

        setCartData(data);
      } catch (error) {
        setCartError(error?.message || "Unable to load cart.");
        setCartData({ items: [], summary: { subtotal: 0, currency: "BDT" } });
      } finally {
        setIsCartLoading(false);
      }
    };

    fetchCart();
  }, []);

  const cartItems = useMemo(() => cartData?.items || [], [cartData]);

  const groupedSellers = useMemo(() => {
    const groups = new Map();

    cartItems.forEach((item) => {
      const sellerId = item.seller_id || 0;
      const sellerName = item.seller_name || "Gachpala Store";
      const shopName = item.shop_name || "Verified Plant Seller";
      const location = item.seller_location || "Bangladesh";

      const key = sellerId > 0 ? String(sellerId) : `unknown_${sellerName}`;
      if (!groups.has(key)) {
        groups.set(key, {
          sellerId,
          sellerName,
          shopName,
          location,
          storeUrl: null,
          items: [],
        });
      }

      groups.get(key).items.push(item);
    });

    return Array.from(groups.values());
  }, [cartItems]);

  const updateQuantity = async (id, change) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setCartError("Please sign in to update cart items.");
      return;
    }

    const item = cartItems.find((entry) => entry.id === id);
    if (item) {
      const nextQuantity = item.quantity + change;
      if (nextQuantity < 1) return;
      if (item.stock && nextQuantity > item.stock) return;

      try {
        setUpdatingItemId(id);
        setCartError("");

        const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: nextQuantity }),
        });

        const text = await response.text();
        let data = {};

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = {};
          }
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              `Update failed (${response.status})`,
          );
        }

        setCartData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            items: prev.items.map((entry) =>
              entry.id === id
                ? {
                    ...entry,
                    quantity: nextQuantity,
                    subtotal: parseFloat(
                      (entry.unit_price * nextQuantity).toFixed(2),
                    ),
                  }
                : entry,
            ),
          };
        });
      } catch (error) {
        setCartError(error?.message || "Unable to update cart item.");
      } finally {
        setUpdatingItemId(null);
      }
    }
  };

  const removeItem = async (id) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setCartError("Please sign in to remove cart items.");
      return;
    }

    try {
      setDeletingItemId(id);
      setCartError("");

      const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || `Delete failed (${response.status})`,
        );
      }

      setCartData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          items: prev.items.filter((entry) => entry.id !== id),
        };
      });
    } catch (error) {
      setCartError(error?.message || "Unable to remove cart item.");
    } finally {
      setDeletingItemId(null);
    }
  };

  const subtotal = parseFloat(
    cartItems
      .reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
      .toFixed(2),
  );
  const shipping = 100;
  const total = parseFloat((subtotal + shipping).toFixed(2));

  const currency = cartData?.summary?.currency || "BDT";
  const currencySymbol = currency === "BDT" ? "৳" : `${currency} `;

  const getProductImage = (imagePath) => {
    if (!imagePath) return "/plant-placeholder.png";

    const normalizedPath = String(imagePath).replace(/\\/g, "/");

    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://")
    ) {
      return encodeURI(normalizedPath);
    }

    const withLeadingSlash = normalizedPath.startsWith("/")
      ? normalizedPath
      : `/${normalizedPath}`;

    return encodeURI(`${API_BASE_URL}${withLeadingSlash}`);
  };

  // ─── Loading State ────────────────────────────────────────────────
  if (isCartLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7faf4_0%,#eff4ea_100%)] py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[#00be62]/12 blur-3xl" />
          <div className="absolute -right-20 bottom-16 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl" />
        </div>

        <Container>
          <div className="relative z-10 mb-10">
            <div className="h-4 w-20 bg-emerald-100 rounded animate-pulse mb-3" />
            <div className="h-10 w-64 bg-emerald-100 rounded animate-pulse mb-2" />
            <div className="h-4 w-80 bg-emerald-50 rounded animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-8">
            <div className="grow space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white/85 rounded-2xl border border-emerald-100 p-5 animate-pulse"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 bg-emerald-50 rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-40 bg-emerald-100 rounded" />
                      <div className="h-3 w-24 bg-emerald-50 rounded" />
                      <div className="h-3 w-16 bg-emerald-50 rounded" />
                    </div>
                    <div className="hidden md:block space-y-2">
                      <div className="h-5 w-20 bg-emerald-100 rounded" />
                      <div className="h-8 w-24 bg-emerald-50 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-white/85 rounded-2xl border border-emerald-100 p-6 animate-pulse space-y-4">
                <div className="h-6 w-36 bg-emerald-100 rounded" />
                <div className="h-4 w-full bg-emerald-50 rounded" />
                <div className="h-4 w-full bg-emerald-50 rounded" />
                <div className="h-4 w-full bg-emerald-50 rounded" />
                <div className="h-12 w-full bg-emerald-100 rounded-xl mt-4" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // ─── Empty Cart ───────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7faf4_0%,#eff4ea_100%)] py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#00be62]/15 blur-3xl" />
          <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <Container>
          {cartError ? (
            <div className="relative z-10 mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {cartError}
            </div>
          ) : null}

          <div className="relative z-10 bg-white/85 backdrop-blur-sm rounded-4xl border border-emerald-100 shadow-[0_30px_70px_-38px_rgba(16,40,26,0.45)] p-10 md:p-14 text-center max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#eaf7ef_0%,transparent_58%)] opacity-50 rounded-4xl" />

            <div className="relative z-10">
              <div className="w-28 h-28 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-7 text-[#00be62] shadow-[0_14px_30px_-18px_rgba(0,190,98,0.4)]">
                <FiShoppingBag size={40} strokeWidth={1.5} />
              </div>
              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.2em] text-[#2d7d53] mb-2`}
              >
                Your Cart
              </p>
              <h2
                className={`${arapey.className} text-4xl text-[#1c2c22] mb-4`}
              >
                Nothing here yet
              </h2>
              <p
                className={`${openSans.className} text-[#607066] mb-8 max-w-sm mx-auto`}
              >
                Your cart is waiting for some beautiful plants. Start exploring
                our collection!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#00be62] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#00a757] transition-all shadow-[0_14px_30px_-18px_rgba(0,190,98,0.8)] active:scale-95"
              >
                Browse Plants <FiArrowRight size={18} />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // ─── Cart with Items ──────────────────────────────────────────────
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbf6_0%,#eef4ea_100%)] py-10 md:py-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="absolute -right-20 bottom-16 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <Container>
        {cartError ? (
          <div className="relative z-10 mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {cartError}
          </div>
        ) : null}

        {/* Header */}
        <div className="relative z-10 mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p
              className={`${openSans.className} text-xs uppercase tracking-[0.2em] text-[#2d7d53]`}
            >
              Shopping Cart
            </p>
            <h1
              className={`${arapey.className} text-4xl md:text-5xl text-[#15261d] mt-2`}
            >
              Your Cart
            </h1>
            <p className={`${openSans.className} text-sm text-[#67756d] mt-2`}>
              {cartData?.summary?.items_count ?? cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"} from{" "}
              {groupedSellers.length} seller
              {groupedSellers.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm font-medium text-[#3d6b52] hover:text-[#00be62] transition-colors"
          >
            <BsArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          {/* ─── Cart Items ──────────────────────────────── */}
          <div className="grow space-y-6">
            {groupedSellers.map((sellerGroup, groupIndex) => {
              const sellerSubtotal = sellerGroup.items
                .reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
                .toFixed(2);
              const storeLink =
                sellerGroup.storeUrl ||
                (sellerGroup.sellerId > 0
                  ? `/sellerStore?sellerId=${sellerGroup.sellerId}`
                  : "/shop");

              return (
                <div
                  key={`${sellerGroup.sellerName}-${groupIndex}`}
                  className="rounded-3xl border border-emerald-100 bg-white/85 backdrop-blur-sm shadow-[0_18px_50px_-32px_rgba(16,40,26,0.3)]"
                >
                  <div className="flex flex-col gap-4 border-b border-emerald-100 bg-[linear-gradient(140deg,#f6fbf7_0%,#ecf5ef_100%)] px-5 py-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p
                        className={`${openSans.className} text-[11px] uppercase tracking-[0.22em] text-[#3a7f59]`}
                      >
                        Seller Store
                      </p>
                      <h2
                        className={`${inter.className} text-lg font-bold text-[#173024]`}
                      >
                        {sellerGroup.sellerName}
                      </h2>
                      <p
                        className={`${openSans.className} text-xs text-[#5f7268] mt-1`}
                      >
                        {sellerGroup.shopName}
                        {sellerGroup.location
                          ? ` • ${sellerGroup.location}`
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#3e6d55] shadow-sm">
                        {sellerGroup.items.length} item
                        {sellerGroup.items.length === 1 ? "" : "s"}
                      </div>
                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#158a54]">
                        Subtotal {currencySymbol}
                        {sellerSubtotal}
                      </div>
                      <Link
                        href={storeLink}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-[#2f7f54] hover:bg-emerald-50 transition"
                      >
                        Visit Store
                        <FiChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3 p-4 md:p-5">
                    {sellerGroup.items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`group bg-white/90 rounded-2xl border border-emerald-100 p-4 md:p-5 shadow-[0_8px_30px_-20px_rgba(16,40,26,0.2)] transition-all hover:shadow-[0_12px_40px_-20px_rgba(16,40,26,0.3)] hover:border-emerald-200 ${
                          deletingItemId === item.id
                            ? "opacity-50 scale-[0.98]"
                            : ""
                        }`}
                        style={{
                          animationDelay: `${index * 60}ms`,
                        }}
                      >
                        <div className="flex gap-4 md:gap-5">
                          <Link
                            href={`/productDetails/${item.product_id || ""}`}
                            className="shrink-0"
                          >
                            <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#f0f7f1] to-[#e4f0e6] rounded-2xl overflow-hidden border border-emerald-50 group-hover:border-emerald-100 transition-colors">
                              <img
                                src={getProductImage(item.product_image)}
                                alt={item.product_name}
                                onError={(event) => {
                                  event.currentTarget.src =
                                    "/plant-placeholder.png";
                                }}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </Link>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                              <div className="min-w-0 flex-1">
                                <Link
                                  href={`/productDetails/${item.product_id || ""}`}
                                >
                                  <h3
                                    className={`${inter.className} font-bold text-[#1a2b22] text-base md:text-lg truncate hover:text-[#00be62] transition-colors`}
                                  >
                                    {item.product_name}
                                  </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span
                                    className={`${openSans.className} text-xs text-[#8a9790] bg-[#f5f9f6] px-2.5 py-0.5 rounded-full`}
                                  >
                                    {item.size || "Standard"}
                                  </span>
                                  {item.in_stock === false ? (
                                    <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                      Out of Stock
                                    </span>
                                  ) : item.stock && item.stock < 5 ? (
                                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                      Only {item.stock} left
                                    </span>
                                  ) : null}
                                </div>

                                <p
                                  className={`${openSans.className} text-sm text-[#6b7c73] mt-1.5`}
                                >
                                  {currencySymbol}
                                  {item.unit_price}{" "}
                                  <span className="text-[#a9b5ae]">each</span>
                                </p>
                              </div>

                              <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3 mt-2 md:mt-0 shrink-0">
                                <p
                                  className={`${inter.className} text-lg md:text-xl font-bold ${item.in_stock === false ? 'text-[#a0aaa5] line-through' : 'text-[#1b2b22]'}`}
                                >
                                  {currencySymbol}
                                  {item.subtotal ?? parseFloat(
                                    (item.unit_price * item.quantity).toFixed(
                                      2,
                                    ),
                                  )}
                                </p>

                                <div className="flex items-center rounded-xl border border-emerald-100 bg-[#f8fbf8] overflow-hidden">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={
                                      updatingItemId === item.id ||
                                      item.quantity <= 1 ||
                                      item.in_stock === false
                                    }
                                    className="w-9 h-9 flex items-center justify-center text-[#6a766f] hover:text-[#00be62] hover:bg-emerald-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#6a766f]"
                                  >
                                    <FaMinus size={10} />
                                  </button>
                                  <span
                                    className={`${inter.className} w-9 text-center font-semibold text-[#1c2a22] text-sm select-none`}
                                  >
                                    {updatingItemId === item.id ? (
                                      <span className="inline-block w-3 h-3 border-2 border-emerald-200 border-t-[#00be62] rounded-full animate-spin" />
                                    ) : (
                                      item.quantity
                                    )}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    disabled={
                                      updatingItemId === item.id ||
                                      (item.stock &&
                                        item.quantity >= item.stock) ||
                                      item.in_stock === false
                                    }
                                    className="w-9 h-9 flex items-center justify-center text-[#6a766f] hover:text-[#00be62] hover:bg-emerald-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#6a766f]"
                                  >
                                    <FaPlus size={10} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              disabled={deletingItemId === item.id}
                              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#a0aaa5] hover:text-red-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              <BsTrash size={12} />
                              {deletingItemId === item.id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Order Summary — Right Side ───────────────── */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Summary Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-[0_24px_60px_-38px_rgba(16,40,26,0.4)] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#f5fcf7] to-[#edf7ef] px-6 py-5 border-b border-emerald-100">
                  <h2
                    className={`${inter.className} text-lg font-bold text-[#1a2b22]`}
                  >
                    Order Summary
                  </h2>
                  <p
                    className={`${openSans.className} text-xs text-[#6b7c73] mt-0.5`}
                  >
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"} in cart
                  </p>
                </div>

                {/* Breakdown */}
                <div className="px-6 py-5 space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span
                      className={`${openSans.className} text-sm text-[#66746d]`}
                    >
                      Subtotal
                    </span>
                    <span
                      className={`${inter.className} text-sm font-medium text-[#1c2a22]`}
                    >
                      {currencySymbol}
                      {subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`${openSans.className} text-sm text-[#66746d]`}
                    >
                      Shipping
                    </span>
                    <span
                      className={`${inter.className} text-sm font-medium text-[#1c2a22]`}
                    >
                      {currencySymbol}
                      {shipping}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`${openSans.className} text-sm text-[#66746d]`}
                    >
                      Tax
                    </span>
                    <span
                      className={`${openSans.className} text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full`}
                    >
                      Included
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-emerald-50 my-1" />

                  {/* Total */}
                  <div className="flex justify-between items-center pt-1">
                    <span
                      className={`${inter.className} text-base font-bold text-[#1b2c22]`}
                    >
                      Total
                    </span>
                    <span
                      className={`${inter.className} text-2xl font-bold text-[#00be62]`}
                    >
                      {currencySymbol}
                      {total}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Link
                    href="/checkout"
                    className="group flex items-center justify-center gap-2 w-full bg-[#00be62] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#00a757] shadow-[0_14px_30px_-18px_rgba(0,190,98,0.8)] transition-all active:scale-[0.97]"
                  >
                    Proceed to Checkout
                    <FiChevronRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 p-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#00be62]">
                      <FiTruck size={18} />
                    </div>
                    <span
                      className={`${openSans.className} text-[10px] font-semibold text-[#5f6f67] leading-tight`}
                    >
                      Free Delivery
                      <br />
                      <span className="font-normal text-[#8a9790]">
                        Over ৳3000
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                      <FiShield size={18} />
                    </div>
                    <span
                      className={`${openSans.className} text-[10px] font-semibold text-[#5f6f67] leading-tight`}
                    >
                      Plant Health
                      <br />
                      <span className="font-normal text-[#8a9790]">
                        Guaranteed
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                      <FiRefreshCw size={18} />
                    </div>
                    <span
                      className={`${openSans.className} text-[10px] font-semibold text-[#5f6f67] leading-tight`}
                    >
                      Easy Returns
                      <br />
                      <span className="font-normal text-[#8a9790]">7 Days</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment badge */}
              <div className="flex items-center justify-center gap-3 opacity-70 py-2">
                <img
                  src="/bkash.png"
                  className="h-5 grayscale"
                  alt="bKash"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="h-3 w-px bg-gray-300" />
                <span
                  className={`${openSans.className} text-[11px] text-[#8a9790]`}
                >
                  Secure Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
