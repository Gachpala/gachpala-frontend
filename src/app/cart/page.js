"use client";
import Container from "@/components/container";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React from "react";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
} from "@/app/slices/products_slices";

export default function Cart() {
  const cartItems = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const updateQuantity = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(updateCartQuantity({ id, quantity: item.quantity + change }));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = parseFloat(
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2),
  );
  const shipping = 100;
  const total = parseFloat((subtotal + shipping).toFixed(2));

  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7faf4_0%,#eff4ea_100%)] py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#00be62]/15 blur-3xl" />
          <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <Container>
          <div className="relative z-10 bg-white/85 backdrop-blur-sm rounded-4xl border border-emerald-100 shadow-[0_30px_70px_-38px_rgba(16,40,26,0.45)] p-10 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-[#00be62]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00be62] text-4xl">
              <BsTrash />
            </div>
            <h2
              className={`${inter.className} text-3xl font-bold text-[#1c2c22] mb-4`}
            >
              Your Cart is Empty
            </h2>
            <p className={`${openSans.className} text-[#607066] mb-8`}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#00be62] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#00a757] transition-colors"
            >
              Start Shopping
            </Link>
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
            Shopping Cart ({cartItems.length})
          </h1>
          <p className={`${openSans.className} text-sm text-[#67756d] mt-2`}>
            Review your selected plants and complete your order.
          </p>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          {/* Cart Items List - Left Side */}
          <div className="grow">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-[0_24px_60px_-38px_rgba(16,40,26,0.4)] overflow-hidden">
              {/* Header - Hidden on Mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-emerald-50 text-[11px] font-semibold text-[#6a786f] uppercase tracking-[0.16em]">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-emerald-50">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-[#eef4ed] rounded-xl overflow-hidden shrink-0 border border-emerald-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3
                          className={`${inter.className} font-bold text-[#1a2b22] text-lg`}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={`${openSans.className} text-sm text-[#6c7a72]`}
                        >
                          Size: {item.size || "Standard"}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm mt-2 flex items-center gap-1 hover:text-red-700 transition-colors md:hidden"
                        >
                          <BsTrash /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-12 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-[#6f7b74] font-medium">
                        Price:
                      </span>
                      <span
                        className={`${inter.className} font-medium text-[#1d2c24]`}
                      >
                        ৳{item.price}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-12 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-[#6f7b74] font-medium">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-emerald-100 rounded-xl bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6a766f] hover:text-[#00be62] hover:bg-emerald-50 rounded-l-xl transition-colors"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="w-8 text-center font-medium text-[#1c2a22] text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6a766f] hover:text-[#00be62] hover:bg-emerald-50 rounded-r-xl transition-colors"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete Desktop */}
                    <div className="col-span-12 md:col-span-2 flex justify-between md:justify-end items-center gap-4">
                      <span className="md:hidden text-[#6f7b74] font-medium">
                        Total:
                      </span>
                      <span
                        className={`${inter.className} font-bold text-[#00be62]`}
                      >
                        ৳{parseFloat((item.price * item.quantity).toFixed(2))}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors hidden md:block"
                        title="Remove Item"
                      >
                        <BsTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="p-6 bg-[#f8fbf7] border-t border-emerald-50 flex justify-between items-center">
                <Link
                  href="/shop"
                  className="flex items-center gap-2 text-[#5f6f67] hover:text-[#00be62] font-medium transition-colors"
                >
                  <BsArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-[0_24px_60px_-38px_rgba(16,40,26,0.4)] p-6 lg:sticky lg:top-24">
              <h2
                className={`${inter.className} text-xl font-bold text-[#1a2b22] mb-6`}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#66746d]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1c2a22]">
                    ৳{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#66746d]">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-[#1c2a22]">
                    ৳{shipping}
                  </span>
                </div>
                <div className="flex justify-between text-[#66746d]">
                  <span>Tax Estimate</span>
                  <span className="font-medium text-[#1c2a22]">৳0</span>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="grow bg-[#f6faf5] border border-emerald-100 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#00be62] transition-colors"
                    />
                    <button className="bg-[#1d2f24] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#122016] transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="border-t border-emerald-50 my-4 pt-4 flex justify-between items-center">
                  <span
                    className={`${inter.className} text-lg font-bold text-[#1b2c22]`}
                  >
                    Order Total
                  </span>
                  <span
                    className={`${inter.className} text-xl font-bold text-[#00be62]`}
                  >
                    ৳{total}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#00be62] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#00a757] shadow-lg shadow-emerald-600/25 transition-all transform active:scale-95">
                Proceed to Checkout
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-60 grayscale">
                <img
                  src="/bkash.png"
                  className="h-6"
                  alt="Payment"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <span className="text-xs text-gray-400">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
