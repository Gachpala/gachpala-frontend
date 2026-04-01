"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartReducer,
  addToFavorites,
  removeFromFavorites,
} from "@/app/slices/products_slices";

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
  className
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [usePlaceholder, setUsePlaceholder] = useState(!img);
  const dispatch = useDispatch();
  const reduxProducts = useSelector((state) => state.products.product);
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

  const handleCartButton = () => {
    setIsActive((prev) => !prev);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Use props directly for cart item
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
    console.log("Added to cart:", title, "ID:", id);

    setIsCartAdded(true);
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();

    if (isFavorited) {
      // Remove from favorites
      dispatch(removeFromFavorites(id));
      console.log("Removed from favorites:", title, "ID:", id);
    } else {
      // Add to favorites using props
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
      console.log("Added to favorites:", title, "ID:", id);
    }
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    window.location.href = `/productDetails?id=${id}`;
  };
  const placeholder = "/plant-placeholder.png";
  // Choose src based on whether we should force placeholder
  let imageSrc = usePlaceholder ? placeholder : img;
  // Prepend base URL only for real product images that are relative
  if (!usePlaceholder && imageSrc && imageSrc.startsWith("/")) {
    imageSrc = `https://api.gachpala.com${imageSrc}`;
  }
  const isPlaceholder = usePlaceholder;

  const handleImgError = () => {
    if (!usePlaceholder) {
      setUsePlaceholder(true);
    }
  };
  const imageContainerClass = `relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center ${isPlaceholder ? "bg-gray-50" : "bg-gray-100"
    }`;

  const textShorter = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };



  return (
    <div className={` group w-75 h-100 max-w-[420px] bg-[#f8f8f8] rounded-2xl p-4  shadow-xl transition-all duration-300 z-10 relative ${className} `}>
      {/* Image & Badges Section */}
      <div className="relative bg-[#ebebeb] rounded-2xl flex flex-col justify-between overflow-hidden">
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 z-50 bg-[#00be62] text-white rounded-full w-12 h-12 flex flex-col items-center justify-center
         text-sm font-bold leading-tight shadow-sm">
          <span>15%</span>
          <span>OFF</span>
        </div>

        {/* Cutout Price Corner */}
        <div className="absolute top-0 right-0 z-50 bg-[#f8f8f8] rounded-bl-[2.5rem] px-5 py-5">
          {/* FIX: Added `relative z-10` here. 
              This forces the text to sit ABOVE the shadows cast by the corner helpers below. 
            */}
          <div className="relative z-10 text-xl font-medium text-[#2b2b2b]">
            {price} <span className=" text-sm text-[#00be62] " >BDT</span>
          </div>

          {/* Smooth Curve - Top Left */}
          <div className="absolute top-0 -left-8 w-8 h-8 bg-transparent rounded-tr-[2rem] shadow-[1rem_-1rem_0_1rem_#f8f8f8] pointer-events-none "></div>

          {/* Smooth Curve - Bottom Right */}
          <div className="absolute -bottom-8 right-0 w-8 h-8 bg-transparent rounded-tr-[2rem] shadow-[1rem_-1rem_0_1rem_#f8f8f8] pointer-events-none "></div>
        </div>

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={imageSrc}
            alt={alt}
            onError={(e) => {
              e.target.src = "/plant-placeholder.png";
            }}
            className="w-full h-50 object-cover rounded-xl drop-shadow-2xl scale-100 group-hover:scale-105 duration-300 ease-out "
          />
        </div>
      </div>

      <div className="pt-2 px-3">
        <div className="flex justify-between items-end mb-1 ">
          <h2 className="text-2xl font-medium text-black tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Add to wishlist"
            className="text-black hover:text-[#c00000] hover:bg-gray-100 p-1.5 rounded-full transition-colors shrink-0 mb-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:fill-[#c00000]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-800 text-md leading-snug mb-4 pr-4">
          {textShorter(description, 55)}
        </p>

        {/* Stock Info */}
        <div className="text-black text-sm">
          <span className="font-semibold">Available Stock:</span> {stock}
        </div>
      </div>
      <div className="absolute left-0 -bottom-5 w-full h-14">
        <button
          type="button"
          className="w-full h-full bg-[#00be62] text-white font-semibold text-lg py-3 rounded-b-2xl transition-colors shadow-md flex items-center justify-center
           hover:bg-green-600 duration-400 ease-in-out "
        >
          Add to Cart
        </button>
      </div>
      <div className=" w-7 h-7 bg-[#f8f9f9] absolute top-2 right-2 " > </div>
    </div>
  );
};

export default ProductCard;
