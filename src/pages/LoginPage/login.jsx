import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuhtContext } from "../../Contexts/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import {FaUserPlus} from "react-icons/fa"
import "./login.css";
function Login() {
  const testUserData = {
    username: "loga@1612",
    password: "1612",
  };
  const { Login } = useContext(AuhtContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleLogin = () => {
    if (!userData.username.trim() || !userData.password.trim()) {
      toast.warn("Enter all Credentials!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      Login(userData);
    }
  };

  const handleTestUserLogin = () => {
    setUserData(testUserData);
    Login(testUserData);
  };

  return (
    <div className="login-container">
      <div className="main">
        <h2>
          <span className="brand">Webvox</span>
          
          <div className="roller">
            <span id="rolltext">
              SHARE
              <br />
              EXPLORE
              <br /> HAVE FUN
              <br />
              MAKE MEMORIES
            </span>
          </div>
          <span id="spare-time">Join Webvox Community</span>
          <br />
        </h2>
      </div>
      <div className="login-card">
        <div className="auth-element">
          <span className="auth-lable">Username</span>
          <div className="flex">
            <input
              className="auth-input"
              type="login"
              id="username"
              placeholder="Enter your Username"
              value={userData.username}
              onChange={(e) =>
                setUserData((prevs) => ({ ...prevs, username: e.target.value }))
              }
            />
            <AiOutlineUser  className="auth-icons"/>
          </div>
        </div>
        <div className="auth-element">
          <span className="auth-lable">Password</span>

          <div className="flex">
            <input
              className="auth-input"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={(e) =>
                setUserData((prevs) => ({ ...prevs, password: e.target.value }))
              }
            />
            <RiLockPasswordFill className="auth-icons" />
          </div>
        </div>
        <div className="auth-buttons">
          <button className="auth-btn" onClick={() => handleLogin()}>
            Login
          </button>
          <button className="auth-btn" onClick={() => handleTestUserLogin()}>
            Login As test User
          </button>
        </div>

        <p className="flex" style={{alignItems:"center",gap:"0.5rem"}}>
          <Link to="/signup">Create New Account</Link><FaUserPlus style={{margin:"0.2rem"}} className="auth-icons" />
        </p>
      </div>
    </div>
  );
}
export default Login;
