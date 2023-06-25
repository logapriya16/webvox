import React, { useContext } from "react";
import { AuhtContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import "./UserList.css";
import { PostContext } from "../../Contexts/PostContext";
import { BsFillPersonFill } from "react-icons/bs";
export default function UserList() {
  const { TrendingHandler, LatestHandler } = useContext(PostContext);
  const { users } = useContext(UserContext);
  const { active_user } = useContext(AuhtContext);
  return (
    <div className="other-users">
      <div>
        <span onClick={() => TrendingHandler()}>Trending</span>
        <span onClick={() => LatestHandler()}>Latest</span>
      </div>
      <p>people you might know</p>
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
                    {item.firstName} {item.lastName}
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
