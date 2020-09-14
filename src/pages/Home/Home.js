import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import s from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
      >
        <img
          className={s.carousel__img}
          src={`https://dent.eco/images/slider1.jpg`}
          alt="loading"
        />
        <img
          className={s.carousel__img}
          src={`https://dent.eco/images/slider2.jpg`}
          alt="loading"
        />
        <img
          className={s.carousel__img}
          src={`https://dent.eco/images/slider3.jpg`}
          alt="loading"
        />
      </Carousel>
    </div>
  );
};

export default Home;
