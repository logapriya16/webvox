import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { postReducer } from "../reducers/postreducer";
import { AuhtContext } from "./AuthContext";
import { toast } from "react-toastify";
export const PostContext = createContext();
export default function Postprovider({ children }) {
  const { curr_token, active_user } = useContext(AuhtContext);
  const postInitial = {
    isPostLoading: false,
    allpost: [],
  };
  const [displayedit, setDisplatedit] = useState(false);

  const [postState, postDispatch] = useReducer(postReducer, postInitial);

  //api call to fetch all posts
  const getAllPosts = async () => {
    postDispatch({ type: "loading_post", payload: true });
    const response = await axios.get("/api/posts", {});
    if (response.status === 200) {
      postDispatch({ type: "loading_post", payload: false });
      postDispatch({ type: "set_post", payload: response.data.posts });
    }
  };

  const createPost = async (posttext) => {
    postDispatch({ type: "loading_post", payload: true });
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: curr_token },
        body: JSON.stringify({ postData: posttext }),
      });
      //console.log( await response.json());
      const temp = await response.json();
      console.log(temp.posts);
      if (response.status === 201) {
        postDispatch({ type: "loading_post", payload: false });
        postDispatch({ type: "set_post", payload: temp.posts });
      }
      if (response.status === 500) {
        toast.error("Server Error try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("error in creating new post", error);
    }
  };

  const postChangeHandler = async (operation, id) => {
    if ((operation = "edit")) {
      setDisplatedit(true);
      try {
        const response = await fetch(`/api/posts/edit/${id}`, {
          headers: { authorization: curr_token },
          method: "POST",
          body: JSON.stringify({ postData: operation }),
        });
      } catch (error) {
        console.log("error in editing and deleting the post", error);
      }
    }
    if ((operation = "delete")) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          headers: { authorization: curr_token },
          method: "DELETE",
        });
      } catch (error) {
        console.log("error in editing and deleting the post", error);
      }
    }
  };
  const TrendingHandler = () => {
    console.log(postState.allpost);
    const temp = postState.allpost.sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    return postDispatch({ type: "set_post", payload: temp });
  };
  const LatestHandler = () => {
    console.log(postState.allpost.map((item) => item.createdAt));
    const temp = postState.allpost.sort((a, b) => b.createdAt - a.createdAt);
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        postState,
        TrendingHandler,
        LatestHandler,
        createPost,
        postChangeHandler,
        displayedit,
        setDisplatedit,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
