import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function ({ bannerText, bannerTextSpan }) {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-10 cursor-grab mx-2 sm:mx-4 md:mx-2 lg:mx-8 xl:mx-0">
      <div className="pt-2.5 md:pt-[30px] lg:pt-10 xl:pt-[50px]">
        <h1
          className={` ${inter.className} font-normal 2xl:text-[75px] xl:text-[70px] lg:text-[60px] md:text-[40px] text-[28px] sm:text-[32px] text-[#0B0B0D]
             2xl:leading-[105px] xl:leading-[95px] lg:leading-20 md:leading-[52px] leading-[38px]
            max-w-72 sm:max-w-96 md:max-w-88 lg:max-w-136 xl:max-w-160 2xl:max-w-172 mb-4 md:mb-10 `}
        >
          {bannerText}
          <span className=" text-[#00bf63] ">{bannerTextSpan}</span>.
        </h1>
        <Link
          href="/shop"
          className={` ${openSans.className} w-fit font-normal 2xl:text-[13.5px] xl:text-[13.5px] md:text-[12px] text-[11px] text-[#FFFFFF] bg-[#111111]
             2xl:px-[35.44px] xl:px-[35.44px] lg:px-[35.44px] md:px-[30px] px-6 2xl:py-[21.25px] xl:py-[21.5px] lg:py-5 md:py-4 py-3 border-2 border-black
            rounded-lg flex justify-center items-center hover:bg-transparent hover:text-black hover:border-black duration-300 ease-out `}
        >
          Shop collection
          <IoIosArrowRoundForward className=" text-[22px] " />
        </Link>
      </div>
      <div className="flex justify-center gap-2 md:gap-6 items-start -z-50! w-full md:w-auto">
        <img
          src={`/banner1.png`}
          className="h-[220px] sm:h-[280px] md:h-80 lg:h-[420px] xl:h-[601px] 2xl:h-[701px] w-auto"
        />
        <img
          src={`/bannerS1.png`}
          className="w-[90px] sm:w-[100px] md:w-[100px] lg:w-[150px] xl:w-[150px] 2xl:w-[170px] mt-5 md:mt-10 lg:mt-10 xl:mt-12 2xl:mt-14"
        />
      </div>
    </div>
  );
}
