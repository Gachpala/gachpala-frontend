"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { inter } from "@/lib/fonts";
import Link from "next/link";
import { API_BASE_URL } from "@/app/config";

const PLACEHOLDER = "/banner-placeholder.svg";

export default function HeroSection() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/banners`);
        if (!res.ok) throw new Error(`Failed to load banners: ${res.status}`);
        const data = await res.json();
        setBanners(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Hero banner fetch error", err);
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const slides = useMemo(() => {
    if (!isLoading && banners.length === 0) {
      return [{ title: "", imageurl: PLACEHOLDER }];
    }
    return banners;
  }, [banners, isLoading]);

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

  const resolveImage = (url) => {
    if (!url) return PLACEHOLDER;

    const normalized = String(url).trim();
    if (!normalized) return PLACEHOLDER;
    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
      return normalized;
    }

    // If backend returns a plain filename like "banner1.png", use public path.
    if (!normalized.includes("/")) {
      return `/${normalized}`;
    }

    if (normalized.startsWith("/")) {
      return `${API_BASE_URL}${normalized}`;
    }

    return `${API_BASE_URL}/${normalized}`;
  };

  return (
    <section className="pt-4 pb-8">
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Slider - Full Width */}
        <div className="rounded-2xl overflow-hidden shadow-sm relative group">
          <Slider {...settings} className="h-full slick-hero">
            {(isLoading ? [{ title: "", imageurl: PLACEHOLDER }] : slides).map(
              (banner, i) => (
                <div
                  key={banner.imageurl ?? i}
                  className="relative aspect-16/8 md:aspect-21/9 w-full outline-none bg-gray-100"
                >
                  <img
                    src={resolveImage(banner.imageurl)}
                    className="w-full h-full object-cover block"
                    alt={banner.title || `Banner ${i + 1}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = PLACEHOLDER;
                    }}
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
