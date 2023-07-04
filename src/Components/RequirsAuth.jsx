import React, { useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";


export default function RequirsAuth({ children }) {

  let location = useLocation();
  const IsLogin = localStorage.getItem("data")
  return IsLogin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
