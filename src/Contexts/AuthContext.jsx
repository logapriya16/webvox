import React, { createContext, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authReducer } from "../reducers/authReducer";
import { toast } from "react-toastify";
import axios from "axios";
export const AuhtContext = createContext();

function AuthProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const curr_token = localStorage.getItem("data");
  const active_user=JSON.parse(localStorage.getItem("curr_user"))

  const authInitial = {
    isAuthLoading: false,
    user: active_user?active_user:{},
    E_token: curr_token ? curr_token : "",
  };

  const [authState, authDispatch] = useReducer(authReducer, authInitial);

  //logout function
  const Logout = () => {
    authDispatch({ type: "E_token", payload: "" });
    localStorage.removeItem("data");
    localStorage.removeItem("curr_user")
    toast.error("Logged out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  //user signup function
  const SignUp = async (SignUpData) => {
    try {
      authDispatch({ type: "set_loading", payload: true });
      const response = await axios.post(`/api/auth/signup`, {
        firstname: SignUpData.firstname,
        lastname: SignUpData.lastname,
        email: SignUpData.email,
        username: SignUpData.username,
        password: SignUpData.password,
      });
      console.log(response.data);
      if (response.status === 201) {
        authDispatch({ type: "set_loading", payload: false });
        authDispatch({
          type: "set_token",
          payload: response.data.encodedToken,
        });
        localStorage.setItem("data", response.data.encodedToken);
        localStorage.setItem("curr_user",response.data.createdUser)

        authDispatch({ type: "set_user", payload: response.data?.createdUser });
        toast.success("Logged In !", {
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
      console.log("Error while Signing Up", error);
    }
  };

  //user login function
  const Login = async (userdata) => {
    try {
      console.log(userdata);
      authDispatch({ type: "set_loading", payload: true });
      const response = await axios.post(`/api/auth/login`, {
        username: userdata.username,
        password: userdata.password,
      });

      console.log(response);

      if (response.status === 200) {
        authDispatch({ type: "set_user", payload: response.data?.foundUser });
        localStorage.setItem("data", response.data.encodedToken);
        
        localStorage.setItem("curr_user",JSON.stringify( response.data?.foundUser))
        //  SetToken(response.data.encodedToken);
        authDispatch({ type: "set_loading", payload: false });
        authDispatch({
          type: "set_token",
          payload: response.data.encodedToken,
        });
        navigate(location?.state?.from?.pathname || "/");

        toast.success("Logged In !", {
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
      if (response.status === 404) {
        console.log(
          "The credentials you entered are invalid. Unauthorized access error."
        );
      }
    } catch (error) {
      console.log("error while logging in ", error);
    }
  };
  //console.log(authState)
  return (
    <AuhtContext.Provider
      value={{
        SignUp,
        userCredentials,
        setUserCredentials,
        Login,
        Logout,
        active_user,
        authState,
        curr_token
      }}
    >
      {children}
    </AuhtContext.Provider>
  );
}
export default AuthProvider;
