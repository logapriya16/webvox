import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { AuhtContext } from "../../Contexts/AuthContext";
export default function Navbar() {
  const { Logout } = useContext(AuhtContext);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <div className="nav-container">
      <Link
        className={splitLocation[1] === "" ? "nav-items active" : "nav-items "}
        to="/"
      >
        Home
      </Link>

      <Link
        to="/explore"
        className={
          splitLocation[1] === "explore" ? "nav-items active" : "nav-items"
        }
      >
        Explore
      </Link>
      <Link
        className={
          splitLocation[1] === "bookmark" ? "nav-items active" : "nav-items"
        }
        to="/bookmark"
      >
        Bookmarks
      </Link>
      <Link
        className={
          splitLocation[1] === "profile" ? "nav-items active" : "nav-items"
        }
        to="/profile"
      >
        My Profile
      </Link>
      <div className="nav-items logout" onClick={() => Logout()}>
        Logout
      </div>
    </div>
  );
}
