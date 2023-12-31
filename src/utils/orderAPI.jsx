import axios from "axios";
import { headerWithJWT, apiURL } from "./getHeaders";


// function to make api call to create a new order
export const newOrder = async (id, qty, address) => {
  const headers = headerWithJWT();
  const body = {
    productId :id,
    quantity : qty,
    addressType: "HOME",
    address: address
  }

  try {
    const res = await axios.post(
        `${apiURL}/ecommerce/order`,
        body,
        headers
    )
    return res.data
  } catch (error) {
    return error.response.data;
  }
};


// function to make api call to get order history
export const getOrderHistory = async()=>{
  const headers = headerWithJWT();
  try {
    const res = await axios.get(`${apiURL}/ecommerce/order`,headers)
    return res.data
  } catch (error) {
    return error
  }
}

// function to make api call to get an order details
export const getOrderDetails = async(id)=>{
  const headers = headerWithJWT();
  try {
    const res = await axios.get(`${apiURL}/ecommerce/order/${id}`,headers)
    return res.data
  } catch (error) {
    return error.response.data
  }
}
