"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSliderItem from "@/components/bannerSliderItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import Journey from "@/components/journey";
import Container from "@/components/container";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <IoIosArrowForward className="text-[40px] text-black absolute -right-20 top-[50%] translate-y-[-50%] z-50 2xl:block xl:hidden lg:hidden md:hidden hidden" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div onClick={onClick}>
      <IoIosArrowBack className="text-[40px] text-black absolute left-6 top-[50%] translate-y-[-50%] z-50 2xl:block xl:hidden lg:hidden md:hidden hidden" />
    </div>
  );
}

export default function About() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    fade: false,
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const slides = [
    {
      bannerText: "Perfect plants on sale for your",
      bannerTextSpan: " interiors",
    },
    {
      bannerText: "Perfect plants on sale for your",
      bannerTextSpan: " interiors",
    },
    {
      bannerText: "Perfect plants on sale for your",
      bannerTextSpan: " interiors",
    },
    {
      bannerText: "Perfect plants on sale for your",
      bannerTextSpan: " interiors",
    },
  ];

  return (
    <section className="">
      <div className=" 2xl:mt-[50px] xl:mt-[50px] lg:mt-10 md:mt-[30px] mt-5 w-full max-w-[1800px] ">
        <div className="slider-container mx-auto 2xl:mb-28 xl:mb-28 lg:mb-24 md:mb-16 mb-14">
          <Slider {...settings}>
            {slides.map((item, i) => (
              <div className="pb-5" key={i}>
                <BannerSliderItem
                  bannerText={item.bannerText}
                  bannerTextSpan={item.bannerTextSpan}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className=" w-full bg-[#EBEEE3] flex flex-wrap justify-evenly items-center 2xl:py-[105px] xl:py-20 lg:py-18 md:py-16 py-10 ">
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
        <p className=" 2xl:text-[40px] xl:text-[38px] lg:text-[24px] md:text-4 md:text-[30px] text-[16px] text-gray-500  ">
          Natural
        </p>
      </div>
      <Container>
        <Journey />
      </Container>
    </section>
  );
}
