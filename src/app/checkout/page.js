"use client";

import Container from "@/components/container";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY, isAuthenticated, openAuthModal } from "@/lib/authGate";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BsArrowLeft, BsCheckCircleFill } from "react-icons/bs";

const CART_UPDATED_EVENT = "gachpala:cart-updated";

export default function CheckoutPage() {
  const router = useRouter();

  // ── Route guard: redirect unauthenticated users ──
  useEffect(() => {
    if (!isAuthenticated()) {
      openAuthModal("checkout");
      router.replace("/");
    }
  }, [router]);

  const [cartData, setCartData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressLoading, setIsAddressLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState("");
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [discountCodes, setDiscountCodes] = useState([]);
  const [loadVersion, setLoadVersion] = useState(0);

  const paymentMethod = "COD";

  useEffect(() => {
    const fetchCart = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setError("Please sign in to continue with checkout.");
        setCartData({ items: [], summary: { subtotal: 0, currency: "BDT" } });
        setAddresses([]);
        setIsAddressLoading(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const [cartResponse, addressesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/cart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_BASE_URL}/addresses`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const cartText = await cartResponse.text();
        let cartPayload = {};

        if (cartText) {
          try {
            cartPayload = JSON.parse(cartText);
          } catch {
            cartPayload = {};
          }
        }

        if (!cartResponse.ok) {
          throw new Error(
            cartPayload?.message ||
              cartPayload?.error ||
              `Failed to load cart (${cartResponse.status})`,
          );
        }

        const addressesText = await addressesResponse.text();
        let addressesPayload = {};

        if (addressesText) {
          try {
            addressesPayload = JSON.parse(addressesText);
          } catch {
            addressesPayload = {};
          }
        }

        if (!addressesResponse.ok) {
          throw new Error(
            addressesPayload?.message ||
              addressesPayload?.error ||
              `Failed to load addresses (${addressesResponse.status})`,
          );
        }

        const fetchedAddresses = Array.isArray(addressesPayload)
          ? addressesPayload
          : Array.isArray(addressesPayload?.addresses)
            ? addressesPayload.addresses
            : [];
        const defaultAddress = fetchedAddresses.find((row) => row?.is_default);

        setCartData(cartPayload);
        setAddresses(fetchedAddresses);
        setSelectedAddressId(
          String(defaultAddress?.id ?? fetchedAddresses?.[0]?.id ?? ""),
        );

        if (!fetchedAddresses.length) {
          setCheckoutMessage(
            "No address added. Please add one from your profile.",
          );
        } else {
          setCheckoutMessage("");
        }
      } catch (fetchError) {
        setError(fetchError?.message || "Unable to load checkout details.");
        setCartData({ items: [], summary: { subtotal: 0, currency: "BDT" } });
        setAddresses([]);
      } finally {
        setIsAddressLoading(false);
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [loadVersion]);

  const cartItems = useMemo(() => cartData?.items || [], [cartData]);

  const subtotal = parseFloat(
    cartItems
      .reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
      .toFixed(2),
  );
  const shipping = cartItems.length ? 100 : 0;
  const total = parseFloat((subtotal + shipping).toFixed(2));
  const canPlaceOrder =
    !isPlacingOrder && cartItems.length > 0 && Boolean(selectedAddressId);

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

  const handleAddDiscountCode = () => {
    const normalizedCode = discountCodeInput.trim().toUpperCase();
    if (!normalizedCode) {
      setCheckoutMessage("Enter a discount code before adding.");
      return;
    }

    if (normalizedCode.length > 40) {
      setCheckoutMessage("Discount code looks too long.");
      return;
    }

    setDiscountCodes((prev) => {
      if (prev.includes(normalizedCode)) return prev;
      return [...prev, normalizedCode];
    });
    setCheckoutMessage("");
    setDiscountCodeInput("");
  };

  const handleRemoveDiscountCode = (code) => {
    setDiscountCodes((prev) => prev.filter((item) => item !== code));
  };

  const getAddressText = (address) => {
    if (!address) return "";

    return [
      address.street,
      address.area,
      address.city,
      address.state,
      address.postal_code,
      address.country,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const clearCart = async (token) => {
    const clearMethods = ["POST", "DELETE"];

    for (const method of clearMethods) {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) return true;
    }

    return false;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!cartItems.length) {
      setCheckoutMessage(
        "Your cart is empty. Add products before placing an order.",
      );
      return;
    }

    if (!selectedAddressId) {
      setCheckoutMessage("Please select a delivery address.");
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setCheckoutMessage("Please sign in to place an order.");
      return;
    }

    const selectedAddressNumericId = Number(selectedAddressId);
    const hasMatchingAddress = addresses.some(
      (address) => Number(address?.id) === selectedAddressNumericId,
    );

    if (
      !Number.isFinite(selectedAddressNumericId) ||
      selectedAddressNumericId <= 0 ||
      !hasMatchingAddress
    ) {
      setCheckoutMessage(
        "Selected address is invalid. Please pick another one.",
      );
      return;
    }

    const items = cartItems
      .map((item) => ({
        product_id: Number(item?.product_id ?? item?.product?.id ?? item?.id),
        quantity: Number(item?.quantity ?? 0),
      }))
      .filter(
        (item) =>
          Number.isFinite(item.product_id) &&
          item.product_id > 0 &&
          item.quantity > 0,
      );

    if (!items.length) {
      setCheckoutMessage("Could not build order items from cart data.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setCheckoutMessage("");

      const primaryPromoCode = discountCodes.length ? discountCodes[0] : null;
      const payload = {
        shipping_address_id: selectedAddressNumericId,
        ...(primaryPromoCode ? { promo_code: primaryPromoCode } : {}),
        items,
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Order creation failed (${response.status})`,
        );
      }

      await clearCart(token);

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(
          new CustomEvent(CART_UPDATED_EVENT, {
            detail: { count: 0 },
          }),
        );
      }

      setCartData((prev) => ({
        ...prev,
        items: [],
        summary: {
          ...(prev?.summary || {}),
          subtotal: 0,
          items_count: 0,
        },
      }));

      setOrderSuccessMessage(data?.message || "Order placed successfully.");
      setShowOrderSuccess(true);
      setCheckoutMessage("");
      setDiscountCodes([]);
      setDiscountCodeInput("");
    } catch (submitError) {
      setCheckoutMessage(submitError?.message || "Unable to place order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbf6_0%,#eef4ea_100%)] py-10 md:py-14">
        <Container>
          <div className="bg-white/85 rounded-3xl border border-emerald-100 p-8 max-w-4xl mx-auto animate-pulse">
            <div className="h-7 w-48 bg-emerald-100 rounded mb-4" />
            <div className="h-4 w-72 bg-emerald-100 rounded mb-8" />
            <div className="h-32 w-full bg-emerald-50 rounded-xl mb-4" />
            <div className="h-32 w-full bg-emerald-50 rounded-xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (showOrderSuccess) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#d8ffe8_0%,#eef8f1_40%,#f7fbf8_100%)] py-10 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[8%] top-[18%] h-4 w-4 rounded-full bg-emerald-400/40 animate-bounce" />
          <div className="absolute left-[24%] top-[10%] h-3 w-3 rounded-full bg-lime-400/40 animate-pulse" />
          <div className="absolute right-[15%] top-[22%] h-5 w-5 rounded-full bg-teal-400/35 animate-bounce [animation-delay:180ms]" />
          <div className="absolute right-[22%] bottom-[24%] h-4 w-4 rounded-full bg-green-400/35 animate-pulse [animation-delay:260ms]" />
          <div className="absolute left-[18%] bottom-[18%] h-3 w-3 rounded-full bg-emerald-300/35 animate-bounce [animation-delay:320ms]" />
        </div>

        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-4xl border border-emerald-100 bg-white/90 backdrop-blur-sm px-6 py-12 md:px-10 md:py-14 shadow-[0_30px_90px_-38px_rgba(16,40,26,0.45)] text-center overflow-hidden">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full bg-emerald-200/30 blur-2xl" />

              <div className="relative mx-auto mb-6 w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-300/60 animate-ping" />
                <BsCheckCircleFill className="relative text-5xl text-[#00be62]" />
              </div>

              <p
                className={`${openSans.className} text-xs uppercase tracking-[0.2em] text-[#2d7d53]`}
              >
                Order Confirmed
              </p>
              <h1
                className={`${inter.className} text-3xl md:text-4xl font-bold text-[#173026] mt-3`}
              >
                Thank You For Your Order
              </h1>
              <p
                className={`${openSans.className} text-[#5f6f67] mt-4 max-w-xl mx-auto`}
              >
                {orderSuccessMessage ||
                  "Your order has been placed successfully."}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto bg-[#00be62] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#00a757] transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/profile"
                  className="w-full sm:w-auto border border-emerald-200 text-[#365646] px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
                >
                  View Orders
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbf6_0%,#eef4ea_100%)] py-10 md:py-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#00be62]/12 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 mb-8 md:mb-10">
          <p
            className={`${openSans.className} text-xs uppercase tracking-[0.18em] text-[#2d7d53]`}
          >
            Checkout
          </p>
          <h1
            className={`${inter.className} text-3xl md:text-4xl font-bold text-[#15261d] mt-2`}
          >
            Complete Your Order
          </h1>
          <p className={`${openSans.className} text-sm text-[#67756d] mt-2`}>
            Select your delivery address and confirm your order.
          </p>
        </div>

        {error ? (
          <div className="relative z-10 mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <button
              type="button"
              onClick={() => setLoadVersion((prev) => prev + 1)}
              className="ml-3 rounded-md border border-red-300 px-2 py-1 text-xs font-semibold hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        ) : null}

        {checkoutMessage ? (
          <div
            className="relative z-10 mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            role="status"
            aria-live="polite"
          >
            {checkoutMessage}
          </div>
        ) : null}

        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          <form
            id="checkout-form"
            onSubmit={handlePlaceOrder}
            className="grow bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-[0_24px_60px_-38px_rgba(16,40,26,0.4)] p-6 md:p-8"
          >
            <h2
              className={`${inter.className} text-2xl font-bold text-[#1a2b22] mb-6`}
            >
              Delivery Address
            </h2>

            {isAddressLoading ? (
              <div className="space-y-3 mb-6">
                <div className="h-20 rounded-xl bg-emerald-50 animate-pulse" />
                <div className="h-20 rounded-xl bg-emerald-50 animate-pulse" />
              </div>
            ) : addresses.length ? (
              <div className="space-y-3 mb-6">
                {addresses.map((address) => {
                  const isSelected = String(address?.id) === selectedAddressId;
                  return (
                    <label
                      key={address.id}
                      className={`cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-colors ${
                        isSelected
                          ? "border-[#00be62] bg-emerald-50"
                          : "border-emerald-100 bg-[#f7fbf6]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={String(address.id)}
                        checked={isSelected}
                        onChange={(event) =>
                          setSelectedAddressId(event.currentTarget.value)
                        }
                        className="mt-1"
                      />
                      <div className="text-sm text-[#2d3a33] leading-6">
                        <p className="font-bold text-[#1f3028]">
                          {address.address_type || "Address"}
                          {address.is_default ? " (Default)" : ""}
                        </p>
                        {address.phone ? (
                          <p className="text-[#51625a]">
                            Phone: {address.phone}
                          </p>
                        ) : null}
                        <p>
                          {[address.street, address.area, address.city]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        <p>
                          {[address.state, address.postal_code, address.country]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                No address added. Please add one from your profile.
              </div>
            )}

            <Link
              href="/profile"
              className="inline-flex mb-8 text-sm font-semibold text-[#2d7d53] hover:text-[#00be62] transition-colors"
            >
              Manage addresses in profile
            </Link>

            <div className="mt-8">
              <h3
                className={`${inter.className} text-lg font-bold text-[#1a2b22] mb-4`}
              >
                Discount Code
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={discountCodeInput}
                  maxLength={40}
                  onChange={(event) =>
                    setDiscountCodeInput(event.currentTarget.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddDiscountCode();
                    }
                  }}
                  className="w-full bg-[#f6faf5] border border-emerald-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00be62] transition-colors"
                  placeholder="Enter code (e.g. EIDSPACIAL20)"
                />
                <button
                  type="button"
                  onClick={handleAddDiscountCode}
                  className="shrink-0 px-6 py-3 rounded-xl border border-emerald-200 text-[#2b5f46] font-semibold hover:bg-emerald-50 transition-colors"
                >
                  Add Code
                </button>
              </div>

              {discountCodes.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {discountCodes.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleRemoveDiscountCode(code)}
                      className="px-3 py-1.5 rounded-full bg-emerald-100 text-[#24543e] text-xs font-semibold hover:bg-emerald-200 transition-colors"
                      title="Remove code"
                    >
                      {code} x
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              <h3
                className={`${inter.className} text-lg font-bold text-[#1a2b22] mb-4`}
              >
                Payment Method
              </h3>
              <div className="rounded-xl border border-emerald-100 bg-[#f7fbf6] p-4">
                <p className="text-sm text-[#2d3a33]">
                  <strong>Cash on Delivery (COD)</strong>
                  <br />
                  Pay when the order arrives.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!canPlaceOrder}
                className="w-full sm:w-auto bg-[#00be62] text-white px-7 py-3 rounded-xl font-bold hover:bg-[#00a757] shadow-lg shadow-emerald-600/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>

              <Link
                href="/cart"
                className="w-full sm:w-auto text-center border border-emerald-200 text-[#415147] px-7 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                Back to Cart
              </Link>
            </div>
          </form>

          <aside className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-[0_24px_60px_-38px_rgba(16,40,26,0.4)] p-6 lg:sticky lg:top-24">
              <h2
                className={`${inter.className} text-xl font-bold text-[#1a2b22] mb-6`}
              >
                Your Order
              </h2>

              {cartItems.length ? (
                <div className="space-y-4 max-h-72 overflow-auto pr-1 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-[#eef4ed] rounded-lg overflow-hidden shrink-0 border border-emerald-50">
                        <Image
                          src={getProductImage(item.product_image)}
                          alt={item.product_name}
                          width={56}
                          height={56}
                          unoptimized
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="grow min-w-0">
                        <p className="text-sm font-semibold text-[#1a2b22] truncate">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-[#67756d]">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#1d2c24]">
                        {currencySymbol}
                        {parseFloat(
                          (item.unit_price * item.quantity).toFixed(2),
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#68756d] mb-6">
                  No items found in cart.
                </p>
              )}

              <div className="space-y-3 border-t border-emerald-50 pt-4">
                <div className="flex justify-between text-[#66746d] text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1c2a22]">
                    {currencySymbol}
                    {subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#66746d] text-sm">
                  <span>Shipping</span>
                  <span className="font-medium text-[#1c2a22]">
                    {currencySymbol}
                    {shipping}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-emerald-50 pt-3">
                  <span
                    className={`${inter.className} text-base font-bold text-[#1b2c22]`}
                  >
                    Total
                  </span>
                  <span
                    className={`${inter.className} text-xl font-bold text-[#00be62]`}
                  >
                    {currencySymbol}
                    {total}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-emerald-100 bg-[#f7fbf6] p-3 text-xs text-[#4e5f56] leading-5">
                <p>Estimated delivery: 2-4 business days.</p>
                <p>Easy return support for damaged plants on delivery day.</p>
                <p>Secure order processing with address verification.</p>
              </div>

              <Link
                href="/cart"
                className="mt-6 inline-flex items-center gap-2 text-[#5f6f67] hover:text-[#00be62] font-medium transition-colors"
              >
                <BsArrowLeft /> Edit cart items
              </Link>
            </div>

            {cartItems.length ? (
              <div className="fixed bottom-3 left-3 right-3 z-40 rounded-2xl border border-emerald-200 bg-white/95 p-3 shadow-xl backdrop-blur-sm lg:hidden">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#5b6c63]">Total</span>
                  <span className="font-bold text-[#00a757]">
                    {currencySymbol}
                    {total}
                  </span>
                </div>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={!canPlaceOrder}
                  className="w-full rounded-xl bg-[#00be62] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPlacingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
    </div>
  );
}
