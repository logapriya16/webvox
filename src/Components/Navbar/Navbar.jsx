import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { HiMiniHomeModern } from "react-icons/hi2";
import { IoBookmarkSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
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
        <HiMiniHomeModern />

        <span className="hide">Home</span>
      </Link>

      <Link
        to="/explore"
        className={
          splitLocation[1] === "explore" ? "nav-items active" : "nav-items"
        }
      >
        <MdOutlineTravelExplore /> <span className="hide">Explore</span>
      </Link>
      <Link
        className={
          splitLocation[1] === "bookmark" ? "nav-items active" : "nav-items"
        }
        to="/bookmark"
      >
        <IoBookmarkSharp />
        <span className="hide">Bookmarks</span>
      </Link>
      <Link
        className={
          splitLocation[1] === "profile" ? "nav-items active" : "nav-items"
        }
        to="/profile"
      >
        <CgProfile /> <span className="hide">My Profile</span>
      </Link>
      <Link className="nav-items logout" onClick={() => Logout()}>
        <LuLogOut /> <span className="hide">Logout</span>
      </Link>
    </div>
  );
}
