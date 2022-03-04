import React, { useRef, useState, useEffect } from "react";

import axios from "axios";

import "./css/Home.css";

import ContentRow from "../components/ContentRow";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "home"
        );
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page d-flex justify-content-center align-items-center flex-column">
      <Helmet>
        <title>MitAnime - مشاهدة وتحميل الانمي المترجم اون لاين</title>

        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="مايت انمي MitAnime لمشاهدة جميع الانميات اون لاين وافلام الانمي مترجم بجودة عالية اون لاين."
        ></meta>
        <meta property="og:locale" content="ar_AR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MitAnime" />
        <meta
          property="og:description"
          content="مايت انمي MitAnime لمشاهدة جميع الانميات اون لاين وافلام الانمي مترجم بجودة عالية اون لاين."
        />
        <meta property="og:url" content="/" />
        <meta property="og:site_name" content="MitAnime" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/logo512.png" />
      </Helmet>
      <div className="topSlider w-100">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {Data?.pinned_animes?.data.map((e, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  style={{
                    backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07),  rgba(0, 0, 0, 0.65)),
                    url('${e.EpImage}')`,
                  }}
                  className="imgSlider"
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="cardsRows w-100 d-flex justify-content-end align-items-center flex-column">
        {Data !== null &&
          Object.keys(Data).map((k) => {
            return (
              <ContentRow
                key={k}
                isEp={Data[k].isEp}
                data={Data[k].data}
                title={Data[k].category_title}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
