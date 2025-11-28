import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function ({ bannerText, bannerTextSpan }) {
  return (
    <div className=" flex justify-center items-center gap-10 cursor-grab 2xl:mx-0 xl:mx-0 lg:mx-8 md:mx-2 mx-2 ">
      <div className=" 2xl:pt-[50px] xl:pt-[50px] lg:pt-10 md:pt-[30px] pt-2.5 ">
        <h1
          className={` ${inter.className} font-normal 2xl:text-[75px] xl:text-[70px] lg:text-[60px] md:text-[40px] text-[24px] text-[#0B0B0D]
             2xl:leading-[105px] xl:leading-[105px] lg:leading-20 
            2xl:w-[689px] xl:w-[650px] lg:w-[550px] md:w-[350px] w-40 2xl:b-10 xl:mb-10 lg:mb-10 md:mb-10 mb-4 `}
        >
          {bannerText}
          <span className=" text-[#588456] ">{bannerTextSpan}</span>.
        </h1>
        <Link
          href="/shop"
          className={` ${openSans.className} w-fit font-normal 2xl;text-[13.5px] xl:text-[13.5px] md:text-[12px] text-[10px] text-[#FFFFFF] bg-[#111111]
             2xl:px-[35.44px] xl:px-[35.44px] lg:px-[35.44px] md:px-[30px] px-6 2xl:py-[21.25px] xl:py-[21.5px] lg:py-5 md:py-4 py-3 border-2 border-black
              rounded-lg flex justify-center items-center cursor-pointer hover:bg-transparent hover:text-black hover:border-black duration-300 ease-out `}
        >
          Shop collection
          <IoIosArrowRoundForward className=" text-[22px] " />
        </Link>
      </div>
      <div className=" flex justify-center 2xl:gap-6 xl:gap-6 md:gap-6 gap-2 items-start -z-50! ">
        <img
          src={`/banner1.png`}
          className=" 2xl:h-[701px] xl:h-[601px] lg:h-[420px] md:h-80 h-40  "
        />
        <img
          src={`/bannerS1.png`}
          className=" 2xl:w-[170px] xl:w-[150px] lg:w-[150px] md:w-[100px] w-[70px] 2xl:mt-14 xl:mt-12 lg:mt-10 md:mt-10 mt-5 "
        />
      </div>
    </div>
  );
}
