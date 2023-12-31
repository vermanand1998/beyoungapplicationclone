import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/header.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logoSVG from "../../Logo.svg";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShoppingCartIcon2 from '../../assets/shoppingcarticon.svg'
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "../authentication/Login";
import { useAuth, useUpdateLoginModalStatus, useUpdateLoginStatus } from "../../context/AuthContext";
import { toast } from "react-toastify";

import { Badge, ClickAwayListener, Popper, TextField, useMediaQuery } from "@mui/material";
import {
  useCartNumbers,
  useUpdateCartNumbers,
  useUpdateWishlistNumbers,
  useWishlistNumbers,
} from "../../context/CartItemNumbersContext";
import ShoppingCartIcon from "../../assets/ShoppingCartIcon";

const Header = () => {
  const loginStatus = useAuth();
  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers()
  const numberOfCartItems = useCartNumbers();
  const numberOfWishlistItems = useWishlistNumbers();
  const setShowLoginModal = useUpdateLoginModalStatus();

  const toggelBtnRef = useRef()

  const [searchParams, setSearchParams] = useSearchParams();


  const isSmallScreen = useMediaQuery('(max-width:769px)');

  const HandleClick =()=>{
    if (isSmallScreen) {
      toggelBtnRef.current.click()
    }
  }
  
  // function to logout user by deleting the session data from localstorage
  // and update the required states accordingly
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    updateLoginStatus(false);
    toast.success("Logged out succesfully", { position: "bottom-left" });
    updateCartNumbers(0);
    updateWishlistNumbers(0)
  };

  useEffect(() => {
    const navbar = document.querySelector(".nav-header");
    const container = document.querySelector(".app-header");

    const promoHeader = document.querySelector(".promo-header");
    const quickAccessHeader = document.querySelector(".quick-access-header");

    // function to identify where should the navbar gets fixed
    const handleScroll = () => {
      if (
        window.scrollY >
        container.offsetTop +
          promoHeader.clientHeight +
          quickAccessHeader.clientHeight
      ) {
        navbar.classList.add("fixed");
      } else {
        navbar.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const searchInputRef = useRef()
  const navigate = useNavigate()

  // function to show or hide the searchbar
  const handleSearchBtnClick = (event) => {
    if (anchorEl) {
      setIsSearchbarOpen(false);
      setAnchorEl(null);
    } else {
      setIsSearchbarOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  // function to handle search by navigating user to the required route with required query parameters
  const handleSearch = ()=>{
    const {value} = searchInputRef.current;
    setIsSearchbarOpen(false);
    navigate(`/products?name=${value}`)
  }
   
  // function to show authentication modal and render correct form in modal 
  // by identifying the target button(login or signup) and updating the query parameters accordingly
  const handleSignin = (e) => {
    e.preventDefault();
    if (e.target.value==='signup') {
      searchParams.set('q', 'signup');
      setSearchParams(searchParams);
    }else{
      searchParams.delete('q')
      setSearchParams(searchParams)
    }
    setShowLoginModal(true);
  };


  return (
    <div className="app-header">
      <section className="promo-header">
        <span>Free Shipping on All Orders |</span> Get Extra ₹100 OFF on minimum
        purchase of ₹999{" "}
      </section>
      <section className="quick-access-header">
        <div className="quick-access-left">
          <Link to={'/myaccount/orders'}>
            <LocationOnIcon />
            TRACK YOUR ORDER
          </Link>
        </div>
        <div className="quick-access-right">
          {loginStatus ? (
            <>
              <button onClick={()=>navigate('/myaccount')}>My Account</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleSignin}>LOG IN</button>
              <button onClick={handleSignin} value={'signup'}>SIGN UP</button>
            </>
          )}
        </div>
      </section>
      <section className="nav-header">
        <div className="nav-left">
          <button
          ref={toggelBtnRef}
            className="d-lg-none d-md-none nav-toggel-button collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#collapsNavbar"

          >
            <MenuIcon sx={{ height: "35px", width: "35px" }} />
          </button>
          <div className="nav-left-items">
            <Link to={"/"} className="nav-logo">
              <img src={logoSVG} alt="Logo" />
            </Link>
            <div
              className="collapse navbar-collapse d-lg-block d-md-block"
              id="collapsNavbar"
            >
              <nav className="nav-items ">
                <NavLink onClick={HandleClick}  to={"/products?gender=men"}>Men</NavLink>
                <NavLink onClick={HandleClick} to={"/products?gender=women"}>Women</NavLink>
                <NavLink onClick={HandleClick} to={"/products?sellerTag=new arrival"}>
                  New arrivals
                </NavLink>
                <NavLink onClick={HandleClick} to={"/products?q=shop all"}>Shop All</NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleSearchBtnClick}>
            <SearchIcon />
          </button>
          <Link to={'myaccount/wishlist'}>
            <Badge badgeContent={numberOfWishlistItems} >
            <FavoriteBorderIcon />
            </Badge>
          </Link>
          <Link to={'/cart'} >
            <Badge badgeContent={numberOfCartItems}  >
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </section>
      
      {isSearchbarOpen && (
        <ClickAwayListener onClickAway={handleSearchBtnClick}>
          <Popper open={isSearchbarOpen} anchorEl={anchorEl} placement="bottom-end" >
            <div className="search-bar">
              <input id="searchBarInput" type="text" placeholder="Search entire store here..." ref={searchInputRef}/>
              <button onClick={handleSearch}>Search</button>
            </div>
          </Popper>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Header;
