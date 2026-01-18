"use client";
import Container from "@/components/container";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
  // Mock Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 1200,
      quantity: 1,
      image: "/indoor5.jpg",
      size: "Medium",
    },
    {
      id: 2,
      name: "Gardening Trowel",
      price: 450,
      quantity: 2,
      image: "/tools2.jpg",
      size: "Standard",
    },
    {
      id: 3,
      name: "Ceramic Pot - White",
      price: 800,
      quantity: 1,
      image: "/b3.gif", // Using placeholder available in context
      size: "Large",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 100;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen py-20">
        <Container>
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl">
              <BsTrash />
            </div>
            <h2 className={`${inter.className} text-3xl font-bold text-gray-900 mb-4`}>
              Your Cart is Empty
            </h2>
            <p className={`${openSans.className} text-gray-500 mb-8`}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">
      <Container>
        <h1 className={`${inter.className} text-3xl font-bold text-gray-900 mb-8`}>
          Shopping Cart ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List - Left Side */}
          <div className="flex-grow">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Header - Hidden on Mobile */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className={`${inter.className} font-bold text-gray-900 text-lg`}>
                          {item.name}
                        </h3>
                        <p className={`${openSans.className} text-sm text-gray-500`}>
                          Size: {item.size}
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
                      <span className="md:hidden text-gray-500 font-medium">Price:</span>
                      <span className={`${inter.className} font-medium text-gray-900`}>
                        ৳{item.price}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-12 md:col-span-2 flex justify-between md:justify-center items-center">
                       <span className="md:hidden text-gray-500 font-medium">Quantity:</span>
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete Desktop */}
                    <div className="col-span-12 md:col-span-2 flex justify-between md:justify-end items-center gap-4">
                      <span className="md:hidden text-gray-500 font-medium">Total:</span>
                      <span className={`${inter.className} font-bold text-green-600`}>
                        ৳{item.price * item.quantity}
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
               <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                   <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors">
                       <BsArrowLeft /> Continue Shopping
                   </Link>
               </div>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-24">
              <h2 className={`${inter.className} text-xl font-bold text-gray-900 mb-6`}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-gray-900">৳{shipping}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax Estimate</span>
                  <span className="font-medium text-gray-900">৳0</span>
                </div>
                
                 {/* Coupon Code Input */}
                <div className="pt-4">
                     <div className="flex gap-2">
                         <input type="text" placeholder="Promo code" className="flex-grow bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 transition-colors" />
                         <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Apply</button>
                     </div>
                </div>
                
                <div className="border-t border-gray-100 my-4 pt-4 flex justify-between items-center">
                  <span className={`${inter.className} text-lg font-bold text-gray-900`}>Order Total</span>
                  <span className={`${inter.className} text-xl font-bold text-green-600`}>৳{total}</span>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all transform active:scale-95">
                Proceed to Checkout
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 opacity-60 grayscale">
                 <img src="/bkash.png" className="h-6" alt="Payment" onError={(e) => e.target.style.display='none'}/>
                 <span className="text-xs text-gray-400">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
