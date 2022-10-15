import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/AnimeEpRow.css";

const AnimeEpRow = ({ data, image }) => {
  const navigate = useNavigate();

  const [SearchQuery, setSearchQuery] = useState("");
  const [Data, setData] = useState(null);

  // console.log(Data);

  const search_Handler = () => {
    setData(data);
    if (Data !== null) {
      let filtred_data = data.filter((ep) => ep.ep_text.includes(SearchQuery));
      // console.log(filtred_data);
      setData(filtred_data);
    }

    if (SearchQuery === "") {
      setData(data);
    }
  };

  useEffect(() => {
    search_Handler();
  }, [data, SearchQuery]);

  return (
    <div dir="rtl" className="AnimeEpRow__Wrapper container">
      {Data !== null && (
        <>
          <div className="btn__Wrapper">
            <div className="btnColored">حلقات الأنمي</div>
            <input
              placeholder={`البحث عن حلقة`}
              className="searchBtnBlack"
              type="text"
              value={SearchQuery}
              onChange={(e) => setSearchQuery(e.target.value.trim())}
            />
          </div>
          <div className="epsContainer w-100">
            {Data &&
              Data.map((e, i) => {
                return (
                  <div
                    onClick={() => navigate("/episode/" + e.ep_slug)}
                    key={i}
                    className="ep"
                  >
                    <div className="overlay"></div>
                    <img src={image} alt={e.ep_text} />
                    <h2 className="epTitle">{e.ep_text}</h2>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeEpRow;
