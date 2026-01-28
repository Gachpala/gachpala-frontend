"use client";
import { inter, openSans } from "@/lib/fonts";
import React from "react";
import Marquee from "react-fast-marquee";
import { FaInstagram } from "react-icons/fa";

export default function AutoPlayText() {
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
    <div className="py-12 bg-[#fcfdfa]">
      <div className="text-center mb-10">
        <h2
          className={`${inter.className} text-3xl font-bold mb-2 flex items-center justify-center gap-2`}
        >
          <FaInstagram className="text-green-600" /> @GachPala
        </h2>
        <p className={`${openSans.className} text-gray-500`}>
          Join our community of plant lovers
        </p>
      </div>
      <Marquee
        direction="left"
        speed={60}
        gradient={true}
        gradientColor={[249, 249, 249]}
        pauseOnHover={true}
        className="overflow-hidden py-4"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="mx-4 relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img}
              className="h-[120px] md:h-[200px] w-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
              alt={`Gallery image ${idx}`}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
