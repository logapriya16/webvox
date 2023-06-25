import React, { useContext } from "react";
import "./Newpost.css";
import { PostContext } from "../../Contexts/PostContext";
export default function Newpost() {
  const { createPost, postText, setPostText } = useContext(PostContext);
  return (
    <div>
      <input
        className="new-post-text"
        name="new-post"
        onChange={(e) => {
          setPostText(e.target.value);
        }}
        cols="30"
        rows="10"
        value={postText}
        placeholder="what's happening"
      />
      <button
        className="primary-btn"
        onClick={() => {
          createPost(postText);
        }}
      >
        Post
      </button>
    </div>
  );
}
