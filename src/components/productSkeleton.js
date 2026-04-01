"use client";

export default function ProductSkeleton({ className }) {
  return (
    <div
      className={`w-full md:w-75 h-auto md:h-100 max-w-[420px] bg-[#f8f8f8] rounded-2xl p-3 sm:p-4 shadow-xl relative animate-pulse ${className}`}
    >
      {/* Image Section */}
      <div className="relative bg-[#ebebeb] rounded-2xl overflow-hidden">
        {/* Discount Badge Skeleton */}
        <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-gray-300" />

        {/* Price Corner Skeleton */}
        <div className="absolute top-0 right-0 bg-[#f8f8f8] rounded-bl-[2.5rem] px-5 py-5">
          <div className="w-16 h-6 bg-gray-300 rounded" />
        </div>

        {/* Image Skeleton */}
        <div className="flex justify-center items-center">
          <div className="w-full h-40 sm:h-50 bg-gray-300 rounded-xl" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-2 px-3">
        {/* Title + Icon */}
        <div className="flex justify-between items-end mb-2">
          <div className="w-32 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-300 rounded" />
          <div className="w-5/6 h-4 bg-gray-300 rounded" />
        </div>

        {/* Stock */}
        <div className="w-40 h-4 bg-gray-300 rounded" />
      </div>

      {/* Button */}
      <div className="mt-4 md:mt-0 md:absolute left-0 md:-bottom-5 w-full h-12 md:h-14">
        <div className="w-full h-full bg-gray-300 rounded-xl md:rounded-b-2xl" />
      </div>
    </div>
  );
}
