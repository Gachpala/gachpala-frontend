"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/container";
import { inter, openSans } from "@/lib/fonts";
import { FaRegHeart } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { TbTruck, TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  cartReducer,
  addToFavorites,
  removeFromFavorites,
} from "@/app/slices/products_slices";
import axios from "axios";

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);

  const isFavorited = favorites?.some(
    (item) => String(item.id) === String(productId),
  );

  // 🔹 Fetch product
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://dummyjson.com/products/${productId}`,
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // 🔹 Reset "Added" state
  useEffect(() => {
    if (!isAddedToCart) return;
    const timer = setTimeout(() => setIsAddedToCart(false), 2000);
    return () => clearTimeout(timer);
  }, [isAddedToCart]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Product not found
      </div>
    );
  }

  const displayImages =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  // ✅ CART — uses cartReducer (your slice)
  const handleAddToCart = () => {
    dispatch(
      cartReducer({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity,
        image: product.thumbnail,
        size: selectedSize,
      }),
    );
    setIsAddedToCart(true);
  };

  // ✅ FAVORITES — matches slice
  const handleAddToFavorites = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(
        addToFavorites({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.thumbnail,
        }),
      );
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white py-4 mb-6">
        <Container>
          <p className={`${openSans.className} text-gray-600 text-sm`}>
            Home / <span className="text-gray-400">{product.title}</span>
          </p>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {/* Thumbnails */}
          <div className="md:col-span-2 flex md:flex-col gap-3 max-h-[500px] overflow-y-auto">
            {displayImages.slice(0, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-black" : "border-gray-200"
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

          {/* Main Image */}
          <div className="md:col-span-5 flex items-center justify-center bg-gray-100 rounded-lg min-h-[500px]">
            <img
              src={displayImages[selectedImage]}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h1 className={`${inter.className} text-3xl font-bold`}>
              {product.title}
            </h1>

            <p className="text-2xl font-bold">
              ${(product.price * quantity).toFixed(2)}
            </p>

            <p className="text-gray-700">{product.description}</p>

            {/* Size */}
            <div>
              <p className="font-medium mb-2">Size</p>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-4 items-center">
              <div className="flex border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4"
                >
                  −
                </button>
                <input
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-x"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`px-8 py-3 font-bold rounded ${
                  isAddedToCart
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {isAddedToCart ? "Added!" : "Buy Now"}
              </button>

              <button
                onClick={handleAddToFavorites}
                className="border p-3 rounded"
              >
                {isFavorited ? (
                  <IoHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-2xl" />
                )}
              </button>
            </div>

            {/* Delivery */}
            <div className="space-y-4">
              <div className="flex gap-3 border p-4 rounded">
                <TbTruck className="text-3xl text-gray-400" />
                <p className="font-bold">Free Delivery</p>
              </div>
              <div className="flex gap-3 border p-4 rounded">
                <TbRefresh className="text-3xl text-gray-400" />
                <p className="font-bold">30 Days Return</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
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
