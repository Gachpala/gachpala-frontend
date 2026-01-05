"use client";

import { inter, openSans } from "@/lib/fonts";

export default function Product({ image = "/plant.png", title = "Chinese Money Plant", price = "23.00", isHot = false, rating = 4 }) {
  return (
    <div className="group cursor-pointer">
      <div className="bg-[#EBEEE3] rounded-xl md:rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg aspect-[3/4] flex items-center justify-center p-4 md:p-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* Desktop Add to Cart Button */}
        <button className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black px-6 py-2 rounded-full text-sm font-medium shadow-md hover:bg-black hover:text-white whitespace-nowrap">
          Add to Cart
        </button>

        {/* Mobile Add to Cart Icon button (always visible) */}
        <button className="md:hidden absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md text-black hover:bg-green-600 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </button>
        
        {isHot && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4">
              <span className="bg-orange-400 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">HOT</span>
          </div>
        )}
        
        {/* Wishlist Icon */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white p-1.5 md:p-2 rounded-full shadow-sm hover:shadow-md mb-2 cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </div>
        </div>
      </div>

      <div className="mt-3 md:mt-4 text-left">
        <h3
          className={`${inter.className} text-sm md:text-xl text-gray-900 font-medium group-hover:text-green-700 transition-colors line-clamp-1`}
        >
          {title}
        </h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-1 gap-1 md:gap-0">
          <p className={`${openSans.className} text-green-600 font-semibold text-sm md:text-lg`}>
            $ {price}
          </p>
           <div className="flex gap-0.5">
               {[1,2,3,4,5].map(s => (
                   <svg key={s} className={`w-3 h-3 md:w-4 md:h-4 ${s <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
               ))}
           </div>
        </div>
      </div>
    </div>
  );
}
