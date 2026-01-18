"use client";
import { useEffect, useState } from "react";
import { inter, openSans } from "@/lib/fonts";
import { FaRegHeart } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";

export default function Product({ img, alt, title, price }) {
  const [isActive, setIsActive] = useState(false);

  const handleCartButton = () => {
    setIsActive((prev) => !prev);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Added to cart:", title);
  };

  return (
    <div className=" relative ">
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
          className={`${openSans.className} ${
            isActive
              ? "opacity-100 border-black text-black 2xl:bottom-8 xl:bottom-4 lg:bottom-2 md:bottom-4 bottom-[9px]"
              : "opacity-0 border-transparent"
          } w-fit font-medium 2xl:text-[12px] xl:text-[12px] lg:text-[12px] md:text-[12px] text-[10px]
          2xl:px-5 xl:px-5 lg:px-3 md:px-2 px-1.5 2xl:py-2 xl:py-2 lg:py-1 py-0.5
          border-2 rounded-lg absolute left-1/2 -translate-x-1/2 bottom-10
          cursor-pointer group-hover:opacity-100 group-hover:border-black group-hover:text-black
          duration-300 ease-out`}
        >
          Add to cart
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
        <IoHeart className=" text-[18px] " />
      </div>
    </div>
  );
}
