import React, { useState } from "react";
import "./PostDisplay.css";
import { useContext } from "react";
import { PostContext } from "../../Contexts/PostContext";
import { BookmarkContext } from "../../Contexts/BookmarkContext";
import {
  BsFillPersonFill,
  BsHeart,
  BsBookmark,
  BsBookmarksFill,
} from "react-icons/bs";
import { PiHeartFill } from "react-icons/pi";
import { AuhtContext } from "../../Contexts/AuthContext";
import { Button, Dropdown } from "antd";
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

  const { active_user } = useContext(AuhtContext);
  const [displayedit, setDisplatedit] = useState(false);
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
            <li key={post._id} type="none" className="post-container">
              <div className="post-upper">
                <div>
                  <BsFillPersonFill className="avatar" />
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
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button>..</Button>
                  </Dropdown>
                  <button
                    onClick={() => {
                      postEdit(post._id);
                      setDisplatedit(!displayedit);
                      setEdittext(post.content);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => postDelete(post._id)}>Delete</button>
                </div>
              </div>
              <div
                className="post-edit"
                style={{
                  display:
                    post.username === active_user.username && displayedit
                      ? "block"
                      : "none",
                }}
              >
                <textarea
                  name="edit-post"
                  onChange={(e) => {
                    setEdittext(e.target.value);
                  }}
                  cols="30"
                  rows="10"
                  value={edittext}
                />
                <button
                  onClick={() => {
                    setDisplatedit(!displayedit);
                    postEdit(post._id, edittext);
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
              </div>
              <div
                className="post-middle"
                style={{ display: displayedit ? "none" : "block" }}
              >
                {post.content}
              </div>
              <hr />
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
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
