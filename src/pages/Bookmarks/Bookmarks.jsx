import React, { useContext } from "react";
import "./Bookmarks.css";
import Navbar from "../../Components/Navbar/Navbar";
import UpperNav from "../../Components/UpperNav";
import { BookmarkContext } from "../../Contexts/BookmarkContext";
import { PostContext } from "../../Contexts/PostContext";
import UserList from "../../Components/UserList/UserList";
import PostDisplay from "../../Components/PostDisplay/PostDisplay";

export default function Bookmarks() {
  const { bookmarkState} = useContext(BookmarkContext);
  const { postState } = useContext(PostContext);
  const Posts = postState.allpost;
  const Bookmarks = bookmarkState.curr_user_bookmarks;
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
              {Bookmarks.map((post) => {
                const bookmarkItem = Posts.find(
                  (item) => item._id === post
                );
                return bookmarkItem ? (
                  <PostDisplay item={bookmarkItem} />
                ) : (
                  <div></div>
                );
              })}
            </ul>
          )}
        </div>
        <div className="users-list">
          <UserList />
        </div>
      </div>
    </div>
  );
}
