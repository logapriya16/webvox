import React, { useContext } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./signup.css"
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
        <div>
          <label htmlFor="first-name">Firstname : </label>
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
        </div>
        <div>
          <label htmlFor="last-name">Lastname : </label>
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
        <div>
          <label htmlFor="e-mail">Email : </label>
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
        <div>
          <label htmlFor="username">Username : </label>
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
        <div>
          <label htmlFor="password"> Password : </label>
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
        </div>
        <div>
          <button
          className="auth-btn"
          onClick={() => handleSignUp()}>Sign Up</button>
        </div>
        <div>
          <p>
            Already having an account? <Link to="/login">Log In here</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
