import React, { useContext, useEffect } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import "./UserList.css";
import { PostContext } from "../../Contexts/PostContext";
import { HiTrendingUp } from "react-icons/hi";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const { TrendingHandler, LatestHandler } = useContext(PostContext);
  const { filteredusers } = useContext(UserContext);
  const { active_user, followUser, UnfollowUser } = useContext(AuhtContext);
  const navigate = useNavigate();
  const Isfollowing = (item) =>
    active_user?.following.find((person) => person.username === item)
      ? true
      : false;
useEffect(()=>{},[filteredusers])
      return (
    <div className="other-users">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <span onClick={() => TrendingHandler()} className="sort-btn">
          <HiTrendingUp className="sort-icon" />
          Trending
        </span>
        <span onClick={() => LatestHandler()} className="sort-btn">
          <FaSort className="sort-icon" />
          Latest
        </span>
      </div>
      <ul type="none">
        <h4 style={{ padding: "0.9rem" }}> people you might know</h4>
        {filteredusers.length > 0 ? (
          filteredusers
            .filter((person) => person.username !== active_user.username)
            .map((item) => {
              return (
                <li key={item._id} className="each-user">
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
              );
            })
        ) : (
          <h5>No such user found</h5>
        )}
      </ul>
    </div>
  );
}
