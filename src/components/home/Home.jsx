import React from 'react'
import "../../styles/home.css";
import HeroComponent from './HeroComponent';
import OfferComponent from './OfferComponent';
import ProductPromo from './ProductPromo';
import NewArrivals from './NewArrivals';
import ourAchievement from '../../assets/achievement.png'
import fashionbetter from '../../assets/fashionbetter.jpg'
import shippingbanner from '../../assets/shipping-banner.jpg'
import brandsbanner from '../../assets/brands-banner.jpg'
import Categories from './Categories';
import BestSeller from './BestSeller';
import Reviews from './Reviews';



const Home = () => {

  return (
    <>
    <div className='home-container'>
      <HeroComponent/>
      <OfferComponent/>
      <ProductPromo/>
      <NewArrivals/>
      <section className="our-achievements" style={{marginTop:'2px'}}>
        <img src={ourAchievement} style={{width:'100%'}} alt='Be-Young fashion store' />
      </section>
      <Categories/>
      <section className='fashion-better-banner'>
        <img src={fashionbetter} style={{width:'100%', marginTop:'0.5rem'}} alt="we made your fashion better" />
      </section>
      <BestSeller/>
      <Reviews/>
      <section><img src={shippingbanner} style={{width:'100%'}} alt="Be Young fashion store" /></section>
      <section><img src={brandsbanner} style={{width:'100%'}} alt="Be Young fashion store" /></section>
    </div>
    </>
  )
}

export default Home