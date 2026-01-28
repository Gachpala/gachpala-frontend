"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { inter } from "@/lib/fonts";
import Link from "next/link";

export default function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{ position: "absolute", bottom: "20px", left: "0", right: "0" }}
      >
        <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <section className="pt-4 pb-8">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Slider - Full Width */}
        <div className="rounded-2xl overflow-hidden shadow-sm relative group">
          <Slider {...settings} className="h-full slick-hero">
            {["/heroBanner.png", "/b2.gif", "/b3.gif", "/b4.gif"].map(
              (img, i) => (
                <div
                  key={i}
                  className="relative aspect-16/8 md:aspect-21/9 w-full outline-none bg-gray-100"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover block"
                    alt={`Banner ${i + 1}`}
                  />
                </div>
              ),
            )}
          </Slider>

          {/* Custom Styles for this slider to remove bottom gap and style dots */}
          <style jsx global>{`
            .slick-hero .slick-slider {
              margin-bottom: 0 !important;
            }
            .slick-hero .slick-dots li button:before {
              color: white;
              opacity: 0.5;
              font-size: 10px;
            }
            .slick-hero .slick-dots li.slick-active button:before {
              color: white;
              opacity: 1;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
