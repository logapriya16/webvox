import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";

import { AuhtContext } from "./AuthContext";
import { ReactToastify } from "../Utils/ReactToastify";
import { useReducer } from "react";
import { userReducer } from "../reducers/userReducer";
import { useState } from "react";

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const { curr_token, active_user } = useContext(AuhtContext);
  
  const [className, setClassname] = useState("light-theme");
  const [theme, setTheme] = useState(false);

  const userInitial = {
    user_loading: false,
    users: [],
    userbio: "",
    userProtfolio: "",
    userAvatar: "",
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
  const EditUser = async (e) => {
    e.preventDefault();
    const profile = e.target.elements?.user_portfolio.value;
    const bio = e.target.elements?.user_bio.value;
    const avatar = e.target.src;
    console.log("inside context",avatar)
    try {
      userDispatch({ type: "user_loading", payload: true });
      
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: curr_token },
        body: JSON.stringify({ userData: { bio, profile, avatar } }),
      });

      const temp = await response.json();
      
      if (response.status === 201) {
        userDispatch({type:"set_bio",payload:temp.user.bio})
        userDispatch({type:"set_portfolio",payload:temp.user.profile})
        userDispatch({type:"set_avatar",payload:temp.user.avatar})
        userDispatch({ type: "user_loading", payload: false });
        
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        ReactToastify("Profile updated", "success");
      }
      //console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTheme = () => {
    if (theme === false) {
      setClassname("dark-theme");
    } else {
      setClassname("light-theme");
    }
  };
 
  //console.log(active_user?.avatar)
  useEffect(() => {
    getallusers();
  }, []);

  return (
    <UserContext.Provider value={{ userstate, EditUser,handleTheme ,className,theme,setTheme}}>
      {children}
    </UserContext.Provider>
  );
}
