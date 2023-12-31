import React from "react";
import UpperNav from "../../Components/UpperNav";
import Navbar from "../../Components/Navbar/Navbar";
import UserList from "../../Components/UserList/UserList";
import "./Profile.css";
import ProfileComponent from "../../Components/UserprofileComponet/UserProfileComponent";

export default function Profile() {
  return (
    <div>
      <UpperNav />
      <div className="profile-container">
        <div className="side-nav">
          <Navbar />
        </div>
        <div className="profile-area">
          <ProfileComponent />
        </div>
        <div className="user-list hide2">
          <UserList />
        </div>
      </div>
    </div>
  );
}
