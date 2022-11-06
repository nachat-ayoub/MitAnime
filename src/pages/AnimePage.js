import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import AnimeEpRow from "../components/AnimeEpRow";
import LoadingSpinner from "../components/LoadingSpinner";

import "./css/AnimePage.css";

const AnimePage = () => {
  const { slug } = useParams();

  const [Data, setData] = useState(null);

  const fetchData = async (slug) => {
    try {
      const url = process.env.REACT_APP_API_BASE_URL + "anime/" + slug;
      const { data } = await axios.get(url);
      // console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData(slug);
    } else console.log("No Anime Slug Was Found!");
  }, [slug]);

  return (
    <div style={{ flex: 1 }} className="d-flex flex-column animePage">
      <Helmet>
        <title>
          {`
          جميع حلقات انمي ${Data?.title}
          مترجمة اون لاين - MitAnime`}
        </title>

        <link rel="canonical" href={`/anime/${Data?.slug}`} />
        <meta
          name="description"
          content={`جميع حلقات انمي ${
            Data?.title || " "
          } مترجمة اون لاين بجودة عالية وتحميل مباشر ${
            Data?.title || " "
          } مترجم كامل على موقع مايت انمي.`}
        />
        <meta property="og:locale" content="ar_AR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MitAnime" />
        <meta
          property="og:description"
          content="مايت انمي MitAnime لمشاهدة جميع الانميات اون لاين وافلام الانمي مترجم بجودة عالية اون لاين."
        />
        <meta property="og:url" content={`/anime/${Data?.slug}`} />
        <meta property="og:site_name" content="MitAnime" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/logo512.png" />
      </Helmet>

      {!Data ? (
        <LoadingSpinner className="" />
      ) : (
        <>
          <section className="animeInfo w-100 py-5">
            <div
              dir="rtl"
              className="sectionWrapper container d-flex justify-content-end align-items-start w-100 h-fit-content"
            >
              <div className="animePoster mx-3">
                <img src={Data?.images.anime_image} alt={Data?.title} />
              </div>
              <div className="container-fluid animeDetails ">
                <h1 className="animeTitle text-white">{Data?.title}</h1>
                <div className="animeGenres">
                  {Data?.genre.map((e, i) => {
                    return (
                      <span key={i} className="genreBtn">
                        {e.text}
                      </span>
                    );
                  })}
                </div>
                <p className="animeStory">{Data?.story}</p>
                <div className="row w-100 ">
                  <div className="col-md-6 col-sm-12">
                    النوع:
                    {/*  */ " "}
                    <span className="marked">{Data?.anime_type.text}</span>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    حالة الأنمي:
                    {/*  */ " "}
                    <span className="marked">{Data?.anime_status.text}</span>
                  </div>
                </div>
                <div className="infoBtns mt-3">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={Data?.trailer}
                    className="colored "
                  >
                    <i className="fa-regular fa-circle-play ms-1"></i>
                    {/*  */}
                    العرض التشويقي
                    {/*  */}
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={Data?.MAL}
                    className="outlined"
                  >
                    <i className="fa-solid fa-globe-asia ms-1"></i>
                    {/*  */}
                    صفحة الأنمي على موقع MAL
                    {/*  */}
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="w-100">
            <AnimeEpRow data={Data?.episodes} image={Data?.images.ep_image} />
          </section>
        </>
      )}
    </div>
  );
};

export default AnimePage;
