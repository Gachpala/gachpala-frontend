import { Suspense } from "react";
import ShopContents from "@/components/shopContents";

function ShopFallback() {
  return (
    <div
      className="min-h-screen bg-[#f6f7f2] px-4 py-10 md:px-8"
      role="status"
      aria-live="polite"
      aria-label="Loading shop products"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 h-8 w-56 rounded-lg bg-[#e8ece3] animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#e8ece3] bg-white p-3"
            >
              <div className="mb-3 h-32 rounded-xl bg-[#edf2e9] animate-pulse" />
              <div className="mb-2 h-4 w-3/4 rounded bg-[#edf2e9] animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-[#edf2e9] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopContents />
    </Suspense>
  );
}
