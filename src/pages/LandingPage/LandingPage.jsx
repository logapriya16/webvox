import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import UpperNav from "../../Components/UpperNav";
import UserList from "../../Components/UserList/UserList";
import Newpost from "../../Components/NewPost/Newpost";
import PostDisplay from "../../Components/PostDisplay/PostDisplay";

import { AuhtContext } from "../../Contexts/AuthContext";
import { PostContext } from "../../Contexts/PostContext";
import { useState } from "react";

export default function LandingPage() {
  const { active_user } = useContext(AuhtContext);
  const { postState } = useContext(PostContext);
  const navigate = useNavigate();
  const [displayposts, setDisplayposts] = useState([]);
  // const LandingPagePost = postState.allpost.filter(
  //   (post) => post.username === active_user.username
  // )
  // setDisplayposts(LandingPagePost)

  // const LandingPagePosts = active_user.following.map((user) => {
  //   const isFollower = postState.allpost.find(
  //     (post) => post.username === user.username
  //   );
  //   return isFollower ? setDisplayposts(isFollower) : null;
  // });
 //console.log(displayposts);
  return (
    <div>
      <UpperNav />
      <div className="landing-container">
        <div className="landing-body">
          <div className="side-nav">
            <Navbar />
          </div>
          <div className="post-area">
            <div className="new-post">
              <div className="landing-profile">
                <img
                  className="cursor"
                  src={active_user.avatar}
                  alt=""
                  onClick={() => navigate("/profile")}
                  height="40px"
                  style={{ borderRadius: "50%" }}
                />
                <p>{active_user?.username}</p>
              </div>
              <div>
                <Newpost />
              </div>
            </div>
            {postState.allpost.map((post) =>
              post.username === active_user.username ? (
                <PostDisplay item={post} />
              ) :
              null
            )}
            {active_user.following.map((user) => {
              const isFollower = postState.allpost.find(
                (post) => post.username === user.username
              );

              return isFollower ? <PostDisplay item={isFollower} /> : null;
            })}
          </div>
          <div className="users-list">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}
