import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import heroBanner1 from '../../assets/hero-baner-1.jpg'
import heroBanner2 from '../../assets/hero-baner-2.jpg'
import { Link } from 'react-router-dom';


const HeroComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className='hero-section'>
        <Slider {...settings}>
            <Link to={'/products?q=shop all'}><img style={{width:"100%", display:'block'}} src={heroBanner1} alt="hero-banner" /></Link>
            <Link to={'/products?q=shop all'}><img style={{width:"100%", display:'block'}} src={heroBanner2} alt="hero-banner" /></Link>
        </Slider>
    </div>
  )
}

export default HeroComponent