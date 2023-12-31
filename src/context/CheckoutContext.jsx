import React, { createContext, useContext, useState } from "react";


// this context is responsible for all the checkout related data
const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [totalItems, setTotalItems] = useState(
    parseInt(localStorage.getItem("totalItems")) || 0
  );
  const [totalPrice, setTotalPrice] = useState(
    parseInt(localStorage.getItem("totalPrice")) || 0
  );
  const [checkoutAddress, setCheckoutAddress] = useState(
    JSON.parse(localStorage.getItem("checkoutAddress")) || {}
  );
  const [paymentValid, setPaymentValid] = useState(false);

  // function to update the products need to be checked out
  const updateProducts = (newData) => {
    setProducts(newData);
    localStorage.setItem("products", JSON.stringify(newData));
  };
  // function to update the address for an order
  const updateCheckoutAddress = (newData) => {
    setCheckoutAddress(newData);
    localStorage.setItem("checkoutAddress", JSON.stringify(newData));
  };
  // function to indicate if the provided payment details are valid or not
  const updatePaymentValid = (newData) => {
    setPaymentValid(newData);
  };

  // function to update the total number of items in the checkout
  const updateTotalItems = (newData) => {
    setTotalItems(newData);
    localStorage.setItem("totalItems", newData);
  };
  // function to update the total price for the total items in the checkout
  const updateTotalPrice = (newData) => {
    setTotalPrice(newData);
    localStorage.setItem("totalPrice", newData);
  };

  return (
    <CheckoutContext.Provider
      value={{
        paymentValid,
        products,
        totalItems,
        totalPrice,
        checkoutAddress,
        updatePaymentValid,
        updateCheckoutAddress,
        updateProducts,
        updateTotalItems,
        updateTotalPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

// this custom hook returns all the required properties and function to update the properties required in the checkout process
export function useCheckout() {
  const context = useContext(CheckoutContext);

  return {
    products: context.products,
    totalItems: context.totalItems,
    totalPrice: context.totalPrice,
    checkoutAddress: context.checkoutAddress,
    paymentValid: context.paymentValid,
    updatePaymentValid: context.updatePaymentValid,
    updateCheckoutAddress: context.updateCheckoutAddress,
    updateProducts: context.updateProducts,
    updateTotalItems: context.updateTotalItems,
    updateTotalPrice: context.updateTotalPrice,
  };
}
