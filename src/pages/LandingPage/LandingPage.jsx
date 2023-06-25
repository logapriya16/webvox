import React, { useContext } from "react";
import { PostContext } from "../../Contexts/PostContext";
import "./LandingPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import UpperNav from "../../Components/UpperNav";
import { AuhtContext } from "../../Contexts/AuthContext";
import { BookmarkContext } from "../../Contexts/BookmarkContext";
import {
  BsFillPersonFill,
  BsHeart,
  BsBookmark,
  BsBookmarksFill,
} from "react-icons/bs";
import { PiHeartFill } from "react-icons/pi";
import UserList from "../../Components/UserList/UserList";
import Newpost from "../../Components/NewPost/Newpost";
export default function LandingPage() {
  const {
    postState,
    postDelete,
    LikePost,
    postEdit,
    DislikePost,
  } = useContext(PostContext);
  const { addToBookmark, bookmarkState } = useContext(BookmarkContext);
  const { active_user } = useContext(AuhtContext);
  
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
                <BsFillPersonFill className="avatar" />
                <p>{active_user.username}</p>
              </div>
              <div>
                <Newpost/>
              </div>
            </div>

            <ul className="post-area">
              {postState.allpost.map((post) => (
                <li key={post._id} type="none" className="post-container">
                  <div className="post-upper">
                    <div>
                      <BsFillPersonFill className="avatar" />
                    </div>
                    <div>
                      <span>{post.username}</span>
                    </div>
                    <div>{post.createdAt}</div>
                    <div>
                      <button onClick={()=>postEdit(post._id)}>Edit</button>
                      <button onClick={()=>postDelete(post._id,)}>Delete</button>
                    </div>
                    {/* <div style={{ display: displayedit ? "block" : "none" }}>
                      <span>{active_user.username}</span>
                      <input
                        name="edit-post"
                        onChange={(e) => {
                          setPostText(e.target.value);
                        }}
                        cols="30"
                        rows="10"
                        value={post.content}
                      />
                      <button
                        onClick={() => {
                          postChangeHandler("edit",post._id,postText);
                          setDisplatedit(!displayedit);
                        }}
                      >
                        Update
                      </button>
                    </div> */}
                  </div>
                  <div>{post.content}</div>
                  <hr />
                  <div>
                    {post.likes.likedBy.length > 0 ? (
                      post.likes.likedBy.map(
                        (likeperson) => likeperson._id === active_user._id
                      ) ? (
                        <span onClick={() => DislikePost(post._id)}>
                          <PiHeartFill />
                        </span>
                      ) : (
                        <span onClick={() => LikePost(post._id)}>
                          <BsHeart />
                        </span>
                      )
                    ) : (
                      <span onClick={() => LikePost(post._id)}>
                        <BsHeart />
                      </span>
                    )}
                    <span>{post.likes.likeCount}</span>
                    {bookmarkState.curr_user_bookmarks.length > 0 ? (
                      bookmarkState.curr_user_bookmarks.map(
                        (bookmarkedpost) => bookmarkedpost === post._id
                      ) ? (
                        <span
                          onClick={() =>
                            alert(
                              bookmarkState.curr_user_bookmarks.map(
                                (bookmarkedpost) => bookmarkedpost === post._id
                              )
                            )
                          }
                        >
                          <BsBookmarksFill />
                        </span>
                      ) : (
                        <span
                          onClick={(e) => {
                            addToBookmark(post._id);
                          }}
                        >
                          <BsBookmark />
                        </span>
                      )
                    ) : (
                      <span
                        onClick={(e) => {
                          addToBookmark(post._id);
                        }}
                      >
                        <BsBookmark />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="users-list">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}
