import React, { useEffect, useState } from "react";
// import IframeResizer from "iframe-resizer-react";
import { Link, useParams } from "react-router-dom";

import { DiscussionEmbed } from "disqus-react";

import axios from "axios";

import "./css/WatchPage.css";

const WatchPage = () => {
  const { slug } = useParams();

  const [Data, setData] = useState(null);

  const fetchData = async (slug) => {
    try {
      const url = process.env.REACT_APP_API_BASE_URL + "watch/" + slug;
      const { data } = await axios.get(url);
      // console.log(data);
      setActiveServer(data?.servers?.active?.link);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData(slug);
    } else console.log("No Episode Slug Was Found!");
  }, [slug]);

  const [ActiveServer, setActiveServer] = useState("");

  return (
    <div className="watch__page">
      <div className="watch__section py-3">
        <div className="row m-0">
          <div
            dir="rtl"
            className="container m-0 d-flex justify-content-center align-items-center flex-column col-sm-12 col-md-8 mb-3"
          >
            <ul className="d-flex flex-wrap">
              {Data?.servers?.all.map((e, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => setActiveServer(e.link)}
                    className={`${
                      ActiveServer === e.link ? "active " : " "
                    }   server-btn m-1`}
                  >
                    {e.name}
                  </li>
                );
              })}
            </ul>
            <iframe
              title={Data?.animeLink.title}
              src={ActiveServer}
              width="100%"
              height="400px"
              allowFullScreen={true}
              frameBorder="0"
            />
          </div>

          <div className="d-flex justify-content-center align-items-center col-sm-12 col-md-3 p-0">
            <div className="scroll__episodes__section d-flex justify-content-center align-items-end flex-column p-0 m-0">
              <div className="scroll__heading">جميع حلقات الأنمي</div>
              <ol className="scroll__container">
                {Data?.ep_list?.all.map((ep, ind) => {
                  return (
                    <li key={ind} className="ep_li pe-4">
                      <Link to={"/episode/" + ep.ep_slug} className="ep_link">
                        {ep.ep_text}
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <div className="ep__searchBox"></div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="w-100 d-flex justify-content-center align-items-center mt-4">
          <Link
            className="btnColored fw-bold nav-link text-white"
            to={`/anime/${Data?.animeLink.slug}`}
          >
            {Data?.animeLink.title}
          </Link>
        </div>
        {/*  */}
      </div>

      <div
        dir="rtl"
        className="download_area container w-100 d-flex justify-content-center align-items-center flex-column p-2 my-3"
      >
        <div className="mb-4">
          <span className="btnColored">روابط تحميل الحلقة</span>
        </div>
        <div className="bg-light col-md-10 col-sm-11 rounded p-4 d-flex flex-wrap row">
          {Data?.download_servers.map((el, ind) => (
            <div key={ind} className="col-md-6">
              <ul className="download_list d-flex flex-wrap">
                <li className="download_quality m-1">{el.quality}</li>
                {el?.servers.map((server, index) => (
                  <li key={index} className="download_server m-1">
                    <a href={server.link} target="_blank" rel="noreferrer">
                      {server.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="comments__section py-5 container">
        <DiscussionEmbed
          shortname="MitAnime"
          config={{
            url: process.env.REACT_APP_URL || "http://localhost:3000",
            identifier: slug,
            title: slug.replace(/[-]/g, " "),
            language: "ar",
          }}
        />
      </div>
    </div>
  );
};

export default WatchPage;
