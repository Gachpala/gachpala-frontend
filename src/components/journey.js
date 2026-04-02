/* eslint-disable @next/next/no-img-element */
import { inter, openSans } from "@/lib/fonts";

export default function Journey() {
  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-[3px] border-green-100 rounded-3xl -z-10 transform -rotate-2"></div>
          <img
            src="/Container.png"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
            alt="Our Journey"
          />
          <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg max-w-[200px] hidden md:block">
            <p
              className={`${inter.className} text-3xl font-bold text-green-600`}
            >
              10+
            </p>
            <p className={`${openSans.className} text-sm text-gray-500`}>
              Years of connecting nature with people
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-left">
          <span
            className={`${openSans.className} text-green-600 font-semibold tracking-wider text-sm uppercase mb-2 block`}
          >
            Our Story
          </span>
          <h2
            className={`${inter.className} text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight`}
          >
            Growing Green <br /> Since 2014
          </h2>
          <div
            className={`${openSans.className} text-gray-600 space-y-4 text-lg`}
          >
            <p>
              It all started with a single seed and a simple idea: to bring the
              tranquility of nature into the bustling lives of city dwellers.
              GachPala was born from a small balcony garden in Dhaka, fueled by
              a passion for greenery and sustainable living.
            </p>
            <p>
              We realized that finding quality plants and gardening tools was
              not just hard—it was intimidating for beginners. We wanted to
              change that.
            </p>
            <p>
              Today, GachPala is more than just a marketplace; it is a community
              of plant lovers. We connect local nurseries with enthusiasts
              across the country, ensuring that every plant finds a loving home.
            </p>
          </div>

          <div className="mt-8 flex gap-8">
            <div>
              <h4
                className={`${inter.className} text-2xl font-bold text-gray-900`}
              >
                15k+
              </h4>
              <p className="text-gray-500">Plants Delivered</p>
            </div>
            <div>
              <h4
                className={`${inter.className} text-2xl font-bold text-gray-900`}
              >
                50+
              </h4>
              <p className="text-gray-500">Partner Nurseries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
