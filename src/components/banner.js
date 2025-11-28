import { arapey, openSans } from "@/lib/fonts";
import Link from "next/link";

export default function Banner() {
  let imageWidth =
    " 2xl:w-[200px] xl:w-[150px] lg:w-[120px] md:w-[100px] w-[45px] ";

  return (
    <>
      <section className=" w-full max-w-[1500px] mx-auto 2xl:pb-220 xl:pb-190 lg:pb-170 md:pb-160 pb-110 relative">
        <img id="bannerImg" src="/heroBanner.png" />
        <div
          className=" grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-8 absolute left-[50%] translate-x-[-50%] 2xl:bottom-[45px] xl:bottom-[45px] lg:bottom-[35px] md:bottom-[45px] bottom-[25px] w-full 2xl:px-10 xl:px-10 lg:px-10 md:px-4 px-4 "
        >
          <Link
            href="/shop"
            className=" bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-2 pb-8 pt-2 select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out "
          >
            <h1
              className={` ${arapey.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[20px] `}
            >
              Indoor Plants
            </h1>
            <p
              className={` ${openSans.className} font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Bring Nature Home
            </p>
            <div className=" flex justify-between items-center mt-4 ">
              <img src="/indoor5.jpg" className={imageWidth} />
              <img src="/indoor2.jpg" className={imageWidth} />
              <img src="/indoor3.jpg" className={imageWidth} />
            </div>
            <p
              className={` ${openSans.className} block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Shop Indoor Greens
            </p>
          </Link>

          <Link
            href="/shop"
            className=" bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-2 pb-8 pt-2 select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out "
          >
            <h1
              className={` ${arapey.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[20px] `}
            >
              Outdoor Plants
            </h1>
            <p
              className={` ${openSans.className} font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Grow Your Outdoor Oasis
            </p>
            <div className=" flex justify-between items-center mt-4 ">
              <img src="/outdoor1.jpg" className={imageWidth} />
              <img src="/outdoor2.jpg" className={imageWidth} />
              <img src="/outdoor3.jpg" className={imageWidth} />
            </div>
            <p
              className={` ${openSans.className} block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Shop Outdoor Greens
            </p>
          </Link>

          <Link
            href="/shop"
            className=" bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-2 pb-8 pt-2 select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out "
          >
            <h1
              className={` ${arapey.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[20px] `}
            >
              Gardening Tools
            </h1>
            <p
              className={` ${openSans.className} font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Equip Your Garden Journey
            </p>
            <div className=" flex justify-between items-center mt-4 ">
              <img src="/tools1.jpg" className={imageWidth} />
              <img src="/tools2.jpg" className={imageWidth} />
              <img src="/tools3.jpg" className={imageWidth} />
            </div>
            <p
              className={` ${openSans.className} block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Shop Tools
            </p>
          </Link>

          <Link
            href="/shop"
            className=" bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-2 pb-8 pt-2 select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out "
          >
            <h1
              className={` ${arapey.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[20px] `}
            >
              Gifts
            </h1>
            <p
              className={` ${openSans.className} font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Gifts for Every Occasion
            </p>
            <div className=" flex justify-between items-center mt-4 ">
              <img src="/gift4.jpg" className={imageWidth} />
              <img src="/gift2.jpg" className={imageWidth} />
              <img src="/gift3.jpg" className={imageWidth} />
            </div>
            <p
              className={` ${openSans.className} block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Find Gifts
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
