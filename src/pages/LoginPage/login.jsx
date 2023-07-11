import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuhtContext } from "../../Contexts/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
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
      <div className="content">
        <h2>Webvox</h2>
      </div>
      <div className="login-card">
        <div className="auth-element">
        <span className="auth-lable">Username</span>
          <div style={{ display: "flex" }}>
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
            <AiOutlineUser />
          </div>

        </div>
        <div className="auth-element">
        <span className="auth-lable">Password</span>

          <div style={{ display: "flex" }}>
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
            <RiLockPasswordFill />
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

        <p>
          <Link to="/signup">Create New Account</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
