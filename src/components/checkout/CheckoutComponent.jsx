import React from "react";
import "../../styles/checkout.css";
import "../../styles/cart.css";
import EmptyCart from "../cart/EmptyCart";
import CheckoutHeader from "./CheckoutHeader";
import { Outlet } from "react-router";
import PricingSection from "./PricingSection";
import { useCheckout } from "../../context/CheckoutContext";

const CheckoutComponent = () => {
  
  const {totalItems,checkoutAddress} = useCheckout()

  return (
    <>
      <CheckoutHeader />
      {totalItems === 0 && Object.keys(checkoutAddress).length===0 ? (
        <EmptyCart />
      ) : (
        <div className="checkout-section cart-container">
          <Outlet />
          <PricingSection />
        </div>
      )}
    </>
  );
};

export default CheckoutComponent;
