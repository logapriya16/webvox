import React, { useContext, useState } from "react";
import { PostContext } from "../../Contexts/PostContext";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { UserContext } from "../../Contexts/UserContext";
import UpperNav from "../../Components/UpperNav";
import { AuhtContext } from "../../Contexts/AuthContext";
import { BookmarkContext } from "../../Contexts/BookmarkContext";

export default function LandingPage() {
  const {
    postState,
    TrendingHandler,
    LatestHandler,
    createPost,
    postChangeHandler,
    displayedit,
    setDisplatedit,
  } = useContext(PostContext);
  const { addToBookmark } = useContext(BookmarkContext);
  const { users } = useContext(UserContext);
  const { active_user } = useContext(AuhtContext);
  const [postText, setPostText] = useState("");
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
              <div>
                <span>{active_user.username}</span>
                <textarea
                  name="edit-post"
                  onChange={(e) => {
                    setPostText(e.target.value);
                  }}
                  cols="30"
                  rows="10"
                  placeholder="what's happening"
                ></textarea>
                <button onClick={() => createPost(postText)}>Post</button>
              </div>
              <hr />
              <div>
                <input type="file" />
              </div>
              <div style={{ display: displayedit ? "block" : "none" }}>
                <span>{active_user.username}</span>
                <input
                  name="edit-post"
                  onChange={(e) => {
                    setPostText(e.target.value);
                  }}
                  cols="30"
                  rows="10"
                  value={postText}
                />
                <button
                  onClick={() => {
                    postChangeHandler(postText);
                    setDisplatedit(false);
                  }}
                >
                  Update
                </button>
              </div>
            </div>

            <ul className="post-area">
              {postState.allpost.map((post) => (
                <li key={post._id} type="none" className="post-container">
                  <div>
                    <span>{post.username}</span>
                    <span>{post.createdAt}</span>
                    <select
                      name="post-edit"
                      id=""
                      onChange={(e) =>
                        postChangeHandler(e.target.value, post._id)
                      }
                    >
                      <option value=".."></option>
                      <option value="edit">edit</option>
                      <option value="delete">delete</option>
                    </select>
                    <p>@{post.username}</p>
                  </div>
                  <div>{post.content}</div>
                  <div>
                    <span>like:{post.likes.likeCount}</span>
                    <span
                      role="button"
                      onClick={(e) => {
                        addToBookmark(post._id);
                      }}
                    >
                      bookmark
                    </span>
                    <span></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="users-list">
            <div>
              <button onClick={() => TrendingHandler()}>Trending</button>
              <button onClick={() => LatestHandler()}>Latest</button>
            </div>
            <div>
              <ul>
                {users.map((item) => (
                  <li type="none" key={item._id}>
                    <p>
                      {item.firstName}
                      <br />
                      {item.username}
                    </p>
                    <button>+Follow</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
