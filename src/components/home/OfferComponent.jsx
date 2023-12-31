import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import bankOffer1 from '../../assets/bank-offer-1.png'
import bankOffer2 from '../../assets/bank-offer-2.png'
import bankOffer3 from '../../assets/bank-offer-3.png'
import bankOffer4 from '../../assets/bank-offer-4.png'
import bankOffer5 from '../../assets/bank-offer-5.png'


const OfferComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div className='bank-offer'>
        <Slider {...settings}>
            <Link ><img style={{width:"100%", display:'block'}} src={bankOffer1} alt="hero-banner" /></Link>
            <Link ><img style={{width:"100%", display:'block'}} src={bankOffer2} alt="hero-banner" /></Link>
            <Link ><img style={{width:"100%", display:'block'}} src={bankOffer3} alt="hero-banner" /></Link>
            <Link ><img style={{width:"100%", display:'block'}} src={bankOffer4} alt="hero-banner" /></Link>
            <Link  ><img style={{width:"100%", display:'block'}} src={bankOffer5} alt="hero-banner" /></Link>
        </Slider>
    </div>
  )
}

export default OfferComponent