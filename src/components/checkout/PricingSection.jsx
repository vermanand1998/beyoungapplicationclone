import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import { toast } from "react-toastify";
import { newOrder } from "../../utils/orderAPI";
import { useUpdateCartNumbers } from "../../context/CartItemNumbersContext";
import { deleteItemFromCart } from "../../utils/cartAPI";
import { useLoader } from "../../context/LoaderContext";
import SuccessModal from "./SuccessModal";
import { useSuccessModal } from "../../context/SuccessModalContext";

const PricingSection = () => {
  const {
    totalItems,
    totalPrice,
    checkoutAddress,
    paymentValid,
    products,
    updatePaymentValid,
    updateCheckoutAddress,
    updateProducts,
    updateTotalItems,
    updateTotalPrice,
  } = useCheckout();
  const updateCart = useUpdateCartNumbers();

  const { updateLoaderStatus } = useLoader();

  const { updateSuccessmodal } = useSuccessModal();

  const navigate = useNavigate();

  const location = useLocation();
  const currentRoute = location.pathname.split("/");
  const currentPage = currentRoute[currentRoute.length - 1];

  // this function is responsible for handling how should the next step button in checkout should perform
  // on diffrent pages by identifying current page and showing errors if user has not completed all the steps on current page
  const handleCheckout = (e) => {
    e.preventDefault();
    if (currentPage === "cart") {
      navigate("/checkout/shipping");
      console.log(products);
    } else if (currentPage === "shipping") {
      if (Object.keys(checkoutAddress).length) {
        navigate("/checkout/payment");
      } else {
        toast.error("Please verify your address again!");
      }
    } else if (currentPage === "payment") {
      if (paymentValid) {
        createOrder();
      } else {
        toast.error("Please verify your payment details again!");
      }
    }
  };

  // function to place an order, if there are multiple items in the cart
  // then it runs a loop and place all orders individually and finally reset all the required states
  const createOrder = async () => {
    try {
      updateLoaderStatus(true);
      for (const { product, quantity } of products) {
        const res = await newOrder(product._id, quantity, checkoutAddress);
        if (res.status === "success") {
          deleteItemFromCart(product._id);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateSuccessmodal(true);
      navigate("/");
      updatePaymentValid(false);
      updateCheckoutAddress({});
      updateProducts([]);
      updateTotalItems(0);
      updateTotalPrice(0);
      updateCart(0);
      updateLoaderStatus(false);
    }
  };

  // function to delete all the items from the cart by running a loop and deleting individual items
  // and finally updates all the required states accordingly
  const clearWholeCart = async () => {
    try {
      updateLoaderStatus(true);
      console.log(products);

      for (const { product } of products) {
        const res = await deleteItemFromCart(product._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, see console for more detail.");
    } finally {
      updateProducts([]);
      updateLoaderStatus(false);
      updateTotalItems(0);
      updateTotalPrice(0);
      updateCart(0);
    }
  };
  return (
    <div className="pricing-section-container">
      <section className="pricing-section">
        <h4>
          price details{" "}
          <span>
            ({totalItems} {totalItems > 1 ? "items" : "item"})
          </span>
        </h4>
        <Divider />
        <span>
          <p>Total MRP (Inc. of Taxes)</p>
          <p>&#8377;{totalPrice}</p>
        </span>
        <span>
          <p>Shipping</p>
          <p style={{ color: "#49BA49" }}>
            <i>Free</i>
          </p>
        </span>
        <span>
          <p>Cart Total</p>
          <p>&#8377;{totalPrice}</p>
        </span>
      </section>
      <section className="checkout-action">
        <p>
          <span>Total Amount</span>
          <span>&#8377;{totalPrice}</span>
        </p>
        <button onClick={handleCheckout}>checkout securely</button>
        {currentPage === "cart" && (
          <button style={{ marginTop: "1rem" }} onClick={clearWholeCart}>
            Clear Cart
          </button>
        )}
      </section>
    </div>
  );
};

export default PricingSection;
