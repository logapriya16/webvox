import React, { createContext, useContext, useReducer } from "react";
import { boookmarkReducer } from "../reducers/bookmarkReducer";
import { AuhtContext } from "./AuthContext";
import { toast } from "react-toastify";
export const BookmarkContext = createContext();
export default function BookmarkProvider({ children }) {
  const { curr_token } = useContext(AuhtContext);
  const bookmarkInitial = {
    allbookmarks: [],
    curr_user_bookmarks: [],
  };
  const [bookmarkState, bookmarkDispatch] = useReducer(
    boookmarkReducer,
    bookmarkInitial
  );
  const addToBookmark = async (id) => {
    try {
      const response = await fetch(`/api/users/bookmark/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      const temp = await response.json();
      if (response.status === 200) {
        toast.info("Post added to Bookmark", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        bookmarkDispatch({
          type: "curr_user_bookmark",
          payload: temp.bookmarks,
        });
      }
    } catch (error) {
      console.log("error in adding to bookmark", error);
    }
  };
  const removeFromBookmark = async (id) => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      console.log(response.status);
      console.log(await response.json());
      const temp = await response.json();
      if (response.status === 200) {
        bookmarkDispatch({
          type: "curr_user_bookmark",
          payload: temp.bookmarks,
        });

        toast.warning("Post removed from bookmark", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("error in removeing bookmark", error);
    }
    console.log(bookmarkState);
  };
  return (
    <BookmarkContext.Provider
      value={{ addToBookmark, bookmarkState, removeFromBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
