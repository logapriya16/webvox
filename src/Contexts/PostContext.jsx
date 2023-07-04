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
    curr_user_post: [],
    curr_user_following_posts:[]
  };
  const [displayedit, setDisplatedit] = useState(false);
  const [postText, setPostText] = useState("");
  const [edittext, setEdittext] = useState("");
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

  //api call to fetch posts of active user
  const getcurruserPost = async (us) => {
    postDispatch({ type: "loading_post", payload: true });
    try {
      const response = await fetch(`/api/posts/user/${us}`, {
        method: "GET",
      });
      const temp = await response.json();
      if (response.status === 200) {
        postDispatch({ type: "set_curr_user_post", payload: temp.posts });
      }
      //console.log(temp);
    } catch (error) {
      console.log("error in fetching curr user post", error);
    }
  };

  //api call to get the posts of users followed by current users
  
  //api call for creating the post
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
  
  
  //api call to like a post
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
  
  
  //api call to unlike a post
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


  //api call to delete a post
  const postDelete = async (id) => {
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


  //api call to edit a post
  const postEdit = async (id, content) => {
    try {
      const response = await fetch(`/api/posts/edit/${id}`, {
        method: "POST",
        headers: {
          authorization: curr_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData: { content } }),
      });
      const data = await response.json();
      postDispatch({ type: "set_post", payload: data.posts });
    } catch (error) {
      console.log(error);
    }
  };


  //api call to sort  based on trending post
  const TrendingHandler = () => {
    const temp = postState.allpost.sort(
      (a, b) => b.likes.likeCount - a.likes.likeCount
    );
    return postDispatch({ type: "set_post", payload: temp });
  };


  //api call to sort based on latest upload
  const LatestHandler = () => {
    const temp = postState.allpost.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
    return postDispatch({ type: "set_post", payload: temp });
  };

  useEffect(() => {
    getAllPosts();
    getcurruserPost(active_user?.username);
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
        postEdit,
        getcurruserPost,
        edittext,
        setEdittext,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
