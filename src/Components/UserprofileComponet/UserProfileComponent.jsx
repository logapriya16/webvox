import React, { useContext } from "react";
import { useState } from "react";

import { AuhtContext } from "../../Contexts/AuthContext";
import { PostContext } from "../../Contexts/PostContext";
import { UserContext } from "../../Contexts/UserContext";
import "./UserProfileComponent.css";
import pic2 from "../../imgs/pic2.jpg";
import pic3 from "../../imgs/pic3.jpg";
import pic4 from "../../imgs/pic4.jpg";
import pic5 from "../../imgs/pic5.jpg";
import pic6 from "../../imgs/pic6.jpg";

import { BsPencilSquare } from "react-icons/bs";
import { Card } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect } from "react";
import PostDisplay from "../PostDisplay/PostDisplay";

export default function ProfileComponent() {
  const { active_user } = useContext(AuhtContext);
  const { postState } = useContext(PostContext);
  const { userbio, Setuserbio, EditUser } = useContext(UserContext);
  const [editbio, setEditbio] = useState(false);
  //const [displayFollowers, setDisplayFollowers] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagesarray = [pic2, pic3, pic4, pic5, pic6];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAvatarchange = (img) => {
    console.log("inside componnet",img)
    Setuserbio(()=>({ ...userbio, avatar: img }));
    EditUser();
  };
  
  useEffect(() => {
    Setuserbio({
      profile: active_user ? active_user.profile : "",
      bio: active_user ? active_user.bio : "",
      avatar: active_user ? active_user.avatar : "",
    });
  }, []);
  return (
    <div className="curr-us-pro">
      <ul>
        <h1 style={{ textAlign: "left" }}>{active_user.username}</h1>

        <div className="profile-upper">
          <div className="profile-avatar">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={active_user.avatar}
            />
            <Modal
              title="Choose you avatar"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {imagesarray.map((image) => {
                return (
                  <img
                    src={image}
                    alt=""
                    onClick={() => {
                      handleOk();
                      handleAvatarchange(image);
                    }}
                    height="100px"
                    style={{ borderRadius: "50%", margin: "0.7rem" }}
                  />
                );
              })}
            </Modal>
            <br />
            <br />
            <Button onClick={() => showModal()}>Change Avatar</Button>
          </div>
          <div className="profile-followers">
            <span
              // onClick={() => setDisplayFollowers(true)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
            >
              Followers
              <br /> {active_user.followers.length}
            </span>
            {/* <Card
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
          </Card> */}
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
                defaultValue={userbio.profile}
                onChange={(e) =>
                  Setuserbio((item) => ({ ...item, profile: e.target.value }))
                }
              />
              <input
                type="text"
                className=" user-info-input"
                placeholder="tell others about yourself"
                defaultValue={userbio.bio}
                onChange={(e) =>
                  Setuserbio((item) => ({ ...item, bio: e.target.value }))
                }
              />
            </div>
          </div>
          <button
            className="bio-btn"
            onClick={() => {
              setEditbio(false);
              EditUser(userbio);
            }}
            style={{ display: editbio ? "block" : "none" }}
          >
            Save Changes
          </button>
          <div>
            <p>{active_user.username}</p>
            <p>
              {active_user.profile.length > 0 ? (
                <a href={active_user.profile}>{active_user.profile}</a>
              ) : (
                "My Portfolio"
              )}
            </p>
            <p>{active_user.bio.length > 0 ? active_user.bio : "My Bio"}</p>
          </div>
        </div>
        <div className="profile-lower">
          <ul>
            {postState.curr_user_post.map((post) => (
              <PostDisplay item={post} />
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
}
