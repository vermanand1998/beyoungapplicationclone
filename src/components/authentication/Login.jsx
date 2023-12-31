import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../../styles/login.css";

import Modal from "@mui/material/Modal";
import loginBanner from "../../assets/login-banner.jpg";
import { Button, CircularProgress, TextField } from "@mui/material";
import { loginAPI, resetPasswordAPI, signupAPI } from "../../utils/authAPI";
import { toast } from "react-toastify";
import { useShowLoginModal, useUpdateLoginModalStatus, useUpdateLoginStatus } from "../../context/AuthContext";
import { getnumberOfCartItems } from "../../utils/cartAPI";
import { useUpdateCartNumbers, useUpdateWishlistNumbers } from "../../context/CartItemNumbersContext";
import { getnumberOfWishlistItems } from "../../utils/wishListAPI";
import { Link, useSearchParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@media (max-width: 768px)": {
    width: "90%", 
  },

};
const Login = () => {


  const open = useShowLoginModal()
  const setOpen = useUpdateLoginModalStatus();
  const [searchParams, setSearchParams] = useSearchParams();

  


  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    appType : "ecommerce"
  });
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [isResetPassForm, setIsResetPassForm] = useState(false)
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loader, setLoader] = useState(false)

  

  const updateLoginStatus = useUpdateLoginStatus();
  const updateCartNumbers = useUpdateCartNumbers();
  const updateWishlistNumbers = useUpdateWishlistNumbers()


// function to save input data and identify errors
  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(false);
    }
    if (name === "password" && value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError(false);
    }
    if (name === "name" && value.length < 4) {
      setNameError("Name must be at least 4 characters long.");
    } else {
      setNameError(false);
    }

    setUserInfo({ ...userInfo, [name]: value });
  };

  // function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // function to close the modal and reset all state
  const handleClose = () => {
    setUserInfo({
      name: "",
      email: "",
      password: "",
      appType : "ecommerce"
    })
    setOpen(false);
    searchParams.delete('q')
    setSearchParams(searchParams)
  }

  //  function to make api call for login or signup
  const handleAuth = async (e) => {
    e.preventDefault();
  
    try {
      setLoader(true)
      let res;
      if (isSignupForm) {
         res = await signupAPI(userInfo);
      } else {
        const user = {
          email: userInfo.email,
          password: userInfo.password,
          appType : "ecommerce"
        };
         res = await loginAPI(user);
      }
      if (res.token) {
        handleClose();
        toast.success("Logged in succesfully",{position: "bottom-left"});
        updateLoginStatus(true)
        const numberOfCartItems = await getnumberOfCartItems()
        const numberOfWishlistItems = await getnumberOfWishlistItems()
        updateCartNumbers(numberOfCartItems)
        updateWishlistNumbers(numberOfWishlistItems)
      }else{
        toast.error(res.message,{position: "bottom-left"});
      }
    } catch (error) {
      toast.error('Something went wrong!Please try again later.');
    }
    finally{
      setLoader(false)
    }
  };
  // function to make api call for resetting password
  const resetPassword = async()=>{
    console.log("reset");
    const body = { ...userInfo };
    delete body.appType; 
    
    try {
      const res = await resetPasswordAPI(body);
      console.log(res);
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  }

  // function to switch between login or signup form
  const authSwitch = (e) => {
    e.preventDefault();
    if (searchParams.get('q')) {
      searchParams.delete('q')
      setSearchParams(searchParams)
    }else{
      searchParams.set('q', 'signup');
      setSearchParams(searchParams);
    }
  };

  // function to show password reset form
  const showResetPassForm = (e)=>{
    e.preventDefault()
    searchParams.set('q', 'reset-password');
    setSearchParams(searchParams);
    console.log(searchParams.get('q'));
    console.log("xx");
  }

  // this useEffect block is responsible for showing form accordingly based on query parameters
  useEffect(()=>{
    if (searchParams.get('q')==='signup') {
      setIsSignupForm(true)
    }else if(searchParams.get('q')==='reset-password'){
      setIsResetPassForm(true);
      setIsSignupForm(true);
    }else{
      setIsSignupForm(false)
    setIsResetPassForm(false);
    }
  },[searchParams])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="login-container">
            <img
              src={loginBanner}
              alt="login-banner"
              style={{ width: "100%" }}
            />
            <div className="form-container">
              <h5>
                Login <span>or</span> Signup
              </h5>
              <p>Get Exciting Offers & Track Order</p>
              <form >
                {isSignupForm && (
                  <TextField
                    fullWidth
                    error={nameError}
                    helperText={nameError}
                    id="signup-name"
                    label="Name"
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChanges}
                    required
                  />
                )}
                <TextField
                  fullWidth
                  error={emailError}
                  helperText={emailError}
                  id="login-email"
                  label="Email"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChanges}
                  required
                />
                <TextField
                  fullWidth
                  error={passwordError}
                  helperText={passwordError}
                  id="login-password"
                  label="Password"
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChanges}
                  required
                />
                {!isSignupForm&&<button onClick={showResetPassForm} id="reser-pass-btn" >Forgot password?</button>}
                <Button
                  onClick={isResetPassForm?resetPassword: handleAuth}
                  variant="contained"
                  sx={{ "&:focus": { outline: "none" } }}
                >
                  {loader?<CircularProgress size={20} color="inherit" />:isSignupForm ? (isResetPassForm?"reset":"signup") : "login"}
                  
                </Button>
                <button onClick={authSwitch} className="auth-form-switch">
                  {isSignupForm
                    ? (isResetPassForm?"Remembered accidentally? ":"Alredy have an account? ")+"Sign in now"
                    : "Don't have an account? Sign up now."}
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
