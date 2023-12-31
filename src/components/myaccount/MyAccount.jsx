import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import "../../styles/myaccount.css";
import { Avatar, Stack, Typography, useMediaQuery } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateLoginStatus } from "../../context/AuthContext";
import {
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
} from "../../context/CartItemNumbersContext";
import DeleteMeDialoge from "./DeleteMeDialoge";

const MyAccount = () => {
  const name = localStorage.getItem("username");
  const [showDeleteDialoge, setShowDeleteDialoge] = useState(false)
  

  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers();

  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width:768px)");


  // thir ref and state is responsible for handling responsiveness for diffrent menu options on user account
  const collapsRef = useRef(null);
  const [collapsActive, setCollapsActive] = useState(false);
  const toggelCollaps = () => {
    setCollapsActive(!collapsActive);
  };

  // function to logout user by deletint the session data from the local storage and update required states accordingly
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    updateLoginStatus(false);
    toast.success("Logged out succesfully", { position: "bottom-left" });

    updateCartNumbers(0);
    updateWishlistNumbers(0);

    navigate("/");
  };

  const showDeletemeDialoge = ()=>{
    setShowDeleteDialoge(true);
  }

  return (
    <div className="my-account-container">
      <section className="my-ac-left-section">
        <div className="upper-sec">
          <Stack
            sx={{ margin: "1rem" }}
            alignItems="center"
            justifyContent="center"
            spacing={0.7}
          >
            <Avatar
              sx={{ height: "100px", width: "100px", background: "black" }}
            >
              {name
                .split(" ")
                .map((word) => word[0].toUpperCase())
                .join(" ")}
            </Avatar>
            <Typography sx={{ textTransform: "uppercase" }} variant="h5">
              {name}
            </Typography>
            <Typography sx={{ color: "gray" }} variant="subtitle1">
              #Beyoungster
            </Typography>
          </Stack>
        </div>
        {isSmallScreen && (
          <button onClick={toggelCollaps} className="profile-btn-collaps">
            <KeyboardDoubleArrowDownIcon />
          </button>
        )}
        <div
          className={`lower-sec ${collapsActive ? "collaps-active" : ""}`}
          ref={collapsRef}
        >
          <nav>
            <NavLink to={"profile"}>Profile</NavLink>
            <NavLink to={"orders"}>Order</NavLink>
            <NavLink to={"wishlist"}>Wishlist</NavLink>
          </nav>
          <section className="my-ac-btns">
            <Link onClick={showDeletemeDialoge}>Delete My Account</Link>
            <button onClick={handleLogout}>logout</button>
          </section>
        </div>
      </section>
      <DeleteMeDialoge open={showDeleteDialoge} setOpen={setShowDeleteDialoge} logout={handleLogout}/>

      <section className="my-ac-right-section">
        <Outlet />
      </section>
    </div>
  );
};

export default MyAccount;
