import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Explore.css";
import UpperNav from "../../Components/UpperNav";
import UserList from "../../Components/UserList/UserList";
export default function Explore() {
  return (
    <div>
      <UpperNav />
      <div className="explore-container">
        <div className="side-nav">
          <Navbar />
        </div>
        <div className="explore-area"></div>
        <div className="users-list">
        <UserList/>
        </div>
      </div>
    </div>
  );
}
