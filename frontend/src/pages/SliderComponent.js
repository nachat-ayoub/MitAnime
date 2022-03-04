import React from "react";

import "./css/Slider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import AnimeCard from "../components/AnimeCard";

const SliderComponent = ({ data }) => {
  const settings = {
    speed: 200,
    slidesToShow: 4,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container pb-5 text-white d-flex justify-content-start align-content-center flex-column">
      <div className="slider ">
        <div className="w-100">
          <Slider {...settings}>
            {data?.map((e, i) => {
              return <AnimeCard anime={e} key={i} />;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} className={" arrows next"}>
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};
const PrevArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} className={" arrows prev"}>
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
};

export default SliderComponent;
