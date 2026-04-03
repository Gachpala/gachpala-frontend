"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSkeleton from "./bannerSkeleton";
import { API_BASE_URL } from "@/app/config";

const PLACEHOLDER = "/banner-placeholder.svg";

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/banners`);
        if (!res.ok) throw new Error(`Failed to load banners`);
        const data = await res.json();
        setBanners(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Banner fetch error", err);
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  const resolveBannerImage = (url) => {
    if (!url) return PLACEHOLDER;

    const normalized = String(url).trim();
    if (!normalized) return PLACEHOLDER;
    if (normalized === PLACEHOLDER) return PLACEHOLDER;
    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
      return normalized;
    }

    // If backend returns a plain filename like "banner1.png", prefer public assets.
    if (!normalized.includes("/")) {
      return `/${normalized}`;
    }

    if (normalized.startsWith("/")) {
      return `${API_BASE_URL}${normalized}`;
    }

    return `${API_BASE_URL}/${normalized}`;
  };

  const slides = banners.length
    ? banners
    : [{ title: "Banner", imageurl: PLACEHOLDER }];

  if (isLoading) {
    return (
      <div className="w-full">
        {[...Array(3)].map((_, i) => (
          <BannerSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {slides.map((banner, idx) => (
        <div key={banner.imageurl ?? idx}>
          <img
            src={resolveBannerImage(banner.imageurl)}
            className="w-full h-auto object-cover min-h-[250px] md:min-h-[400px]"
            alt={banner.title || "Banner"}
            onError={(event) => {
              event.currentTarget.src = PLACEHOLDER;
            }}
          />
        </div>
      ))}
    </Slider>
  );
}
