import React, { useContext } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./signup.css";
function SignUp() {
  const { userCredentials, setUserCredentials, SignUp } =
    useContext(AuhtContext);
  const handleSignUp = () => {
    if (
      !userCredentials.firstname.trim() ||
      !userCredentials.lastname.trim() ||
      !userCredentials.email.trim() ||
      !userCredentials.password.trim() ||
      !userCredentials.username.trim()
    ) {
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
      SignUp(userCredentials);
    }
  };

  return (
    <div className="signup-container">
      <div className="content-signup">
        <h2>Webvox</h2>
      </div>
      <div className="signup-card">
        <div className="auth-element">
          <label className="auth-lable" htmlFor="first-name">
            Firstname :{" "}
          </label>
          <div>
            <input
              className="auth-input "
              id="first-name"
              type="text"
              placeholder="Enter firstname"
              value={userCredentials.firstname}
              onChange={(e) =>
                setUserCredentials((prev) => ({
                  ...prev,
                  firstname: e.target.value,
                }))
              }
            />
            <AiOutlineUser />
          </div>
        </div>
        <div className="auth-element">
          <label htmlFor="last-name" className="auth-lable">
            Lastname :{" "}
          </label>
          <input
            className="auth-input "
            id="last-name"
            type="text"
            placeholder="Enter lastname"
            value={userCredentials.lastname}
            onChange={(e) =>
              setUserCredentials((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />
        </div>
        <div className="auth-element">
          <label htmlFor="e-mail" className="auth-lable">
            Email :{" "}
          </label>
          <input
            className="auth-input "
            id="e-mail"
            type="email"
            placeholder="Enter Email"
            value={userCredentials.email}
            onChange={(e) =>
              setUserCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="auth-element">
          <label htmlFor="username" className="auth-lable">
            Username :{" "}
          </label>
          <input
            className="auth-input "
            id="username"
            type="text"
            placeholder="Enter Username"
            value={userCredentials.username}
            onChange={(e) =>
              setUserCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </div>
        <div className="auth-element">
          <label htmlFor="password" className="auth-lable">
            
            Password :
          </label>
          <div>
            <input
              className="auth-input "
              id="password"
              type="password"
              placeholder="Enter password"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <RiLockPasswordFill />
          </div>
        </div>
        <div className="auth-buttons">
          <button className="auth-btn" onClick={() => handleSignUp()}>
            Sign Up
          </button>
        </div>
        <p>
          Already having an account? <Link to="/login">Log In here</Link>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
