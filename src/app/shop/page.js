import { Suspense } from "react";
import ShopContents from "@/components/shopContents";

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <ShopContents />
    </Suspense>
  );
}
