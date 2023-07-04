import React, { useContext } from "react";
import "./UserProfileComponent.css";
import { AuhtContext } from "../../Contexts/AuthContext";
import { PostContext } from "../../Contexts/PostContext";
import { UserContext } from "../../Contexts/UserContext";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import { Card } from "antd";

export default function ProfileComponent() {
  const { active_user, UnfollowUser ,UserAvatar} = useContext(AuhtContext);
  const { postState } = useContext(PostContext);
  const {  userbio, Setuserbio } = useContext(UserContext);
  const [editbio, setEditbio] = useState(false);
  const [displayFollowers, setDisplayFollowers] = useState(false);

  return (
    <div className="curr-us-pro">
      <h1 style={{ textAlign: "left" }}>{active_user.username}</h1>

      <div className="profile-upper">
        <div className="profile-avatar">
          <UserAvatar />
          <p>{active_user.username}</p>
        </div>

        <div className="profile-followers">
          <span
            onClick={() => setDisplayFollowers(true)}
            style={{ padding: "0.5rem",cursor:"pointer" }}
          >
            Followers
            <br /> {active_user.followers.length}
          </span>
          <Card
            title="your followers"
            bordered={false}
            style={{ width: 300, display: displayFollowers ? "block" : "none" }}
          >
            <p onClick={() => setDisplayFollowers(false)}>close</p>
            {active_user.following.map((person) => (
              <div style={{ display: "flex" }}>
                <div>ava{}</div>
                <div>
                  <p>
                    {person.firstName}
                    {person.lastName}
                  </p>
                  <p>{person.username}</p>
                </div>
              </div>
            ))}
          </Card>
          <p style={{ padding: "0.5rem" }}>
            Following <br />
            {active_user.following.length}
          </p>
          <p style={{ padding: "0.5rem" }}>
            Posts <br />
            {postState.curr_user_post.length}
          </p>
        </div>
      </div>
      <div className="profile-middle">
        <BsPencilSquare onClick={() => setEditbio(true)} />
        <div
          className=" user-info"
          style={{ display: editbio ? "flex" : "none" }}
        >
          {/* <div style={{ width: "300px" }}>
            <lable className="user-info-lable">Portfolio Link : </lable>
            <br />
            <lable className="user-info-lable"> Bio :</lable>
            <br />
            <lable className="user-info-lable">Hoobies : </lable>
          </div> */}
          <div>
            <input
              type="text"
              className=" user-info-input"
              placeholder="add your portfolio link"
              onChange={(e) =>
                Setuserbio((item) => ({ ...item, profileURL: e.target.value }))
              }
            />
            <input
              type="text"
              className=" user-info-input"
              placeholder="tell others about yourself"
              onChange={(e) =>
                Setuserbio((item) => ({ ...item, profileBio: e.target.value }))
              }
            />
            <input
              type="text"
              className=" user-info-input"
              placeholder="your hobbies"
              onChange={(e) =>
                Setuserbio((item) => ({
                  ...item,
                  Profilehobbies: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <button
          className="bio-btn"
          onClick={() => setEditbio(false)}
          style={{ display: editbio ? "block" : "none" }}
        >
          Save Changes
        </button>
        <div>
          <p>
            Visit My Portfolio :
            <a href={userbio.profileURL}>{userbio.profileURL}</a>{" "}
          </p>
          <p>About Me :{userbio.profileBio}</p>
          <p>My Hoobxies : {userbio.Profilehobbies}</p>
        </div>
      </div>
      <div className="profile-lower">
        <ul>
          {postState.curr_user_post.map((post) => (
            <li type="none" key={post._id}>
              {post.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
