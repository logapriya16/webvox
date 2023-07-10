import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import { AuhtContext } from "./AuthContext";
import { ReactToastify } from "../Utils/ReactToastify";

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const { curr_token, active_user } = useContext(AuhtContext);
  const [users, setUsers] = useState([]);
  const [userbio, Setuserbio] = useState({
    profile: active_user ? active_user.profile : "",
    bio: active_user ? active_user.bio : "",
    avatar: active_user ? active_user.avatar : "",
  });

  const getallusers = async () => {
    try {
      const response = await axios.get("/api/users", {});
      //console.log(response)
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log("eror while fetching users from BD", error);
    }
  };
  const EditUser = async () => {
    try {
      console.log(userbio,"context file ");
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: curr_token },
        body: JSON.stringify({ userData: userbio }),
      });

      const temp = await response.json();
      if (response.status === 201) {
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        ReactToastify("Profile updated", "success");
      }
      //console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };
//console.log(active_user?.avatar)
  useEffect(() => {
    getallusers();
  }, []);
  useEffect(() => {
    getallusers();
  }, [active_user?.avatar]);
  
  return (
    <UserContext.Provider
      value={{ users, userbio, Setuserbio, EditUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
