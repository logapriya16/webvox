import React from "react";
import { useNavigate } from "react-router-dom";

export default function UpperNav() {
  const navigate = useNavigate();
  return (
    <div>
      <img src="" alt="icon" />

      <h1
        style={{ display: "inline", paddingRight: "12rem", marginLeft: "0rem" }}
        onClick={() => navigate("/")}
      >
        WebVox
      </h1>
      <input
        style={{
          display: "inline",
          padding: "0.5rem",
          marginRight: "3rem",
          width: "50%",
          borderRadius: "20px",
        }}
        type="search"
        placeholder="search user"
      />
      <div style={{ display: "inline" }}>
        <p style={{ display: "inline" }} onClick={() => navigate("/")}>
          Home
        </p>
        <p
          style={{ display: "inline", padding: "1rem" }}
          onClick={() => navigate("/profile")}
        >
          user image
        </p>
        <p style={{ display: "inline" }}> B/D mode</p>
      </div>
    </div>
  );
}
