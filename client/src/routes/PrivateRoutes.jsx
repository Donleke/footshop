import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../config/context";

export default function PrivateRoutes({ children }) {
  const location = useLocation();
  const { currentUser } = useStateContext();

  return (
    <>
      {currentUser ? (
        children
      ) : (
        <Navigate to={"/account"} state={{ from: location }} />
      )}
    </>
  );
}
