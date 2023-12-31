import React, { useEffect, useState } from "react";
import CheckoutHeader from "../checkout/CheckoutHeader";
import CartItems from "./CartItems";
import PricingSection from "../checkout/PricingSection";
import "../../styles/cart.css";
import { getCartItems } from "../../utils/cartAPI";
import EmptyCart from "./EmptyCart";
import { useCheckout } from "../../context/CheckoutContext";
import { useLoader } from "../../context/LoaderContext";
import { useCartNumbers } from "../../context/CartItemNumbersContext";
import { toast } from "react-toastify";

const CartComponent = () => {
  const { products, updateProducts, updateTotalItems, updateTotalPrice } =
    useCheckout();
    const {updateLoaderStatus} = useLoader()
    const cartItemNumbers = useCartNumbers()
    

    // function to fetch cart items and update required states accordingly
  const fetchProducts = async () => {
    try {
      updateLoaderStatus(true)
      const res = await getCartItems();
      const { items, totalPrice } = res.data;
      updateProducts(items);
      updateTotalPrice(totalPrice);
      updateTotalItems(items.length);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, see console for more detail.')
    }finally{
      updateLoaderStatus(false)
    }
  };

  useEffect(() => {
    fetchProducts();

  }, [cartItemNumbers]);

  return (
    <div>
      <CheckoutHeader />
      {products.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="cart-container">
            <CartItems />
            <PricingSection />
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
