import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./OthersProfile.css";
import UpperNav from "../../Components/UpperNav";
import Navbar from "../../Components/Navbar/Navbar";
import UserList from "../../Components/UserList/UserList";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../Contexts/UserContext";
import PostDisplay from "../../Components/PostDisplay/PostDisplay";
import { PostContext } from "../../Contexts/PostContext";
import { AuhtContext } from "../../Contexts/AuthContext";

export default function OthersProfile() {
  const { userstate } = useContext(UserContext);
  const { postState } = useContext(PostContext);
  const { profileID } = useParams();
  const { active_user, followUser, UnfollowUser } = useContext(AuhtContext);
  const Isfollowing = (item) =>
    active_user?.following.find((person) => person.username === item)
      ? true
      : false;

  return (
    <div>
      <UpperNav />
      <div className="OthersProfile_container">
        <div>
          <Navbar />
        </div>
        <div>
          <ul>
            {" "}
            {userstate.users
              .filter((item) => item._id === profileID)
              .map((user) => (
                <li type="none">
                  <h1 style={{ textAlign: "left" }}>{user.username}</h1>

                  <div className="profile-upper">
                    <div className="profile-avatar">
                      <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        src={user.avatar}
                      />
                      <br />
                      <br />
                    </div>
                    <div className="profile-followers">
                      <span style={{ padding: "0.5rem" }}>
                        Followers
                        <br /> {user.followers.length}
                      </span>
                      <span style={{ padding: "0.5rem" }}>
                        Following <br />
                        {user.following.length}
                      </span>
                    </div>
                  </div>
                  <div className="profile-middle">
                    <div>
                      <div className="flex" style={{alignItems:'center'}}>
                        <p>{user.username}</p>
                        <p>
                          {userstate.users
                            .filter(
                              (person) =>
                                person.username !== active_user.username && person.username === user.username
                            )
                            .map((item) => {
                              return (
                                <div>
                                  <li
                                    type="none"
                                    key={item._id}
                                    className="each-user"
                                  >
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
                        </p>
                      </div>
                      <p>
                        {user.profile && user.profile.length > 0 ? (
                          <a href={user.profile}>{user.profile}</a>
                        ) : (
                          "My Portfolio"
                        )}
                      </p>
                      <p>
                        {user.bio && user.bio.length > 0 ? user.bio : "My Bio"}
                      </p>
                    </div>
                  </div>
                  <div className="profile-lower">
                    {postState.allpost.map((post) =>
                      post.username === user.username ? (
                        <PostDisplay item={post} />
                      ) : null
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}
