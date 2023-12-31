import axios from "axios";
import { headerWithJWT, apiURL } from "./getHeaders";

// function to make api call to add an item to the cart
export const addItemToCart = async (id, qty) => {
  const headers = headerWithJWT();
  try {
    const res = await axios.patch(
      `${apiURL}/ecommerce/cart/${id}`,
      { quantity: qty },
      headers
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call to get the cart items
export const getCartItems = async () => {
  const headers = headerWithJWT();
  try {
    const res = await axios.get(`${apiURL}/ecommerce/cart/`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// function to make api call to get the total number of items in the cart
export const getnumberOfCartItems = async () => {
  try {
    const res = await getCartItems();
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (id) => {
  const headers = headerWithJWT();
  try {
    const res = await axios.delete(
      `${apiURL}/ecommerce/cart/${id}`,
      headers
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};