import React from "react";
import Carousel from "react-multi-carousel";
import review1 from '../../assets/review/review-1.jpg'
import review2 from '../../assets/review/review-2.jpg'
import review3 from '../../assets/review/review-3.jpg'
import review4 from '../../assets/review/review-4.jpg'
import review5 from '../../assets/review/review-5.jpg'
import review6 from '../../assets/review/review-6.jpg'
import review7 from '../../assets/review/review-7.jpg'


const Reviews = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 4,
    },

    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
  };
  return (
    <div className="reviews-container">
        <h3>BEYOUNGSTER'S REVIEW</h3>
      <Carousel responsive={responsive} infinite={true}>
            <div><img src={review1} style={{width:'100%'}} alt="review" /></div>
            <div><img src={review2} style={{width:'100%'}} alt="review" /></div>
            <div><img src={review3} style={{width:'100%'}} alt="review" /></div>
            <div><img src={review4} style={{width:'100%'}} alt="review" /></div>
            <div><img src={review5} style={{width:'100%'}} alt="review" /></div>
            <div><img src={review6} style={{width:'100%'}} alt="review" /></div>
            <div><img src={review7} style={{width:'100%'}} alt="review" /></div>
      </Carousel>
    </div>
  );
};

export default Reviews;
