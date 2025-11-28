import { arapey, inter, openSans } from "@/lib/fonts";
import Link from "next/link";

export default function Banner() {
  let imageWidth =
    " 2xl:w-[200px] xl:w-[150px] lg:w-[120px] md:w-[100px] w-[45px] ";

  return (
    <>
      <section className=" w-full max-w-[1500px] mx-auto 2xl:pb-220 xl:pb-190 lg:pb-170 md:pb-160 pb-75 relative">
        <img
          id="bannerImg"
          src="/heroBanner.png"
          rel="preload"
          className=" rounded-t-3xl "
        />
        <div className=" grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-6 absolute left-[50%] translate-x-[-50%] 2xl:bottom-[45px] xl:bottom-[45px] lg:bottom-[35px] md:bottom-[45px] bottom-[25px] w-full 2xl:px-10 xl:px-10 lg:px-10 md:px-4 sm:px-6 px-7 rounded-lg ">
          <Link
            href="/shop"
            className=" 2xl:block xl:block lg:block md:block flex flex-col justify-center items-center bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-4 2xl:pb-8 xl:pb-8 lg:pb-8 md:pb-8 pb-0 2xl:pt-2 xl:pt-2 lg:pt-2 md:pt-2 pt-0 2xl:h-auto xl:h-auto lg:h-auto md:h-auto h-[140px] 2xl:shadow-none xl:shadow-none lg:shadow-none md:shadow-none shadow-md 2xl:drop-shadow-none xl:drop-shadow-none lg:drop-shadow-none md:drop-shadow-none drop-shadow-xl rounded-2xl select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out "
          >
            <div className=" flex 2xl:block xl:block lg:block md:block flex-row justify-between items-center ">
              <h1
                className={` ${inter.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[18px] z-50 `}
              >
                Indoor Plants
              </h1>
              <img
                src="indoor.png"
                className=" w-20 2xl:hidden xl:hidden lg:hidden md:hidden block "
              />
            </div>

            <p
              className={` ${openSans.className}  hidden 2xl:block xl:block lg:block md:block font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Bring Nature Home
            </p>
            <div className=" hidden justify-between items-center mt-4 2xl:flex xl:flex lg:flex md:flex ">
              <img src="/indoor5.jpg" className={imageWidth} rel="preload" />
              <img src="/indoor2.jpg" className={imageWidth} rel="preload" />
              <img src="/indoor3.jpg" className={imageWidth} rel="preload" />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Shop Indoor Greens
            </p>
          </Link>

          <Link
            href="/shop"
            className="2xl:block xl:block lg:block md:block flex flex-col justify-center items-center bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-4 2xl:pb-8 xl:pb-8 lg:pb-8 md:pb-8 pb-0 2xl:pt-2 xl:pt-2 lg:pt-2 md:pt-2 pt-0 2xl:h-auto xl:h-auto lg:h-auto md:h-auto h-[140px] 2xl:shadow-none xl:shadow-none lg:shadow-none md:shadow-none shadow-md 2xl:drop-shadow-none xl:drop-shadow-none lg:drop-shadow-none md:drop-shadow-none drop-shadow-xl rounded-2xl select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out relative"
          >
            <div className=" flex 2xl:block xl:block lg:block md:block flex-row justify-between items-center ">
              <h1
                className={` ${inter.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[18px] z-50 `}
              >
                Outer Plants
              </h1>
              <img
                src="outdoor.png"
                className=" w-20 2xl:hidden xl:hidden lg:hidden md:hidden block "
              />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Grow Your Outdoor Oasis
            </p>
            <div className=" hidden justify-between items-center mt-4 2xl:flex xl:flex lg:flex md:flex ">
              <img src="/outdoor1.jpg" className={imageWidth} rel="preload" />
              <img src="/outdoor2.jpg" className={imageWidth} rel="preload" />
              <img src="/outdoor3.jpg" className={imageWidth} rel="preload" />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Shop Outdoor Greens
            </p>
          </Link>

          <Link
            href="/shop"
            className="2xl:block xl:block lg:block md:block flex flex-col justify-center items-center bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-4 2xl:pb-8 xl:pb-8 lg:pb-8 md:pb-8 pb-0 2xl:pt-2 xl:pt-2 lg:pt-2 md:pt-2 pt-0 2xl:h-auto xl:h-auto lg:h-auto md:h-auto h-[140px] 2xl:shadow-none xl:shadow-none lg:shadow-none md:shadow-none shadow-md 2xl:drop-shadow-none xl:drop-shadow-none lg:drop-shadow-none md:drop-shadow-none drop-shadow-xl rounded-2xl select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out relative "
          >
            <div className=" flex 2xl:block xl:block lg:block md:block flex-row justify-between items-center ">
              <h1
                className={` ${inter.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[18px] z-50 `}
              >
                Tools
              </h1>
              <img
                src="tools.png"
                className=" w-20 2xl:hidden xl:hidden lg:hidden md:hidden block "
              />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Equip Your Garden Journey
            </p>
            <div className=" hidden justify-between items-center mt-4 2xl:flex xl:flex lg:flex md:flex ">
              <img src="/tools1.jpg" className={imageWidth} rel="preload" />
              <img src="/tools2.jpg" className={imageWidth} rel="preload" />
              <img src="/tools3.jpg" className={imageWidth} rel="preload" />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Shop Tools
            </p>
          </Link>

          <Link
            href="/shop"
            className="2xl:block xl:block lg:block md:block flex flex-col justify-center items-center bg-[#EBEEE3] 2xl:px-8 xl:px-8 lg:px-8 md:px-6 px-4 2xl:pb-8 xl:pb-8 lg:pb-8 md:pb-8 pb-0 2xl:pt-2 xl:pt-2 lg:pt-2 md:pt-2 pt-0 2xl:h-auto xl:h-auto lg:h-auto md:h-auto h-[140px] 2xl:shadow-none xl:shadow-none lg:shadow-none md:shadow-none shadow-md 2xl:drop-shadow-none xl:drop-shadow-none lg:drop-shadow-none md:drop-shadow-none drop-shadow-xl rounded-2xl select-none hover:shadow-xl hover:drop-shadow-2xl hover:bg-[#EBEEE3]/30 hover:backdrop-blur-xl hover:scale-[1.03] duration-200 ease-out relative "
          >
            <div className=" flex 2xl:block xl:block lg:block md:block flex-row justify-between items-center ">
              <h1
                className={` ${inter.className} font-normal 2xl:text-[50px] xl:text-[48px] lg:text-[45px] md:text-[38px] text-[18px] z-50 `}
              >
                Gifts
              </h1>
              <img
                src="gifts.png"
                className=" w-20 2xl:hidden xl:hidden lg:hidden md:hidden block "
              />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-light 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[12px] 2xl:mt-[-15px] xl:mt-[-15px] lg:mt[-20px] md:-mt-2.5 `}
            >
              Gifts for Every Occasion
            </p>
            <div className=" hidden justify-between items-center mt-4 2xl:flex xl:flex lg:flex md:flex">
              <img src="/gift4.jpg" className={imageWidth} rel="preload" />
              <img src="/gift2.jpg" className={imageWidth} rel="preload" />
              <img src="/gift3.jpg" className={imageWidth} rel="preload" />
            </div>
            <p
              className={` ${openSans.className} hidden 2xl:block xl:block lg:block md:block font-normal text-[#00bf63] 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[12px] text-[10px] w-fit mx-auto mt-4 `}
            >
              Find Gifts
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
