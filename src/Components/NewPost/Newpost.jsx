import React, { useContext } from "react";
import "./Newpost.css";
import { PostContext } from "../../Contexts/PostContext";
import { useRef } from "react";
export default function Newpost() {
  const {
    createPost,
    postText,
    setPostText,
    ValidatePostMedia,
    setPostmedia,
  } = useContext(PostContext);
  const MediaHandler = (e) => {
    const IsmediaValid = ValidatePostMedia(e.target.files[0]);
    if (IsmediaValid.isValid === true) {
      setPostmedia(e.target.files[0]);
    }
  };
  const reset = useRef(null)
  
  return (
    <form className="new-post-container" onSubmit={(e)=>createPost(e,postText,reset)} >
  
      <input
        className="new-post-text"
        name="new-post"
        // onChange={(e) => {
        //   setPostText(e.target.value);
        // }}
        id="post_text"
        cols="30"
        rows="10"
        // value={postText}
        placeholder="what's happening"
      />
      <div className="new-post-lower">
        <input
          type="file"
          className="tweetform-fileInput"
          onChange={(e)=>MediaHandler(e)}
          multiple
        />
        <button
        type="submit"
          className="primary-btn"
          
        >
          Post
        </button>
        
      </div>
      <button id="reset" style={{display:"none"}} type="reset" ref={reset}></button>
    </form>
  );
}
