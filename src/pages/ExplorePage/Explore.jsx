import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Explore.css";
import UpperNav from "../../Components/UpperNav";
import UserList from "../../Components/UserList/UserList";
import PostDisplay from "../../Components/PostDisplay/PostDisplay";
import { PostContext } from "../../Contexts/PostContext";

export default function Explore() {
  const { postState } = useContext(PostContext);
  return (
    <div>
      <UpperNav />
      <div className="explore-container">
        <div className="side-nav">
          <Navbar />
        </div>
        <div className="explore-area">
          {postState.allpost.map((post) => (
            <PostDisplay item={post} />
          ))}
        </div>
        <div className="users-list">
          <UserList />
        </div>
      </div>
    </div>
  );
}
