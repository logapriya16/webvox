import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineWebhook } from "react-icons/md";
import {ImHome} from "react-icons/im"
import "./UpperNav.css"
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react"
import { AuhtContext } from "../Contexts/AuthContext";
import ProfileComponent from "./UserprofileComponet/UserProfileComponent";

export default function UpperNav() {
  const navigate = useNavigate();
  const {avatar} =useContext(UserContext)
  const {active_user} = useContext(AuhtContext)
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
          <ImHome/>
        </span>
        <span
          style={{ display: "inline", padding: "1rem",cursor:"pointer" }}
          onClick={() => {navigate("/profile"); ProfileComponent(active_user.id) }}
        >
          <img src={avatar} alt="" height="40px" style={{borderRadius:"50%"}}/>
        </span>
        <span style={{ display: "inline" }}> B/D mode</span>
      </div>
    </div>
  );
}
