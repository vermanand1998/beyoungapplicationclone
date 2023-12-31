import React from "react";
import logoSVG from "../../Logo.svg";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Link } from "react-router-dom";

const CheckoutHeader = () => {
  return (
    <div className="checkout-header">
      <section className="checkout-header-item left-checkout-header">
        <Link to={"/"} className="nav-logo">
          <img src={logoSVG} alt="Logo" />
        </Link>
      </section>
      <section className="checkout-header-item right-checkout-header">
        <GppGoodIcon sx={{ width: "3rem", height: "3rem" }} />
        <p>100% SECURE PAYMENT</p>
      </section>
    </div>
  );
};

export default CheckoutHeader;
