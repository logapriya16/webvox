import React, { useState } from "react";
import "./PostDisplay.css";
import { useContext } from "react";
import { PostContext } from "../../Contexts/PostContext";
import { BookmarkContext } from "../../Contexts/BookmarkContext";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

import { BsHeart, BsBookmark, BsBookmarksFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { PiHeartFill } from "react-icons/pi";
import { GrShareOption } from "react-icons/gr";
import { AiOutlineComment } from "react-icons/ai";
import { BiSolidMessageEdit } from "react-icons/bi";
import { AuhtContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

export default function PostDisplay({ item }) {
  const {
    postState,
    postDelete,
    LikePost,
    postEdit,
    DislikePost,
    edittext,
    setEdittext,
  } = useContext(PostContext);

  const { addToBookmark, bookmarkState, removeFromBookmark } =
    useContext(BookmarkContext);
  const { userstate } = useContext(UserContext);
  const { active_user } = useContext(AuhtContext);
  const [displayedit, setDisplatedit] = useState(false);
  const [postimg, setPostimg] = useState(true);
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <p onClick={() => postEdit()}>Edit</p>,
    },
    {
      key: "2",
      label: <p>Delete</p>,
    },
  ];
  return (
    <div>
      <ul className="post-area">
        {postState.allpost.map((post) =>
          post._id === item._id ? (
            <li key={post.username} type="none" className="post-container">
              <div className="post-upper">
                <div>
                  {post.username === active_user.username ? (
                    <img
                      src={active_user.avatar}
                      alt=""
                      height="50px"
                      className="cursor"
                      style={{ borderRadius: "50%", margin: "0.7rem" }}
                      onClick={() => navigate(`/profile`)}
                    />
                  ) : (
                    userstate.users.map((person) =>
                      person.username === post.username ? (
                        <img
                          src={person.avatar}
                          alt=""
                          height="50px"
                          className="cursor"
                          style={{ borderRadius: "50%", margin: "0.7rem" }}
                          onClick={() => navigate(`/profile/${person._id}`)}
                        />
                      ) : null
                    )
                  )}
                </div>
                <div>
                  <span style={{ padding: "0.4rem" }}>{post.username}</span>
                  <span style={{ padding: "0.4rem" }}>{post.createdAt}</span>
                </div>
                <div
                  style={{
                    display:
                      post.username === active_user.username ? "block" : "none",
                  }}
                >
                  <span
                    onClick={() => {
                      setDisplatedit(!displayedit);
                    }}
                  >
                    <BiSolidMessageEdit
                      style={{ color: "#db2777", fontSize: "larger" }}
                    />
                  </span>
                  <span onClick={() => postDelete(post._id)}>
                    <CiCircleRemove
                      style={{ color: "red", fontSize: "larger" }}
                    />
                  </span>
                </div>
              </div>
              <form
                className="post_edit"
                onSubmit={(e) => postEdit(post._id, e, postimg)}
                style={{
                  display:
                    post.username === active_user.username && displayedit
                      ? "block"
                      : "none",
                }}
              >
                <textarea
                  name="edit-post"
                  cols="30"
                  rows="10"
                  id="post_edit"
                  defaultValue={post.content}
                />
                <span>
                  <CiCircleRemove
                    onClick={() => setPostimg(false)}
                    style={{
                      color: "red",
                      fontSize: "larger",
                      display: "block",
                    }}
                  />
                </span>
                <img
                  src={post.post_img}
                  id="post_img"
                  alt=""
                  height="450px"
                  width="450px"
                />
                <button
                  className="follow-btn"
                  type="submit"
                  onClick={(e) => {
                    setDisplatedit(!displayedit);
                    toast.info("Post updated", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                >
                  Update
                </button>

                <button
                  id="reset"
                  style={{ display: "none" }}
                  type="reset"
                ></button>
              </form>
              <div
                className="post-middle"
                style={{ display: displayedit ? "none" : "block" }}
              >
                {post.post_img ? (
                  post.media_type === "video" ? (
                    <video
                      src={post.post_img}
                      width="450"
                      height="450"
                      controls
                    />
                  ) : (
                    <img
                      src={post.post_img}
                      alt=""
                      height="450px"
                      width="450px"
                    />
                  )
                ) : null}
              </div>
              <hr />
              <div>
                <div className="post-lower">
                  {post.likes.likedBy.length > 0 ? (
                    post.likes.likedBy.map(
                      (likeperson) => likeperson._id === active_user._id
                    ) ? (
                      <span onClick={() => DislikePost(post._id)}>
                        <PiHeartFill />
                        <span>{post.likes.likeCount}</span>
                      </span>
                    ) : (
                      <span onClick={() => LikePost(post._id)}>
                        <BsHeart />
                        <span>{post.likes.likeCount}</span>
                      </span>
                    )
                  ) : (
                    <span onClick={() => LikePost(post._id)}>
                      <BsHeart />
                      <span>{post.likes.likeCount}</span>
                    </span>
                  )}

                  {bookmarkState.curr_user_bookmarks.find(
                    (bookmarkedpost) => bookmarkedpost === post._id
                  ) ? (
                    <span onClick={() => removeFromBookmark(post._id)}>
                      <BsBookmarksFill />
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        addToBookmark(post._id);
                      }}
                    >
                      <BsBookmark />
                    </span>
                  )}
                  <span>
                    <GrShareOption />
                  </span>
                  <span>
                    <AiOutlineComment />
                  </span>
                </div>
                <p className="post-content">{post.content}</p>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
