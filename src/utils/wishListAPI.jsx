import axios from "axios";
import { headerWithJWT, apiURL } from "./getHeaders";


// function to make api call to add an item to the wishlist
export const addToFavAPI = async (body) => {
  const headers = headerWithJWT();

  try {
    const res = await axios.patch(
      `${apiURL}/ecommerce/wishlist`,
      body,
      headers
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call to get the items in the wishlist
export const getWishlistItems = async () => {
  const headers = headerWithJWT();
  try {
    const res = await axios.get(`${apiURL}/ecommerce/wishlist/`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call to delete an item from the wishlist
export const removeFromWishlist = async (id) => {
  const headers = headerWithJWT();
  try {
    const res = await axios.delete(`${apiURL}/ecommerce/wishlist/${id}`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call to get the total number of items in the wishlist
export const getnumberOfWishlistItems = async ()=>{
    try {
      const res = await getWishlistItems();
      return res.results
    } catch (error) {
     console.log(error);
    }
  }

  // function to make api call to delete all the items from the wishlist
  export const clearWishList = async ()=>{
    const headers = headerWithJWT();
  try {
    const res = await axios.delete(`${apiURL}/ecommerce/wishlist/`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
  }