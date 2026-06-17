"use client";

import Link from "next/link";

// Route-level error boundary for the app segment. Renders inside the root
// layout, so navigation (NavBar/Footer) stays available on recoverable errors.
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        We hit a problem loading this page. You can retry or head back home.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2 bg-[#588456] text-white rounded-md border-2 border-[#588456] hover:bg-transparent hover:text-[#588456] duration-300 ease-out"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2 rounded-md border-2 border-[#588456] text-[#588456] hover:bg-[#588456] hover:text-white duration-300 ease-out"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
