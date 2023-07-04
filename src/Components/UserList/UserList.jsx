import React, { useContext } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import "./UserList.css";
import { PostContext } from "../../Contexts/PostContext";
import { HiTrendingUp } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaSort } from "react-icons/fa";
import { toast } from "react-toastify";

export default function UserList() {
  const { TrendingHandler, LatestHandler } = useContext(PostContext);
  const { users } = useContext(UserContext);
  const { active_user, followUser, UnfollowUser } = useContext(AuhtContext);
  return (
    <div className="other-users">
      <div>
        <span onClick={() => TrendingHandler()} className="sort-btn">
          <HiTrendingUp className="sort-icon" />
          Trending
        </span>
        <span onClick={() => LatestHandler()} className="sort-btn">
          <FaSort className="sort-icon" />
          Latest
        </span>
      </div>
      <ul>
        <h4 style={{ padding: "0.9rem" }}> people you might know</h4>
        {users
          .filter(
            (person) =>
              person._id !== active_user._id &&
              person.username !== active_user.username
          )
          .map((item) => {
            return (
              <div>
                {active_user?.following?.find(
                  ({ username }) => username === item.username
                ) ? (
                  <div></div>
                ) : (
                  <div>
                    <li type="none" key={item._id} className="each-user">
                      <p>
                        <BsFillPersonFill className="avatar" />
                      </p>
                      <div>
                        <p className="otheruser-pills">
                          {item.firstName}
                          {item.lastName}
                        </p>
                        <p className="otheruser-pills">{item.username}</p>
                      </div>
                      <button
                        className="follow-btn"
                        onClick={() => {
                          followUser(item._id);
                          toast.info("new user followed", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }}
                      >
                        +Follow
                      </button>
                    </li>
                  </div>
                )}
              </div>
            );
          })}
      </ul>

      <ul>
        <h4 style={{ padding: "0.9rem" }}>people you already know</h4>
        {users
          .filter(
            (person) =>
              person._id !== active_user._id &&
              person.username !== active_user.username
          )
          .map((item) => {
            return (
              <div>
                {active_user?.following?.find(
                  ({ username }) => username === item.username
                ) ? (
                  <div>
                    <li type="none" key={item._id} className="each-user">
                      <p>
                        <BsFillPersonFill className="avatar" />
                      </p>
                      <div>
                        <p className="otheruser-pills">
                          {item.firstName}
                          {item.lastName}
                        </p>
                        <p className="otheruser-pills">{item.username}</p>
                      </div>
                      <button
                        className="follow-btn"
                        onClick={() => {
                          UnfollowUser(item._id);
                          toast.info(" user Unfollowed", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }}
                      >
                        Unfollow
                      </button>
                    </li>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
}
