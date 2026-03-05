"use client";
import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE = "https://api.gachpala.com";
const PLACEHOLDER = "/plant-placeholder.png";

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}/banners`);
        if (!res.ok) throw new Error(`Failed to load banners: ${res.status}`);
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

  const slides = useMemo(() => {
    if (!isLoading && banners.length === 0) {
      return [{ title: "", imageurl: PLACEHOLDER }];
    }
    return banners;
  }, [banners, isLoading]);

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

  const resolveImage = (url) => {
    if (!url) return PLACEHOLDER;
    if (url.startsWith("http")) return url;
    return `${API_BASE}${url}`;
  };

  return (
    <div className="slider-container overflow-hidden w-full">
      <Slider {...settings}>
        {(isLoading ? [{ title: "", imageurl: PLACEHOLDER }] : slides).map(
          (banner, idx) => (
            <div className="outline-none" key={banner.imageurl ?? idx}>
              <img
                id="bannerImg"
                src={resolveImage(banner.imageurl)}
                className="w-full h-auto object-cover min-h-[250px] md:min-h-[400px]"
                alt={banner.title || "Banner"}
                loading="lazy"
              />
            </div>
          ),
        )}
      </Slider>
    </div>
  );
}
