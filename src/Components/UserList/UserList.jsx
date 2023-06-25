import React, { useContext } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import "./UserList.css";
import { PostContext } from "../../Contexts/PostContext";
import { HiTrendingUp } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaSort } from "react-icons/fa";

export default function UserList() {
  const { TrendingHandler, LatestHandler } = useContext(PostContext);
  const { users } = useContext(UserContext);
  const { active_user } = useContext(AuhtContext);
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
      <h4 style={{ padding: "0.9rem" }}>people you might know</h4>
      <ul>
        {users
          .filter((person) => person._id !== active_user._id)
          .map((item) => (
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
                <button className="follow-btn">+Follow</button>
              </li>
              <hr />
            </div>
          ))}
      </ul>
    </div>
  );
}
