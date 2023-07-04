import React from 'react';
import { useNavigate } from 'react-router-dom';

import './css/AnimeCard.css';

const AnimeCard = ({ anime, Class }) => {
  const navigate = useNavigate();

  const goToAnimePage = () => {
    if (anime.anime_slug) navigate('/anime/' + anime.anime_slug);
    else navigate('/');
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '16rem',
      }}
      className={`d-flex justify-content-center align-items-center ${
        Class ? Class : ''
      }`}
    >
      <div onClick={() => goToAnimePage()} className='card'>
        <div className='card_poster'>
          <div className='overlay'></div>
          <img
            className='card_img'
            src={anime.imageUrl}
            alt={anime.anime_title}
          />
          <div className='status'> {anime.status.text} </div>
        </div>
        <div className='card_detailes py-3'>
          <div className='type'> {anime.type.text} </div>

          <div className='card_title'>
            {anime?.anime_title?.length > 20
              ? anime?.anime_title.slice(0, 20).trim() + '...'
              : anime?.anime_title}

            <div dir='rtl' className='card_story'>
              <strong>{anime.anime_title}</strong>
              <p>{anime?.story}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
