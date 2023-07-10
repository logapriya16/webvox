import React, { useContext } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import "./UserList.css";
import { PostContext } from "../../Contexts/PostContext";
import { HiTrendingUp } from "react-icons/hi";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const { TrendingHandler, LatestHandler } = useContext(PostContext);
  const { users } = useContext(UserContext);
  const { active_user, followUser, UnfollowUser } = useContext(AuhtContext);
  const navigate = useNavigate();
  const Isfollowing = (item) =>
    active_user?.following.find((person) => person.username === item)
      ? true
      : false;
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
          .filter((person) => person.username !== active_user.username)
          .map((item) => {
            return (
              <div>
                <li type="none" key={item._id} className="each-user">
                  <p>
                    <img
                      src={item.avatar}
                      alt=""
                      height="50px"
                      className="cursor"
                      onClick={() => navigate(`/profile/${item._id}`)}
                      style={{ borderRadius: "50%", margin: "0.7rem" }}
                    />
                  </p>
                  <div>
                    <p
                      className="otheruser-pills cursor"
                      onClick={() => navigate(`/profile/${item._id}`)}
                    >
                      {item.firstName}
                      {item.lastName}
                    </p>
                    <p
                      className="otheruser-pills cursor"
                      onClick={() => navigate(`/profile/${item._id}`)}
                    >
                      {item.username}
                    </p>
                  </div>
                  <div>
                    {Isfollowing(item.username) ? (
                      <button
                        className="follow-btn"
                        onClick={() => {
                          UnfollowUser(item._id);
                        }}
                      >
                        UnFollow
                      </button>
                    ) : (
                      <button
                        className="follow-btn"
                        onClick={() => {
                          followUser(item._id);
                        }}
                      >
                        +Follow
                      </button>
                    )}
                  </div>
                </li>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
