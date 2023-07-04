import React from 'react';

import './css/Footer.css';

const Footer = () => {
  return (
    <footer dir='rtl' className='mt-0'>
      <div className=''>
        &copy; جميع الحقوق محفوظة لموقع مايت انمي | 𝖬itAnime
      </div>
      <div className='social__links'>
        <i className='fa-brands fa-facebook-f'></i>
        <i className='fa-brands fa-twitter'></i>
        <i className='fa-brands fa-youtube'></i>
        <i className='fa-brands fa-discord'></i>
        <i className='fa-brands fa-instagram'></i>
        <i className='fa-solid fa-paper-plane'></i>
      </div>
      <div className='links '>
        <a href='#dmca'> DMCA </a> | <a href='#contact-us'> Contact Us </a> |
        <a href='#news'> News </a> |{' '}
        <a target='_blank' href='https://github.com/nachat-ayoub'>
          Developer
        </a>
      </div>
    </footer>
  );
};

export default Footer;
