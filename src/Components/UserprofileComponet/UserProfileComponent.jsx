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
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import PostDisplay from "../PostDisplay/PostDisplay";

export default function ProfileComponent() {
  const { active_user } = useContext(AuhtContext);
  const { postState } = useContext(PostContext);
  const { EditUser } = useContext(UserContext);
  const [editbio, setEditbio] = useState(false);
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
                    id="avatar"
                    onClick={(e) => {
                      EditUser(e);
                      //console.log(e.target.src);
                      //handleAvatarchange(e,image);
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
            <p style={{ padding: "0.5rem" }}>
              Followers
              <br /> {active_user.followers.length}
            </p>
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
          <form
            onSubmit={(e) => {
              setEditbio(false);
              EditUser(e);
            }}
            className=" user-info"
            style={{ display: editbio ? "flex" : "none" }}
          >
            <input
              type="text"
              className=" user-info-input"
              placeholder="add your portfolio link"
              defaultValue={active_user.profile}
              id="user_portfolio"
            />
            <input
              type="text"
              className=" user-info-input"
              id="user_bio"
              placeholder="tell others about yourself"
              defaultValue={active_user.bio}
            />
            <button
              className="bio-btn"
              type="submit"
              style={{ display: editbio ? "block" : "none" }}
            >
              Save Changes
            </button>
          </form>

          <div>
            <p>{active_user?.username}</p>
            <p>
              {active_user.profile && active_user?.profile.length > 0 ? (
                <a href={active_user.profile}>{active_user.profile}</a>
              ) : (
                "My Portfolio"
              )}
            </p>
            <p>
              {active_user.bio && active_user?.bio.length > 0
                ? active_user.bio
                : "My Bio"}
            </p>
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
