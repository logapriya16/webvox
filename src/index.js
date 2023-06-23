import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import AuthProvider, { AuhtContext } from "./Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Postprovider, { PostContext } from "./Contexts/PostContext";
import UserProvider from "./Contexts/UserContext";
import BookmarkProvider from "./Contexts/BookmarkContext";

//call make server
makeServer();
export { AuhtContext };
export {PostContext}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
        <Postprovider>
          <BookmarkProvider>
          <App />
          </BookmarkProvider>
        </Postprovider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
