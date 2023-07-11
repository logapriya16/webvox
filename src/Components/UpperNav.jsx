import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MdOutlineWebhook } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { HiSun } from "react-icons/hi";
import { BsFillMoonFill } from "react-icons/bs";

import "./UpperNav.css";
import { AuhtContext } from "../Contexts/AuthContext";
import { UserContext } from "../Contexts/UserContext";

export default function UpperNav() {
  const navigate = useNavigate();
  const { active_user } = useContext(AuhtContext);
  const { handleTheme, className, theme, setTheme } = useContext(UserContext);
  useEffect(() => {
    document.body.className = className;
  }, [className]);
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
            src={active_user.avatar}
            alt=""
            height="40px"
            style={{ borderRadius: "50%" }}
          />
        </span>
        <span>
          <HiSun
            style={{ display: theme ? "none" : "inline" }}
            onClick={() => {
              handleTheme();
              setTheme(!theme);
            }}
          />
          <BsFillMoonFill
            onClick={() => {
              handleTheme();
              setTheme(!theme);
            }}
            style={{ display: theme ? "inline" : "none" }}
          />
        </span>
      </div>
    </div>
  );
}
