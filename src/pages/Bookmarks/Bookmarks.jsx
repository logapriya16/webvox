import React, { useContext } from "react";
import "./Bookmarks.css";
import Navbar from "../../Components/Navbar/Navbar";
import UpperNav from "../../Components/UpperNav";
import { BookmarkContext } from "../../Contexts/BookmarkContext";
import { PostContext } from "../../Contexts/PostContext";
export default function Bookmarks() {
  const { bookmarkState, removeFromBookmark } = useContext(BookmarkContext);
  const { postState } = useContext(PostContext);
  const Posts = postState.allpost;
  const Bookmarks = bookmarkState.curr_user_bookmarks;
  console.log(Posts);
  console.log(Bookmarks.map((id) => id));

  //console.log(bookmarkItem)
  return (
    <div>
      <UpperNav />
      <div className="bookmark-container">
        <div className="side-nav">
          <Navbar />
        </div>
        <div className="bookmark-area">
          {bookmarkState.curr_user_bookmarks.length <= 0 ? (
            <p>No Bookmarks Added</p>
          ) : (
            <ul>
              {Posts.map((post) => {
                const bookmarkItem = Bookmarks.find(
                  (item) => item === post._id
                );
                return post._id === bookmarkItem ? (
                  <li type="none" key={post._id}>
                    <span>{post.username}</span>
                    <span>{post.createdAt}</span>
                    <p>@{post.username}</p>
                    <p>{post.content}</p>
                    <button onClick={(e) => removeFromBookmark(post._id)}>
                      remove
                    </button>
                  </li>
                ) : (
                  <div></div>
                );
              })}
            </ul>
          )}
        </div>
        <div className="users-list"></div>
      </div>
    </div>
  );
}
