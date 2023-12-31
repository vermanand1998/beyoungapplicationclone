import React from "react";
import Carousel from "react-multi-carousel";
import ProductSliderCard from "./ProductSliderCard";

const ProductSlider = ({ products,heading }) => {

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
    <>
    <h3>{heading}</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
      >
        {products.map((product, i) => (
          <ProductSliderCard key={i} product={product} />
        ))}
      </Carousel>
    </>
  );
};

export default ProductSlider;
