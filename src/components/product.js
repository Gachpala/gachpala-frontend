"use client";
import { useState, useEffect } from "react";
import { inter, openSans } from "@/lib/fonts";
import { FaRegHeart } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  cartReducer,
  addToFavorites,
  removeFromFavorites,
} from "@/app/slices/products_slices";
import { BiPlus } from "react-icons/bi";

export default function Product({
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
}) {
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
  const imageContainerClass = `relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center ${
    isPlaceholder ? "bg-gray-50" : "bg-gray-100"
  }`;

  return (
    <div
      onClick={handleDetails}
      className="relative bg-white rounded-2xl shadow group border border-gray-100 flex flex-col cursor-pointer min-h-[370px] h-full w-full hover:shadow-lg transition-all duration-200"
    >
      {/* Favorite icon */}
      <button
        onClick={handleAddToFavorites}
        className="absolute right-3 top-3 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        tabIndex={-1}
      >
        {isFavorited ? (
          <IoHeart className="text-[22px] text-red-500" />
        ) : (
          <FaRegHeart className="text-[22px] text-gray-400" />
        )}
      </button>

      {/* Image */}
      <div className={imageContainerClass}>
        <img
          src={imageSrc}
          alt={alt}
          onError={handleImgError}
          className={`${isPlaceholder ? "w-[80px] h-[80px] object-contain opacity-90" : "w-full h-full object-cover"} group-hover:scale-105 transition-transform duration-300`}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col px-4 py-3 gap-1">
        <h3
          className={`${inter.className} text-base font-semibold text-gray-900 mb-0 line-clamp-1`}
        >
          {title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px] mb-1">
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-green-600">Tk {price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold shadow hover:bg-green-700 transition-colors"
          >
            <BiPlus className="text-base" />
            <span className="hidden sm:inline">Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
