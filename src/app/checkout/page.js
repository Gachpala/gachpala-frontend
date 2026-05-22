"use client";

import Container from "@/components/container";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY } from "@/lib/authGate";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { BsArrowLeft, BsCheckCircleFill } from "react-icons/bs";

const CART_UPDATED_EVENT = "gachpala:cart-updated";

export default function CheckoutPage() {
  const [cartData, setCartData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [placedOrderItems, setPlacedOrderItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setCartData(data);
      } catch (err) {
        setError("Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const cartItems = useMemo(() => cartData?.items || [], [cartData]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0,
  );

  const shipping = cartItems.length ? 100 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return;

    try {
      setIsPlacingOrder(true);

      const payload = {
        shipping_address_id: Number(selectedAddressId),
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Order failed");

      // Save ordered items for UI
      setPlacedOrderItems(
        cartItems.map((item) => ({
          productId: item.product_id,
          name: item.product_name,
          image: item.product_image,
        })),
      );

      // Clear cart UI
      setCartData({ items: [] });

      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(
        new CustomEvent(CART_UPDATED_EVENT, { detail: { count: 0 } }),
      );

      setShowOrderSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const getProductImage = (path) => {
    if (!path) return "/plant-placeholder.png";
    return `${API_BASE_URL}/${path}`;
  };

  // ✅ SUCCESS SCREEN
  if (showOrderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6faf5] p-6">
        <div className="bg-white rounded-3xl p-10 text-center shadow-xl max-w-xl w-full">
          <BsCheckCircleFill className="text-6xl text-green-500 mx-auto mb-4" />

          <h1 className="text-3xl font-bold mb-2">Thank You For Your Order</h1>

          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>

          <div className="space-y-3 mb-6">
            {placedOrderItems.map((item) => (
              <div key={item.productId} className="flex gap-3 items-center">
                <Image
                  src={getProductImage(item.image)}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              href="/shop"
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Continue Shopping
            </Link>
            <Link href="/profile" className="border px-6 py-2 rounded-lg">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ NORMAL CHECKOUT UI
  return (
    <div className="min-h-screen bg-[#f6faf5] py-10">
      <Container>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handlePlaceOrder}>
          <div className="mb-6">
            <h2 className="font-bold mb-2">Select Address ID (demo)</h2>
            <input
              value={selectedAddressId}
              onChange={(e) => setSelectedAddressId(e.target.value)}
              className="border p-2 rounded"
              placeholder="Enter Address ID"
            />
          </div>

          <div className="mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.product_name}</span>
                <span>
                  ৳{item.unit_price} x {item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p>Subtotal: ৳{subtotal}</p>
            <p>Shipping: ৳{shipping}</p>
            <p className="font-bold">Total: ৳{total}</p>
          </div>

          <button
            type="submit"
            disabled={isPlacingOrder}
            className="bg-green-500 text-white px-6 py-3 rounded-lg"
          >
            {isPlacingOrder ? "Placing..." : "Place Order"}
          </button>
        </form>

        <Link href="/cart" className="block mt-4 text-gray-600">
          <BsArrowLeft /> Back to Cart
        </Link>
      </Container>
    </div>
  );
}
