export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="px-5 py-2 bg-[#588456] text-white rounded-md border-2 border-[#588456] hover:bg-transparent hover:text-[#588456] duration-300 ease-out "
      >
        Go Home
      </a>
    </div>
  );
}
