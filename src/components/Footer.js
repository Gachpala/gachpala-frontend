import { inter, openSans } from "@/lib/fonts";
import Container from "./container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" mt-10 bg-[#EBEEE3] ">
      <section className=" 2xl:px-0 xl:px-12 lg:px-8 md:px-8 mx-4 ">
        <Container className=" 2xl:py-[142.5px] xl:py-[142.5px] lg:py-[142.5px] md:py-[142.5px] py-12 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 grid-cols-3 ">
          <div className={` col-span-2 select-none `}>
            <img
              src={`/logo.png`}
              className=" 2xl:w-[140px] xl:w-[140px] lg:w-[140px] md:w-[120px] w-[120px] "
            />
            <p
              className={` ${openSans.className} 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] text-[#58575B] font-normal leading-[22.5px]
                 2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[260px] w-[200px]
                 2xl:mt-[29px] xl:mt-[29px] lg:mt-[29px] md:mt-6 mt-4 `}
            >
              Gatchpala brings nature closer to you with a curated collection of
              plants, gardening tools, and green gifts — making every space
              bloom with life. 🌿
            </p>
          </div>
          <div>
            <lable
              className={` ${inter.className} font-normal 2xl:text-[27px] xl:text-[27px] lg:text-[27px] md:text-[24px] text-[20px] text-black leading-[33.8px] tracking-[1px] `}
            >
              Company
            </lable>
            <div className=" flex flex-col justify-start items-start gap-3 2xl:py-[29px] xl:py-[29px] lg:py-[29px] md:py-6 py-3 2xl:pl-8 xl:pl-8 lg:pl-8 md:pl-0 pl-0 ">
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                About
              </Link>
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Our Plantations
              </Link>
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Our vision
              </Link>
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Installations
              </Link>
            </div>
          </div>

          <div className=" 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-0 mt-8  ">
            <lable
              className={` ${inter.className} font-normal 2xl:text-[27px] xl:text-[27px] lg:text-[27px] md:text-[24px] text-[20px] text-black leading-[33.8px] tracking-[1px]  `}
            >
              Support
            </lable>
            <div className=" flex flex-col justify-start items-start gap-3 2xl:py-[29px] xl:py-[29px] lg:py-[29px] md:py-6 py-3 2xl:pl-8 xl:pl-8 lg:pl-8 md:pl-0 pl-0 w-max ">
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Customer FAQs
              </Link>
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Shipping & Returns
              </Link>
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Contact Us
              </Link>
              <Link
                href={""}
                className={` ${openSans.className} font-normal text-[#58575B] 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] `}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </Container>
        <div className=" 2xl:text-[15px] xl:text-[15px] lg:text-[15px] md:text-[15px] text-[12px] text-center text-[#58575B] 2xl:py-[60px] xl:py-[60px] lg:py-[50px] md:py-[30px] py-5 border-t-2 border-gray-300 ">
          <p>© 2025 GachPala. All rights reserved.</p>
        </div>
      </section>
    </footer>
  );
}
