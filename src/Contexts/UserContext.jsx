import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [userbio, Setuserbio] = useState({
    profileURL: "",
    profileBio: "",
    Profilehobbies: "",
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
  useEffect(() => {
    getallusers();
  }, []);
  return (
    <UserContext.Provider value={{ users, userbio, Setuserbio }}>
      {children}
    </UserContext.Provider>
  );
}
