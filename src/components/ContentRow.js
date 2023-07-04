import React from 'react';
import SliderComponent from '../pages/SliderComponent';

import './css/ContentRow.css';
import EpisodeCard from './EpisodeCard';

const ContentRow = ({ data, title, isEp, hideTriangle }) => {
  return (
    <>
      {data.length > 0 && (
        <div
          className='container-fluid Row_wrapper pt-5'
          style={{
            backgroundColor: isEp ? '#131722' : '#181d2b',
          }}
        >
          <span
            style={{
              borderTop: `40px solid ${isEp ? '#131722' : '#181d2b'}`,
            }}
            className={'triangle ' + (hideTriangle ? 'd-none' : '')}
          ></span>

          {isEp ? (
            <div className='container titlesSection d-flex justify-content-between align-items-center flex-row w-100'>
              <h5 className='category_title more mb-3'>{`
              المزيد من الحلقات 
              `}</h5>
              <h5 className='category_title mb-3'>{title}</h5>
            </div>
          ) : (
            <div className='container titlesSection d-flex justify-content-end align-items-center w-100'>
              <div className=''></div>
              <h5 className='category_title mb-3'>{title}</h5>
            </div>
          )}

          <div className='w-100 slide-test d-flex'>
            {isEp ? (
              <div dir='rtl' className='episodes container pb-5 '>
                {data?.map((e, i) => {
                  return <EpisodeCard key={i} ep={e} />;
                })}
              </div>
            ) : (
              <SliderComponent data={data} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentRow;
