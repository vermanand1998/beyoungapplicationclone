import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth, useUpdateLoginModalStatus } from "../context/AuthContext";

const ProtectedRoute = ({ Component }) => {
  const loginStatus = useAuth();
  const setShowLoginModal = useUpdateLoginModalStatus();

  if (!loginStatus) {
    setShowLoginModal(true)
    return <Navigate to={"/"} />;
  }
  return <div>{Component}</div>;
};

export default ProtectedRoute;
