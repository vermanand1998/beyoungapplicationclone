import React from "react";
import emptycartimage from "../../assets/empty-cart.gif";
import { Navigate, useNavigate } from "react-router";

const EmptyCart = () => {
    const navigate = useNavigate();

    // this component renders when the cart is empty
  return (
    <div className="empty-cart">
      <section>
        <img src={emptycartimage} alt="empty-cart-banner" />
      </section>
      <section>
        <p className="empty-cart-upper-text">Your cart is empty and sad :(</p>
        <p className="empty-cart-lower-text">Add Something To Make It Happy!</p>
      </section>
      <section >
        <button onClick={()=>navigate('/')}>Continue Shopping</button>
      </section>
    </div>
  );
};

export default EmptyCart;
