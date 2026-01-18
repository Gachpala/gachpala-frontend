"use client";

export default function ProductSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="w-full bg-[#EBEEE3] 2xl:px-11 xl:px-4 lg:px-2 md:px-2 px-1 2xl:py-[90.5px] xl:py-12 lg:py-8 md:py-10 py-6 select-none rounded-xl group relative">
        {/* Image skeleton */}
        <div className="mx-auto 2xl:w-auto xl:w-[80%] lg:w-[70%] md:w-[60%] w-[60%] h-32 md:h-40 bg-gray-300 rounded-lg"></div>
      </div>

      <div className="mt-3 md:mt-4 text-left space-y-2">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>

        {/* Price skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Heart icon skeleton */}
      <div className="p-1.5 bg-white w-fit rounded-full absolute right-2 top-2 animate-pulse">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
