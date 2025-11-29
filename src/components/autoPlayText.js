"use client";
import { interSec } from "@/lib/fonts";
import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";

export default function AutoPlayText() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    "p1.jpeg",
    "p2.jpeg",
    "p3.jpg",
    "p4.jpeg",
    "p5.jpeg",
    "p6.jpg",
    "p7.jpg",
    "p8.jpg",
    "p9.jpg",
    "p10.jpg",
    "p11.jpg",
    "p12.jpg",
  ];

  return (
    <Marquee
      direction="left"
      speed={100}
      className={`${interSec.className} 2xl:text-[80px] xl:text-[80px] lg:text-[60px] md:text-[60px] text-[50px] 2xl:-mt-6 xl:-mt-6 lg:-mt-6 md:-mt-6 -mt-2 capitalize select-none`}
    >
      {images.map((img, _) => (
        <img
          src={img}
          className="2xl:w-80 xl:w-70 lg:w-50 w-40 px-2 py-2 rounded-2xl "
          alt={`image-${_}`}
        />
      ))}
    </Marquee>
  );
}
