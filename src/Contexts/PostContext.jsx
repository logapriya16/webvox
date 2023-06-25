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
  const { curr_token } = useContext(AuhtContext);
  const postInitial = {
    isPostLoading: false,
    allpost: [],
  };
  const [displayedit, setDisplatedit] = useState(false);
  const [postText, setPostText] = useState("");

  const [postState, postDispatch] = useReducer(postReducer, postInitial);

  //api call to fetch all posts
  const getAllPosts = async () => {
    postDispatch({ type: "loading_post", payload: true });
    const response = await axios.get("/api/posts", {
      headers: curr_token,
    });
    if (response.status === 200) {
      postDispatch({ type: "loading_post", payload: false });
      postDispatch({ type: "set_post", payload: response.data.posts });
    }
  };

  const createPost = async (posttext, e) => {
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
      setPostText("");
    } catch (error) {
      console.log("error in creating new post", error);
    }
  };
  const LikePost = async (id) => {
    postDispatch({ type: "loading_post", payload: true });
    try {
      const response = await fetch(`/api/posts/like/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });

      if (response.status === 201) {
        postDispatch({ type: "loading_post", payload: false });
        const temp = await response.json();
        //console.log(temp);
        postDispatch({ type: "set_post", payload: temp.posts });
      }
    } catch (error) {
      console.log("error in liking a post", error);
    }
  };
  const DislikePost = async (id) => {
    postDispatch({ type: "loading_post", payload: true });
    try {
      const response = await fetch(`/api/posts/dislike/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      if (response.status === 201) {
        postDispatch({ type: "loading_post", payload: false });
        const temp = await response.json();
        postDispatch({ type: "set_post", payload: temp.posts });
      }
    } catch (error) {
      console.log("error in disliking the post", error);
    }
  };
  const postDelete= async (id) => {
    postDispatch({ type: "loading_post", payload: false });

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { authorization: curr_token },
      });
      if (response.status === 201) {
        postDispatch({ type: "loading_post", payload: false });
        const temp = await response.json();
        postDispatch({ type: "set_post", payload: temp.posts });
      }
    } catch (error) {
      console.log("error in  deleting the post", error);
    }
  };
  const postEdit=()=>{}
  const TrendingHandler = () => {
    console.log(postState.allpost);
    const temp = postState.allpost.sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    return postDispatch({ type: "set_post", payload: temp });
  };
  const LatestHandler = () => {
    console.log(postState.allpost.map((item) => item.createdAt));
    const sortFunction = (a, b) => {
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      console.log(d1, d2);
      return d1 - d2;
    };
    const temp = postState.allpost.sort(sortFunction);
    console.log(temp);
    console.log(temp.sort(sortFunction));
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
        postDelete,
        displayedit,
        setDisplatedit,
        postText,
        setPostText,
        LikePost,
        DislikePost,
        postEdit
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
