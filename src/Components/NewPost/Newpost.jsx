import React, { useContext } from "react";
import "./Newpost.css";
import { PostContext } from "../../Contexts/PostContext";
import { useRef } from "react";
export default function Newpost() {
  const {
    createPost,
    ValidatePostMedia,
    setPostmedia,
    postState
  } = useContext(PostContext);
  const MediaHandler = (e) => {
    const IsmediaValid = ValidatePostMedia(e.target.files[0]);
    if (IsmediaValid.isValid === true) {
      setPostmedia(e.target.files[0]);
    }
  };
  return (
    <form className="new-post-container" onSubmit={(e)=>createPost(e)} >
  
      <input
        className="new-post-text"
        name="new-post"
        id="post_text"
        cols="30"
        rows="10"
        placeholder="what's happening"
      />
      <div className="new-post-lower">
        <input
          type="file"
          className="post-fileInput"
          onChange={(e)=>MediaHandler(e)}
          multiple
        />
        <button
        type="submit"
          className="primary-btn"
          disabled={postState.isPostLoading}      
        >
          Post
        </button>
        
      </div>
      <button id="reset" style={{display:"none"}} type="reset" ></button>
    </form>
  );
}
