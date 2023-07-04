import React, { createContext, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authReducer } from "../reducers/authReducer";
import { toast } from "react-toastify";
import axios from "axios";

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import pic2 from "../imgs/pic2.jpg";
import pic3 from "../imgs/pic3.jpg";
import pic4 from "../imgs/pic4.jpg";
import pic5 from "../imgs/pic5.jpg";
import pic6 from "../imgs/pic6.jpg";
import defaultUser from "../imgs/defaultUser.png";

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
  const active_user = JSON.parse(localStorage.getItem("curr_user"));

  const authInitial = {
    isAuthLoading: false,
    user: active_user ? active_user : {},
    E_token: curr_token ? curr_token : "",
    avatar: defaultUser,
  };

  const [authState, authDispatch] = useReducer(authReducer, authInitial);

  //logout function
  const Logout = () => {
    authDispatch({ type: "E_token", payload: "" });
    localStorage.removeItem("data");
    localStorage.removeItem("curr_user");
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
        localStorage.setItem("curr_user", response.data.createdUser);

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
        localStorage.setItem(
          "curr_user",
          JSON.stringify(response.data?.foundUser)
        );
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
  //follow a user
  const followUser = async (id) => {
    authDispatch({ type: "set_loading", payload: true });

    try {
      const response = await fetch(`/api/users/follow/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      console.log(response.status);
      const temp = await response.json();
      console.log(temp);
      if (response.status === 200) {
        authDispatch({ type: "set_user", payload: temp.user });
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        authDispatch({ type: "set_loading", payload: false });
      }
    } catch (error) {
      console.log("error while following a user", error);
    }
  };

  //unfollow a user
  const UnfollowUser = async (id) => {
    authDispatch({ type: "set_loading", payload: true });

    try {
      const response = await fetch(`/api/users/unfollow/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      console.log(response.status);
      const temp = await response.json();
      console.log(temp);
      if (response.status === 200) {
        authDispatch({ type: "set_user", payload: temp.user });
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        authDispatch({ type: "set_loading", payload: false });
      }
    } catch (error) {
      console.log("error while following a user", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagesarray = [ pic2, pic3, pic4, pic5, pic6];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleIamgechange = (profile) => {
    authDispatch({ type: "set_loading", payload: true });
    authDispatch({ type: "set_avatar", payload: profile });
    authDispatch({ type: "set_loading", payload: false });
  };

  const UserAvatar = () => {
    return (
      <>
        <Avatar size={64} icon={<UserOutlined />} src={authState.avatar} />
        <Button onClick={showModal}>Change Avatar</Button>
        <Modal
          title="Choose you avatar"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {imagesarray.map((image) => {
            return (
              <img
                src={image}
                alt=""
                onClick={() => {
                  handleIamgechange(image);
                  handleOk();
                }}
                height="100px"
                style={{ borderRadius: "50%", margin: "0.7rem" }}
              />
            );
          })}
        </Modal>
      </>
    );
  };

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
        curr_token,
        followUser,
        UnfollowUser,
        UserAvatar,
      }}
    >
      {children}
    </AuhtContext.Provider>
  );
}
export default AuthProvider;
