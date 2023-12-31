import React from "react";
import Header from "./header/Header";
import { Navigate, Route, Routes } from "react-router";
import Home from "./home/Home";
import ProductsList from "./products/ProductsList";
import ProductComponent from "./products/ProductComponent";
import Footer from "./footer/Footer";
import Login from "./authentication/Login";
import ProtectedRoute from "./ProtectedRoute";
import MyAccount from "./myaccount/MyAccount";
import MyProfile from "./myaccount/MyProfile";
import MyOrders from "./myaccount/MyOrders";
import WishList from "./myaccount/WishList";
import SingleOrder from "./myaccount/SingleOrder";

const RoutesComponent = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductComponent />} />

        <Route path="/myaccount" element={<ProtectedRoute Component={<MyAccount />} />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<SingleOrder/>} />
          <Route path="wishlist" element={<WishList />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Login />

      <Footer />
    </>
  );
};

export default RoutesComponent;
