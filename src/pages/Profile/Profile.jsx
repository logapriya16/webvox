import React, {  useContext,  } from "react";
import UpperNav from "../../Components/UpperNav";
import Navbar from "../../Components/Navbar/Navbar";
import UserList from "../../Components/UserList/UserList";
import "./Profile.css";
import ProfileComponent from "../../Components/UserprofileComponet/UserProfileComponent";
import { PostContext } from "../../Contexts/PostContext";

export default function Profile() {
  const { postState } = useContext(PostContext);
  

  return (
    <div>
      <UpperNav />
      <div className="profile-container">
        <div>
          <Navbar />
        </div>
        <div className="profile-area">
          <ProfileComponent />
        </div>
        <div className="user-list">
          <UserList />
        </div>
      </div>
    </div>
  );
}
