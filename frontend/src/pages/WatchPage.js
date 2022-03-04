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
      console.log(data);
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
      <div className="watch__section d-flex justify-content-center align-items-center py-5 ">
        <div
          dir="rtl"
          className=" container d-flex justify-content-center align-items-center flex-column col-9"
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
            src={ActiveServer}
            width="100%"
            height="400px"
            allowFullScreen={true}
            frameBorder="0"
          />
        </div>
        <div className="scroll__episodes__section container-fluid d-flex justify-content-center align-items-end flex-column col-3 pe-3 ps-0 pb-0 ">
          <div className="scroll__heading">جميع حلقات الأنمي</div>
          <ol className="scroll__container">
            {Data?.ep_list?.all.map((ep, ind) => {
              return (
                <li className="ep_li pe-4" key={ind}>
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
