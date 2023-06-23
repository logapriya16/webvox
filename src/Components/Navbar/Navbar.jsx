import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuhtContext } from "../../Contexts/AuthContext";
export default function Navbar() {
  const { Logout } = useContext(AuhtContext);
  return (
    <div>
      <div className="nav-items" style={{ padding: "1.5rem" }}>
        <Link className="nav-items" to="/">
          Home
        </Link>
      </div>

      <div className="nav-items">
        <Link className="nav-items" to="/explore">
          Explore
        </Link>
      </div>
      <div className="nav-items">
        <Link className="nav-items" to="/bookmark">
          Bookmarks
        </Link>
      </div>
      <div className="nav-items">
        <Link className="nav-items" to="/profile">
          My Profile
        </Link>
      </div>
      <div className="nav-items" onClick={() => Logout()}>
        Logout
      </div>
    </div>
  );
}
