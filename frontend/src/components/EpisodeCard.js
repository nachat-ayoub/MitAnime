import React from "react";
import { useNavigate } from "react-router-dom";

import "./css/EpisodeCard.css";

const EpisodeCard = ({ ep }) => {
  const navigate = useNavigate();
  return (
    <div className="epCard">
      <div
        onClick={() => navigate("/episode/" + ep.ep_slug)}
        className="card_poster"
      >
        <div className="overlay"></div>
        <img className="card_img" src={ep.imageUrl} alt={ep.anime_title} />
        <div className="cardText">{ep.ep_number_text}</div>
      </div>
      <div className="card_detailes py-3">
        <div
          onClick={() => navigate("/anime/" + ep.anime_slug)}
          className="card_title"
        >
          {ep?.anime_title.length > 30
            ? ep?.anime_title.slice(0, 30).trim() + "..."
            : ep?.anime_title}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
