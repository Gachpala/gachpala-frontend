"use client";
import Container from "@/components/container";
import Product from "@/components/product";
import ProductSkeleton from "@/components/productSkeleton";
import { inter, interSec } from "@/lib/fonts";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/app/config";
import { AUTH_TOKEN_KEY } from "@/lib/authGate";

export default function Favourite() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistError, setWishlistError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setWishlistItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setWishlistError("");

        const response = await fetch(`${API_BASE_URL}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();
        let data = [];

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = [];
          }
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              `Failed to load wishlist (${response.status})`,
          );
        }

        const rows = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.products)
              ? data.products
              : [];

        setWishlistItems(rows);
      } catch (error) {
        setWishlistError(error?.message || "Unable to load wishlist.");
        setWishlistItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <section>
      {/* Header Banner */}
      <div className=" bg-[#ebeee3] p-18 mb-[130px] ">
        <Container>
          <div className=" bg-[#ebeee3]  ">
            <p
              className={`${inter.className} text-xl font-bold text-gray-800 mb-2`}
            >
              Wishlist
            </p>
            <p className={` ${interSec.className} text-md `}>
              home / <span className="text-gray-600">wishlist</span>
            </p>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <Container>
        {wishlistError ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {wishlistError}
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-20">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-20">
            {wishlistItems.map((product) => (
              <Product
                key={product.product_id || product.id}
                id={product.product_id || product.id}
                img={
                  product.product_image || product.image || product.thumbnail
                }
                alt={product.product_name || product.name || "Wishlist product"}
                title={product.product_name || product.name}
                price={`${product.unit_price || product.price || 0}`}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 mb-20">
            <p
              className={`${inter.className} text-2xl font-bold text-gray-800 mb-4`}
            >
              No Favourites Yet
            </p>
            <p
              className={`${interSec.className} text-gray-600 text-center max-w-md`}
            >
              Start adding your favourite plants to this collection. They will
              appear here for easy access.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
