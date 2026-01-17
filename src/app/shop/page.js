import Container from "@/components/container";
import ShopCategory from "@/components/shopCategory";
import { inter, interSec } from "@/lib/fonts";

export default function Shop() {
  return (
    <section className=" mt-[50px] mb-[105.5px] ">
      <div className=" bg-[#EBEEE3] py-[105px] px-[308px] flex justify-between items-start select-none ">
        <div>
          <h1
            className={` ${inter.className} font-normal 2xl:text-[48px] xl:text-[48px] lg:text-[48px] md:text-[38px] text-[28px] leading-12 text-black `}
          >
            Shop
          </h1>
          <p className={` ${interSec.className} font-light mt-6 `}>
            Home / <span className=" text-gray-600 ">Shop</span>
          </p>
          <ShopCategory className="mt-6 " />
        </div>
      </div>
    </section>
  );
}
