import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import NoContentFound from '../assets/images/no-contents.png';
import './css/SearchPage.css';

import LoadingSpinner from '../components/LoadingSpinner';
import AnimeCard from '../components/AnimeCard';
import { Helmet } from 'react-helmet-async';

const SearchPage = ({ Searched }) => {
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState('');

  const [searchParams] = useSearchParams();

  const fetchData = async (Search) => {
    try {
      const url = process.env.REACT_APP_API_BASE_URL + 'search/?s=' + Search;
      const { data } = await axios.get(url);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setData(null);
    setSearch(searchParams.get('s'));
    // console.log(Searched);
    fetchData(Searched || searchParams.get('s'));
  }, [searchParams, Searched]);

  return (
    <div
      dir='rtl'
      className='SearchPage__container d-flex justify-content-start align-items-center flex-column py-3'
      style={{ flex: 1 }}
    >
      <Helmet>
        <title>{`MitAnime - ${Searched} نتائج البحث عن الانمي`}</title>

        <link rel='canonical' href={`/search/?s=${Searched}`} />
        <meta
          name='description'
          content='مايت انمي MitAnime لمشاهدة جميع الانميات اون لاين وافلام الانمي مترجم بجودة عالية اون لاين.'
        />
        <meta property='og:locale' content='ar_AR' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='MitAnime' />
        <meta
          property='og:description'
          content='مايت انمي MitAnime لمشاهدة جميع الانميات اون لاين وافلام الانمي مترجم بجودة عالية اون لاين.'
        />
        <meta property='og:url' content='/' />
        <meta property='og:site_name' content='MitAnime' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:image' content='/logo512.png' />
      </Helmet>

      <h1 className='mb-5 title'>نتائج البحث عن [ {Search} ]</h1>

      {!Data ? (
        <LoadingSpinner />
      ) : (
        <div className='Search__results'>
          {Data?.notFound ? (
            <div className='w-100 d-flex justify-content-center align-items-center'>
              <img
                className='w-75'
                src={NoContentFound}
                alt='No Content Found'
              />
            </div>
          ) : (
            Data?.data?.map((e, i) => {
              return <AnimeCard anime={e} key={i} />;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
