import React, { useContext } from "react";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import UpperNav from "../../Components/UpperNav";
import { AuhtContext } from "../../Contexts/AuthContext";
import UserList from "../../Components/UserList/UserList";
import Newpost from "../../Components/NewPost/Newpost";
import { UserContext } from "../../Contexts/UserContext";
import PostDisplay from "../../Components/PostDisplay/PostDisplay";
import { PostContext } from "../../Contexts/PostContext";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const { active_user,authState } = useContext(AuhtContext);
  const { avatar } = useContext(UserContext);
  const { postState } = useContext(PostContext);
  const navigate = useNavigate()
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
              <div onClick={()=>navigate('/profile')}>
                <img
                  src={authState.avatar}
                  alt=""
                  height="40px"
                  style={{ borderRadius: "50%" }}
                />
                <p>{active_user.username}</p>
              </div>
              <div>
                <Newpost />
              </div>
            </div>
            {postState.allpost.map((post) =>
              post.username === active_user.username ? (
                <PostDisplay item={post} />
              ) : null
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
