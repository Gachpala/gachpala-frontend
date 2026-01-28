"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHOver: true,
  };

  return (
    <div className="slider-container overflow-hidden w-full">
      <Slider {...settings}>
        <div className="outline-none">
          <img
            id="bannerImg"
            src="/heroBanner.png"
            className="w-full h-auto object-cover min-h-[250px] md:min-h-[400px]"
            alt="Hero Banner"
          />
        </div>
        <div className="outline-none">
          <img
            id="bannerImg"
            src="/b2.gif"
            className="w-full h-auto object-cover min-h-[250px] md:min-h-[400px]"
            alt="Banner 2"
          />
        </div>
        <div className="outline-none">
          <img
            id="bannerImg"
            src="/b3.gif"
            className="w-full h-auto object-cover min-h-[250px] md:min-h-[400px]"
            alt="Banner 3"
          />
        </div>
        <div className="outline-none">
          <img
            id="bannerImg"
            src="/b4.gif"
            className="w-full h-auto object-cover min-h-[250px] md:min-h-[400px]"
            alt="Banner 4"
          />
        </div>
      </Slider>
    </div>
  );
}
