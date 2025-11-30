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
    <>
      <div className="slider-container overflow-hidden">
        <Slider {...settings}>
          <div>
            <img id="bannerImg" src="/heroBanner.png" rel="preload" />
          </div>
          <div>
            <img id="bannerImg" src="/b2.gif" rel="preload" />
          </div>
          <div>
            <img id="bannerImg" src="/b3.gif" rel="preload" />
          </div>
          <div>
            <img id="bannerImg" src="/b4.gif" rel="preload" />
          </div>
        </Slider>
      </div>
    </>
  );
}
