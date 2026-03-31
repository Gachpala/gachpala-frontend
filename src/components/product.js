// "use client";
// import { useState, useEffect } from "react";
// import { inter, openSans } from "@/lib/fonts";
// import { FaRegHeart } from "react-icons/fa";
// import { IoHeart } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   cartReducer,
//   addToFavorites,
//   removeFromFavorites,
// } from "@/app/slices/products_slices";
// import { BiPlus } from "react-icons/bi";

// export default function Product({
//   id,
//   img,
//   alt,
//   title,
//   price,
//   description,
//   stock,
//   category_id,
//   category_name,
//   is_featured,
//   created_at,
//   status,
//   weight,
//   dimensions,
// }) {
//   const [isActive, setIsActive] = useState(false);
//   const [isCartAdded, setIsCartAdded] = useState(false);
//   const [usePlaceholder, setUsePlaceholder] = useState(!img);
//   const dispatch = useDispatch();
//   const reduxProducts = useSelector((state) => state.products.product);
//   const favorites = useSelector((state) => state.products.favorites);
//   const isFavorited = favorites?.some((item) => item.id === id) || false;

//   useEffect(() => {
//     if (isCartAdded) {
//       const timer = setTimeout(() => {
//         setIsCartAdded(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [isCartAdded]);

//   const handleCartButton = () => {
//     setIsActive((prev) => !prev);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();

//     // Use props directly for cart item
//     const newItem = {
//       id,
//       name: title,
//       price: parseFloat(price),
//       quantity: 1,
//       image: img,
//       size: "Standard",
//       description,
//       stock,
//       category_id,
//       category_name,
//       is_featured,
//       created_at,
//       status,
//       weight,
//       dimensions,
//     };
//     dispatch(cartReducer(newItem));
//     console.log("Added to cart:", title, "ID:", id);

//     setIsCartAdded(true);
//   };

//   const handleAddToFavorites = (e) => {
//     e.stopPropagation();

//     if (isFavorited) {
//       // Remove from favorites
//       dispatch(removeFromFavorites(id));
//       console.log("Removed from favorites:", title, "ID:", id);
//     } else {
//       // Add to favorites using props
//       const newItem = {
//         id,
//         name: title,
//         price: parseFloat(price),
//         image: img,
//         description,
//         stock,
//         category_id,
//         category_name,
//         is_featured,
//         created_at,
//         status,
//         weight,
//         dimensions,
//       };
//       dispatch(addToFavorites(newItem));
//       console.log("Added to favorites:", title, "ID:", id);
//     }
//   };

//   const handleDetails = (e) => {
//     e.stopPropagation();
//     window.location.href = `/productDetails?id=${id}`;
//   };
//   const placeholder = "/plant-placeholder.png";
//   // Choose src based on whether we should force placeholder
//   let imageSrc = usePlaceholder ? placeholder : img;
//   // Prepend base URL only for real product images that are relative
//   if (!usePlaceholder && imageSrc && imageSrc.startsWith("/")) {
//     imageSrc = `https://api.gachpala.com${imageSrc}`;
//   }
//   const isPlaceholder = usePlaceholder;

//   const handleImgError = () => {
//     if (!usePlaceholder) {
//       setUsePlaceholder(true);
//     }
//   };
//   const imageContainerClass = `relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center ${
//     isPlaceholder ? "bg-gray-50" : "bg-gray-100"
//   }`;

//   return (
//     <div
//       onClick={handleDetails}
//       className="relative bg-white rounded-2xl shadow group border border-gray-100 flex flex-col cursor-none min-h-[370px] h-full w-full hover:shadow-lg transition-all duration-200"
//     >
//       {/* Favorite icon */}
//       <button
//         onClick={handleAddToFavorites}
//         className="absolute right-3 top-3 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
//         tabIndex={-1}
//       >
//         {isFavorited ? (
//           <IoHeart className="text-[22px] text-red-500" />
//         ) : (
//           <FaRegHeart className="text-[22px] text-gray-400" />
//         )}
//       </button>

//       {/* Image */}
//       <div className={imageContainerClass}>
//         <img
//           src={imageSrc}
//           alt={alt}
//           onError={handleImgError}
//           className={`${isPlaceholder ? "w-[80px] h-[80px] object-contain opacity-90" : "w-full h-full object-cover"} group-hover:scale-105 transition-transform duration-300`}
//           loading="lazy"
//         />
//       </div>

//       {/* Info */}
//       <div className="flex-1 flex flex-col px-4 py-3 gap-1">
//         <h3
//           className={`${inter.className} text-base font-semibold text-gray-900 mb-0 line-clamp-1`}
//         >
//           {title}
//         </h3>
//         <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px] mb-1">
//           {description}
//         </p>
//         <div className="flex items-center justify-between mt-auto pt-2">
//           <span className="text-lg font-bold text-green-600">Tk {price}</span>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleAddToCart(e);
//             }}
//             className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold shadow hover:bg-green-700 transition-colors"
//           >
//             <BiPlus className="text-base" />
//             <span className="hidden sm:inline">Add to cart</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const ProductCard = () => {
  return (
    // Outer wrapper just for centering in the preview
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 font-sans">
      {/* Main Card Container - Added 'group' class for hover targeting */}
      <div className="group w-full max-w-[420px] bg-[#f8f8f8] rounded-[2.5rem] p-4 shadow-xl transition-all duration-300">
        {/* Image & Badges Section */}
        <div className="relative bg-[#ebebeb] rounded-[2rem] flex flex-col justify-between overflow-hidden">
          {/* Discount Badge */}
          <div className="absolute top-4 left-4 z-50 bg-[#4c7746] text-white rounded-full w-[4.5rem] h-[4.5rem] flex flex-col items-center justify-center text-lg font-bold leading-tight shadow-sm">
            <span>15%</span>
            <span>OFF</span>
          </div>

          {/* Cutout Price Corner */}
          <div className="absolute top-0 right-0 z-50 bg-[#f8f8f8] rounded-bl-[2.5rem] px-6 py-4">
            {/* FIX: Added `relative z-10` here. 
              This forces the text to sit ABOVE the shadows cast by the corner helpers below. 
            */}
            <div className="relative z-10 text-4xl font-medium text-[#2b2b2b]">
              ₹750
            </div>

            {/* Smooth Curve - Top Left */}
            <div className="absolute top-0 -left-8 w-8 h-8 bg-transparent rounded-tr-[2rem] shadow-[1rem_-1rem_0_1rem_#f8f8f8] pointer-events-none"></div>

            {/* Smooth Curve - Bottom Right */}
            <div className="absolute -bottom-8 right-0 w-8 h-8 bg-transparent rounded-tr-[2rem] shadow-[1rem_-1rem_0_1rem_#f8f8f8] pointer-events-none"></div>
          </div>

          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src="/heroBanner.png"
              alt="Gachpala Tree"
              className="w-full h-[280px] object-cover rounded-xl drop-shadow-2xl"
            />
          </div>

          {/* Delivery Banner */}
          <div className="bg-[#75975e] text-white text-center py-3 px-4 text-sm font-medium w-full">
            Marketplace Exclusive: Free Delivery until 16/10/2026
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-6 pb-2 px-3">
          {/* Title and Action Button */}
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-4xl font-medium text-black tracking-tight">
              Gachpala Tree
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
          <p className="text-gray-800 text-lg leading-snug mb-4 pr-4">
            Vibrant indoor tree sapling with distinctive, textured foliage.
          </p>

          {/* Stock Info */}
          <div className="text-black text-[1.05rem]">
            <span className="font-semibold">Available Stock:</span> 15
          </div>

          {/* Add to Cart Button (Hidden by default, revealed on card hover) */}
          <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-4">
            <button
              type="button"
              className="w-full bg-[#4c7746] hover:bg-[#3a5a35] text-white font-semibold text-lg py-3 rounded-xl transition-colors shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
