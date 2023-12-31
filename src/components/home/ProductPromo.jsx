import React from "react";
import PromoBanner1 from "../../assets/promo-baner-1.jpg";
import PromoBanner2 from "../../assets/promo-baner-2.jpg";
import PromoProduct1 from "../../assets/product-off-1.jpg";
import PromoProduct2 from "../../assets/product-off-2.jpg";
import PromoProduct3 from "../../assets/product-off-3.jpg";
import PromoProduct4 from "../../assets/product-off-4.jpg";
import PromoProduct5 from "../../assets/product-off-5.jpg";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

const ProductPromo = () => {
  const promoProducts = [
    PromoProduct1,
    PromoProduct2,
    PromoProduct3,
    PromoProduct4,
    PromoProduct5,
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 3000, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="product-promo-container">
      <section className="promo-banner">
        <Link to={'/products?q=shop all'}><img src={PromoBanner1} alt="promotional-banner" /></Link>
        <Link to={'/products?q=shop all'}><img src={PromoBanner2} alt="promotional-banner" /></Link>
      </section>
      <section className="promo-products-slider">
        <h3>BIG SAVING ZONE</h3>
        <Carousel responsive={responsive} infinite={true}>
          {promoProducts.map((product, i) => (
            <div className="slider-item-wrapper" key={i}>
              <Link  to={'/products?q=shop all'}><img src={product} style={{width:'100%'}} alt="promotional-products" /></Link>
            </div>
          ))}
        </Carousel>
        ;
      </section>
    </div>
  );
};

export default ProductPromo;
