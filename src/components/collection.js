import { inter, interSec } from "@/lib/fonts";
import Container from "./container";
import Product from "./product";

export default function Collection() {
  return (
    <>
      <section className=" 2xl:mx-0 xl:mx-24 lg:mx-18 md:mx-16 mx-6 2xl:my-[112.5px] xl:my-[112.5px] lg:my-[112.5px] my-20  ">
        <Container>
          <h1
            className={`${inter.className} font-normal 2xl:text-[48px] xl:text-[48px] lg:text-[48px] md:text-[38px] text-[28px] leading-12 text-black mb-[25px]`}
          >
            Best Collections
          </h1>
          <div className=" flex justify-between items-center ">
            <div>
              <img
                src="collection1.jpg"
                rel="preload"
                className=" w-[415px] scale-100 "
              />
              <h1
                className={` ${interSec.className} text-[30px] text-black leading-[42px] mt-[18px] `}
              >
                Virgin Green
              </h1>
            </div>
            <div>
              <img
                src="collection2.jpg"
                rel="preload"
                className=" w-[415px] scale-100 "
              />
              <h2
                className={` ${interSec.className} text-[30px] text-black leading-[42px] mt-[18px] `}
              >
                Virgin Green
              </h2>
            </div>
            <div>
              <img
                src="collection3.jpg"
                rel="preload"
                className=" w-[415px] scale-100 "
              />
              <h3
                className={` ${interSec.className} text-[30px] text-black leading-[42px] mt-[18px] `}
              >
                Virgin Green
              </h3>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
