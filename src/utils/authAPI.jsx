import axios from "axios";
import { headerWithProjectIdOnly, apiURL, headerWithJWT } from "./getHeaders";
import { toast } from "react-toastify";


// function to make api call for login
export const loginAPI = async (userInfo) => {
  const headers = headerWithProjectIdOnly();

  try {
    const res = await axios.post(`${apiURL}/user/login`, userInfo, headers);
    if (res.data.token) {
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("username", res.data.data.name);
      localStorage.setItem("useremail", res.data.data.email);
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call for sign up
export const signupAPI = async (userInfo) => {
  const headers = headerWithProjectIdOnly();
  try {
    const res = await axios.post(`${apiURL}/user/signup`, userInfo, headers);

    if (res.data.token) {
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("username", res.data.data.user.name);
      localStorage.setItem("useremail", res.data.data.user.email);
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call for updation of profile details(name or password)
export const updateProfileInfo = async (body, type) => {
  const headers = headerWithJWT();
  let requestUrl = apiURL;
  if (type == "password") {
    requestUrl += "/user/updateMyPassword";
  } else if (type == "username") {
    requestUrl += "/user/updateme";
  } else {
    toast.error("Something went wrong");
    return;
  }

  try {
    const res = await axios.patch(requestUrl, body, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call to delete the account
export const deleteMe = async(body)=>{
  const headers = headerWithJWT();
  console.log(headers);
  try{
    const res = await axios.delete(`${apiURL}/user/deleteMe`,headers,body);
    
    return true;

  }catch(error){
    return error;
  }
}

// function to make api call to reset the password
export const resetPasswordAPI = async(body)=>{
  const headers = headerWithProjectIdOnly();
  try {
    const res = axios.post(`${apiURL}/user/forgotPassword`,body,headers);
    return res;
  } catch (error) {
    return error;
  }
}
