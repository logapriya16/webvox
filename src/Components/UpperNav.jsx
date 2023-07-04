import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineWebhook } from "react-icons/md";
import { ImHome } from "react-icons/im";
import "./UpperNav.css";
import { useContext } from "react";
import { AuhtContext } from "../Contexts/AuthContext";

export default function UpperNav() {
  const navigate = useNavigate();
  const { active_user, authState } = useContext(AuhtContext);
  return (
    <div className="upper-nav-container">
      <MdOutlineWebhook className="brand-icon" />
      <h1 className="brand-name" onClick={() => navigate("/")}>
        WebVox
      </h1>
      <input className="nav-search" type="search" placeholder="search user" />
      <div className="nav-elements">
        <span onClick={() => navigate("/")}>
          <ImHome />
        </span>
        <span
          style={{ display: "inline", padding: "1rem", cursor: "pointer" }}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <img
            src={authState.avatar}
            alt=""
            height="40px"
            style={{ borderRadius: "50%" }}
          />
        </span>
        <span style={{ display: "inline" }}> B/D mode</span>
      </div>
    </div>
  );
}
