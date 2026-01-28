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

export default function Product({ id, img, alt, title, price }) {
  const [isActive, setIsActive] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
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

    // Find the product in Redux to get all details
    const product = reduxProducts?.find((p) => p.id === id);

    if (product) {
      const newItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.thumbnail,
        size: "Standard",
      };
      dispatch(cartReducer(newItem));
      console.log("Added to cart:", title, "ID:", id);
    } else {
      const newItem = {
        id,
        name: title,
        price: parseFloat(price),
        quantity: 1,
        image: img,
        size: "Standard",
      };
      dispatch(cartReducer(newItem));
      console.log("Added to cart:", title, "ID:", id);
    }

    setIsCartAdded(true);
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();

    // Find the product in Redux to get all details
    const product = reduxProducts?.find((p) => p.id === id);

    if (isFavorited) {
      // Remove from favorites
      dispatch(removeFromFavorites(id));
      console.log("Removed from favorites:", title, "ID:", id);
    } else {
      // Add to favorites
      if (product) {
        const newItem = {
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.thumbnail,
        };
        dispatch(addToFavorites(newItem));
      } else {
        // Fallback if product not in Redux
        const newItem = {
          id,
          name: title,
          price: parseFloat(price),
          image: img,
        };
        dispatch(addToFavorites(newItem));
      }
      console.log("Added to favorites:", title, "ID:", id);
    }
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    window.location.href = `/productDetails?id=${id}`;
  };
  return (
    <div onClick={handleDetails} className=" relative ">
      <div
        onClick={handleCartButton}
        className="w-fit bg-[#EBEEE3] 2xl:px-11 xl:px-4 lg:px-2 md:px-2 px-1 2xl:py-[90.5px] xl:py-12 lg:py-8 md:py-10 py-6 select-none rounded-xl group relative"
      >
        <img
          src={img}
          alt={alt}
          className="mx-auto 2xl:w-auto xl:w-[80%] lg:w-[70%] md:w-[60%] w-[60%]"
        />

        <button
          onClick={handleAddToCart}
          className={`${openSans.className} w-fit font-medium 2xl:text-[16px] xl:text-[14px] lg:text-[12px] md:text-[12px] text-[10px] flex justify-center items-center gap-1
             absolute left-[50%] translate-x-[-50%] bottom-4 cursor-pointer transition-colors duration-300 ${
               isCartAdded ? "text-green-500" : "text-current"
             }`}
        >
          Add to cart <BiPlus />
        </button>
      </div>

      <div className="mt-3 md:mt-4 text-left">
        <h3
          className={`${inter.className} text-sm md:text-xl text-gray-900 font-medium line-clamp-1`}
        >
          {title}
        </h3>

        <p
          className={`${openSans.className} font-normal
          2xl:text-[19.5px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px]
          text-[#00bf63]`}
        >
          $ {price}
        </p>
      </div>
      <div className=" p-1.5 bg-white w-fit rounded-full absolute right-2 top-2 ">
        <button
          onClick={handleAddToFavorites}
          className="flex items-center justify-center cursor-pointer"
        >
          {isFavorited ? (
            <IoHeart className="text-[18px] text-red-500" />
          ) : (
            <FaRegHeart className="text-[18px] text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
