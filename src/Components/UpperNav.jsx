import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineWebhook } from "react-icons/md";
import "./UpperNav.css"
export default function UpperNav() {
  const navigate = useNavigate();
  return (
    <div className="upper-nav-container" >
      <MdOutlineWebhook
      className="brand-icon" />
      <h1
      className="brand-name"
         onClick={() => navigate("/")}
      >
        WebVox
      </h1>
      <input
      className="nav-search"
        
        type="search"
        placeholder="search user"
      />
      <div className="nav-elements">
        <span  onClick={() => navigate("/")}>
          Home
        </span>
        <span
          style={{ display: "inline", padding: "1rem" }}
          onClick={() => navigate("/profile")}
        >
          user image
        </span>
        <span style={{ display: "inline" }}> B/D mode</span>
      </div>
    </div>
  );
}
