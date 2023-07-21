import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";

import { AuhtContext } from "./AuthContext";
import { ReactToastify } from "../Utils/ReactToastify";
import { useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
import { useState } from "react";

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const { curr_token, active_user,authDispatch } = useContext(AuhtContext);
  const [className, setClassname] = useState("light-theme");
  const [theme, setTheme] = useState(false);

  const userInitial = {
    user_loading: false,
    users: [],
    userbio: active_user ? active_user.bio : "",
    userProtfolio: active_user ? active_user.profile : "",
    userAvatar: active_user ? active_user.avatar : "",
  };
  const [userstate, userDispatch] = useReducer(userReducer, userInitial);
  const getallusers = async () => {
    try {
      const response = await axios.get("/api/users", {});
      //console.log(response)
      userDispatch({ type: "user_loading", payload: true });
      if (response.status === 200) {
        userDispatch({ type: "set_users", payload: response.data.users });
        userDispatch({ type: "user_loading", payload: false });
      }
    } catch (error) {
      console.log("error while fetching users from BD", error);
    }
  };
  useEffect(() => {
    // userDispatch({
    //   type: "set_bio",
    //   payload: active_user ? active_user.bio : "",
    // });
    // userDispatch({
    //   type: "set_portfolio",
    //   payload: active_user ? active_user.profile : "",
    // });
    // userDispatch({
    //   type: "set_avatar",
    //   payload: active_user ? active_user.avatar : "",
    // });

    getallusers();
  }, []);

  const EditUser = async (e) => {
    e.preventDefault();
    const profile = e.target.elements?.user_portfolio.value;
    const bio = e.target.elements?.user_bio.value;
    const avatar = e.target.src;
    //console.log("inside context", avatar);
    try {
      userDispatch({ type: "user_loading", payload: true });

      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: curr_token },
        body: JSON.stringify({ userData: { bio, profile, avatar } }),
      });
      //console.log(userstate);
      const temp = await response.json();
      //console.log(temp);
      if (response.status === 201) {
        userDispatch({ type: "set_bio", payload: temp.user.bio });
        userDispatch({ type: "set_portfolio", payload: temp.user.profile });
        userDispatch({ type: "set_avatar", payload: temp.user.avatar });
        userDispatch({ type: "user_loading", payload: false });
        authDispatch({ type: "set_user", payload: temp.user });
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        ReactToastify("Profile updated", "success");
      }
      //console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   }, [userstate]);
  const handleTheme = () => {
    if (theme === false) {
      setClassname("dark-theme");
    } else {
      setClassname("light-theme");
    }
  };
  const HandleSearch = (text) => {
    userDispatch({ type: "user_loading", payload: true });

    const temp =
      text.length > 0
        ? userstate.users.filter((person) =>
            person.username.toLowerCase().includes(text.toLowerCase())
          )
        : userstate.users;
    userDispatch({ type: "set_users", payload: temp });
    userDispatch({ type: "user_loading", payload: false });
  };

  //console.log(active_user?.avatar)

  return (
    <UserContext.Provider
      value={{ userstate, EditUser, handleTheme, className, theme, setTheme ,HandleSearch}}
    >
      {children}
    </UserContext.Provider>
  );
}
