"use client";
import { inter,  openSans, interSec } from "@/lib/fonts";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function Arrival() {
  const items = Array.from({ length: 4 });
  const [activeIndex, setActiveIndex] = useState(null);

  function handleAddToCart(event, index) {
    event.stopPropagation(); 
    console.log("Add to cart clicked for index:", index);
  }

  function handleCartButton(index) {
    setActiveIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="  2xl:mx-0 xl:mx-24 lg:mx-18 md:mx-16 mx-6 mt-[30px] select-none ">
      <h1
        className={`${inter.className} font-normal 2xl:text-[48px] xl:text-[48px] lg:text-[48px] md:text-[38px] text-[28px] leading-12 text-black`}
      >
        Fresh arrivals
      </h1>
      <div className=" grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 2xl:grid-rows-none xl:grid-rows-none lg:grid-rows-none md:grid-rows-2 grid-rows-2 gap-6 mt-[25px] ">
        {items.map((_, i) => (
          <div key={i}>
            <div
              onClick={() => handleCartButton(i)}
              className=" bg-[#EBEEE3] 2xl:px-11 xl:px-4 lg:px-2 md:px-2 px-1 2xl:py-[90.5px] xl:py-12 lg:py-8 md:py-10 py-6 select-none group relative "
            >
              <img
                src="/plant.png"
                alt={`plant-${i}`}
                className=" mx-auto 2xl:w-auto xl:w-[80%] lg:w-[70%] md:w-[60%] w-[60%] "
              />
              <button
                onClick={(e) => handleAddToCart(e, i)}
                className={`${openSans.className} ${
                  activeIndex === i
                    ? "opacity-100 border-black text-black 2xl:bottom-8 xl:bottom-4 lg:bottom-2 md:bottom-4 bottom-[9px] duration-300 ease-out "
                    : "opacity-0 border-transparent "
                } w-fit font-medium 2xl:text-[12px] xl:text-[12px] lg:text-[12px] md:text-[12px] text-[10px] 2xl:px-5 xl:px-5 lg:px-3 md:px-2 px-1.5 2xl:py-2 xl:py-2 lg:py-1 py-0.5 border-2 border-black rounded-lg 
                absolute left-[50%] translate-x-[-50%] bottom-10 cursor-pointer group-hover:opacity-100 group-hover:border-gray-500 group-hover:text-gray-500 group-hover:bg-transparent duration-300 ease-out `}
              >
                Add to cart
              </button>
            </div>
            <h3
              className={`${interSec.className} 2xl:text-[25.5px] xl:text-[25.5px] lg:text-[20px] md:text-[22px] text-[18px] text-black font-normal leading-[35.7px] 
                2xl:mt-6 xl:mt6 lg:mt-4 md:mt-3 mt-2 cursor-pointer `}
            >
              Chinese Money Plant
            </h3>
            <p
              className={`${openSans.className} font-normal 2xl:text-[19.5px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-[#00bf63] 
                2xl:leading-[29.3px] xl:leading-7 lg:leading-6 md:leading-4 leading-2 `}
            >
              $ 23.00
            </p>
          </div>
        ))}
      </div>
      <button
        className={`${openSans.className} flex justify-center items-center gap-1 2xl:text-[13.5px] xl:text-[13.5px] md:text-[12px] text-[10px] font-normal text-white 
          2xl:px-[35.44px] xl:px-[35'p.44px] lg:px-[35.44px] md:px-[30px] px-6 2xl:py-[21.25px] xl:py-[21.5px] lg:py-5 md:py-4 py-3 bg-[#00bf63] border-2 border-[#00bf63] rounded-lg 
          mt-15 mx-auto cursor-pointer hover:bg-transparent hover:border-[#00bf63] hover:text-[#00bf63] duration-300 ease-out`}
      >
        Shop All <BsArrowRight />
      </button>
    </section>
  );
}
