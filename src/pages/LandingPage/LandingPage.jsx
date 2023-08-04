import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import UpperNav from "../../Components/UpperNav";
import UserList from "../../Components/UserList/UserList";
import Newpost from "../../Components/NewPost/Newpost";
import PostDisplay from "../../Components/PostDisplay/PostDisplay";

import { AuhtContext } from "../../Contexts/AuthContext";
import { PostContext } from "../../Contexts/PostContext";

export default function LandingPage() {
  const { active_user } = useContext(AuhtContext);
  const { postState } = useContext(PostContext);
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [homepost, setHomepost] = useState([]);
  const IsFollowers = active_user.following.map((user) => user.username);
  const filterHomePost = followers.map((follower) =>
    postState.allpost.map((post) => {
      return post.username === follower ? post : null;
    })
  );
  // console.log(
  //   followers.map((follower) =>
  //     postState.allpost.map((post) => {
  //       return post.username === active_user.username ||
  //         post.username === follower
  //         ? post
  //         : null;
  //     })
  //   )
  // );
  console.log(homepost)
  useEffect(() => {
    setFollowers(IsFollowers);
    setHomepost(filterHomePost);
  }, [active_user]);
  return (
    <div>
      <UpperNav />
      <div className="landing-container">
        <div className="landing-body">
          <div className="side-nav">
            <Navbar />
          </div>
          <div className="post-area">
            <div className="new-post ">
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
            {postState.allpost.map((post) => (
              <PostDisplay item={post} />
            ))}
          </div>
          <div className="users-list hide2">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}
