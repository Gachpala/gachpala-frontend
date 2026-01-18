import { arapey, inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import BannerSlider from "./bannerSLider";

export default function Banner() {
  const categories = [
    {
      title: "Indoor Plants",
      subtitle: "Bring Nature Home",
      cta: "Shop Indoor Greens",
      icon: "/indoor.png",
      images: ["/indoor5.jpg", "/indoor2.jpg", "/indoor3.jpg"],
      href: "/shop",
    },
    {
      title: "Outdoor Plants",
      subtitle: "Grow Your Outdoor Oasis",
      cta: "Shop Outdoor Greens",
      icon: "/outdoor.png",
      images: ["/outdoor1.jpg", "/outdoor2.jpg", "/outdoor3.jpg"],
      href: "/shop",
    },
    {
      title: "Tools",
      subtitle: "Equip Your Garden Journey",
      cta: "Shop Tools",
      icon: "/tools.png",
      images: ["/tools1.jpg", "/tools2.jpg", "/tools3.jpg"],
      href: "/shop",
    },
    {
      title: "Gifts",
      subtitle: "Gifts for Every Occasion",
      cta: "Find Gifts",
      icon: "/gifts.png",
      images: ["/gift4.jpg", "/gift2.jpg", "/gift3.jpg"],
      href: "/shop",
    },
  ];

  const CategoryCard = ({ title, subtitle, cta, icon, images, href }) => (
    <Link
      href={href}
      className="group  bg-[#EBEEE3] rounded-xl shadow-sm hover:shadow-xl hover:bg-[#EBEEE3]/90 transition-all duration-300 ease-out transform hover:-translate-y-1 overflow-hidden relative p-6 flex flex-col items-center text-center h-full"
    >
      <div className="flex md:hidden items-center justify-between w-full mb-2">
        <h2 className={`${inter.className} text-xl font-medium text-gray-900`}>
          {title}
        </h2>
        <img src={icon} alt="" className="w-12 h-12 object-contain" />
      </div>

      <div className="hidden md:flex flex-col items-center w-full h-full justify-between">
        <div className="flex flex-col items-center">
          <h2
            className={`${inter.className} text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2`}
          >
            {title}
          </h2>
          <p
            className={`${openSans.className} text-sm lg:text-base font-light text-gray-600 mb-4`}
          >
            {subtitle}
          </p>
        </div>

        <div className="flex justify-center items-center w-full gap-2 lg:gap-4 px-2 mb-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-1/3 aspect-3/4 overflow-hidden rounded-lg">
               <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="" />
            </div>
          ))}
        </div>

        <span
          className={`${openSans.className} text-xs lg:text-sm font-semibold text-green-700 uppercase tracking-widest mt-auto`}
        >
          {cta}
        </span>
      </div>
    </Link>
  );

  return (
    <section className="relative w-full max-w-[1920px] mx-auto md:pb-[250px] lg:pb-[300px]">
      <BannerSlider />
      
      <div className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-12 w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] z-10 -mt-16 md:mt-0 pb-8 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
