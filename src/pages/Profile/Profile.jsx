import React, { Component } from "react";
import UpperNav from "../../Components/UpperNav";
import Navbar from "../../Components/Navbar/Navbar";
import UserList from "../../Components/UserList/UserList";
import "./Profile.css";
export default class Profile extends Component {
  render() {
    return (
      <div>
        <UpperNav />
        <div className="profile-container">
            <div>
              <Navbar/>
            </div>
            <div className="profile-area"></div>
            <div className="user-list">
            <UserList/>
            </div>
        </div>
      </div>
    );
  }
}
