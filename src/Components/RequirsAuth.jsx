import React, { useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuhtContext } from "../Contexts/AuthContext";

export default function RequirsAuth({ children }) {

  let location = useLocation();
  const { authState } = useContext(AuhtContext);
  return authState.E_token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
