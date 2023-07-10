import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import {MdOutlineTravelExplore} from "react-icons/md"
import {HiMiniHomeModern} from "react-icons/hi2"
import {IoBookmarkSharp} from "react-icons/io5"
import {LuLogOut} from "react-icons/lu"
import {CgProfile} from "react-icons/cg"
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
       <HiMiniHomeModern/> Home
      </Link>

      <Link
        to="/explore"
        className={
          splitLocation[1] === "explore" ? "nav-items active" : "nav-items"
        }
      >
       <MdOutlineTravelExplore/> Explore
      </Link>
      <Link
        className={
          splitLocation[1] === "bookmark" ? "nav-items active" : "nav-items"
        }
        to="/bookmark"
      ><IoBookmarkSharp/>
        Bookmarks
      </Link>
      <Link
        className={
          splitLocation[1] === "profile" ? "nav-items active" : "nav-items"
        }
        to="/profile"
      >
      <CgProfile/>  My Profile
      </Link>
      <div className="nav-items logout" onClick={() => Logout()}>
      <LuLogOut/>  Logout
      </div>
    </div>
  );
}
