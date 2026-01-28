import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import Container from "./container";

export default function PromoSection() {
  return (
    <section className="py-16 md:py-24 bg-[#EBEEE3] my-10 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span
              className={`${openSans.className} text-green-600 font-bold tracking-wider uppercase mb-4 block`}
            >
              Limited Time Offer
            </span>
            <h2
              className={`${inter.className} text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight`}
            >
              Get <span className="text-green-600">30% Off</span> <br /> on
              Indoor Plants
            </h2>
            <p
              className={`${openSans.className} text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0`}
            >
              Transform your living space with our hand-picked selection of
              air-purifying indoor plants. Offer valid until stocks last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/shop"
                className={`${inter.className} bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30`}
              >
                Shop Now
              </Link>
              <Link
                href="/shop"
                className={`${inter.className} bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors`}
              >
                View Collection
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-green-600/10 rounded-full animate-pulse"></div>
              <img
                src="/indoor5.jpg"
                alt="Promo Plant"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 font-bold p-6 rounded-full shadow-lg z-20 w-24 h-24 flex items-center justify-center text-center transform rotate-12">
                <span className={`${inter.className} text-lg leading-tight`}>
                  Only <br /> ৳999
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
