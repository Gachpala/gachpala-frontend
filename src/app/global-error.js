"use client";

// Catches errors thrown in the root layout / anywhere not covered by a
// nested error.js. Must render its own <html>/<body> because it replaces
// the root layout when it triggers.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2 bg-[#588456] text-white rounded-md border-2 border-[#588456] hover:bg-transparent hover:text-[#588456] duration-300 ease-out"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
