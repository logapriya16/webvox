import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import SignUp from "./pages/SignUpPage/signup";
import Login from "./pages/LoginPage/login";
import Explore from "./pages/ExplorePage/Explore";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import LandingPage from "./pages/LandingPage/LandingPage";
import Profile from "./pages/Profile/Profile";
import RequirsAuth from "./Components/RequirsAuth";
import OthersProfile from "./pages/OthersProfile/OthersProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequirsAuth>
              <LandingPage />
            </RequirsAuth>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/explore"
          element={
            <RequirsAuth>
              <Explore />
            </RequirsAuth>
          }
        />
        <Route
          path="/bookmark"
          element={
            <RequirsAuth>
              <Bookmarks />
            </RequirsAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequirsAuth>
              <Profile />
            </RequirsAuth>
          }
        />
        <Route
          path="/profile/:profileID"
          element={
            <RequirsAuth>
              <OthersProfile />
            </RequirsAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
