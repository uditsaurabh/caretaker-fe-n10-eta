import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserAddOutlined,
  FileAddOutlined,
  FileTextOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { getProfiles } from "../../redux/userActions";
import { defaultImage } from "../user/constant";
import User from "../user";
import CommonCard from "../../common/card";
import TextInput from "../../common/input";
import OrangeButton from "../../common/button/index";
import "./index.scss";

const Profiles = ({ token }) => {
  const dispatch = useDispatch();
  const { userProfiles } = useSelector((state) => state.userReducer);
  const [addProfile, setAddProfile] = useState(false);
  const [profile, setProfile] = useState(userProfiles[0]);

  const closeProfile = () => {
    setAddProfile(false);
  };

  const toTitleCase = (s) => {
    return s?.charAt(0)?.toUpperCase() + s?.substr(1)?.toLowerCase();
  };

  const viewProfile = (id) => {
    userProfiles.forEach((item) => {
      if (item._id === id) {
        setProfile(item);
      }
    });
  };

  const saveFile = (e) => {
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    const token = localStorage.getItem("user");
    dispatch(getProfiles(token));
  };

  useEffect(() => {
    getData();
  }, []);

  const { name, age, blood_group, gender, disease } =
    profile?.profile_details || "";
  const { qr_code, profile_photo } = profile || "";

  return (
    <div className="profiles">
      <CommonCard>
        <div className="main-content">
          <div className="top-section">
            <div className="search-bar">
              <TextInput placeholder="Search profile..." />
              <SearchOutlined />
            </div>
            <div className="icons">
              <FileAddOutlined />
              <UserAddOutlined onClick={() => setAddProfile(true)} />
              <FileTextOutlined />
            </div>
          </div>
          <div className="profile-content">
            {userProfiles &&
              userProfiles.map((item) => {
                const { name, age, gender } = item.profile_details;
                const image = item.profile_photo;
                return (
                  <div
                    className={
                      name === profile?.profile_details?.name
                        ? "profile-section active"
                        : "profile-section"
                    }
                    key={item._id}
                    onClick={() => viewProfile(item._id)}
                  >
                    <img src={image ? image : defaultImage} alt="member" />
                    <div className="info">
                      <p>
                        Name - {gender === "male" ? "Mr." : "Miss"}{" "}
                        {toTitleCase(name)}
                      </p>
                      <p>Age - {age} years</p>
                      <p>Gender - {toTitleCase(gender)}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </CommonCard>
      <CommonCard>
        <div className="profile-detail">
          <div className="profile-icons">
            <EditOutlined />
            <DeleteOutlined />
          </div>
          {profile && (
            <div className="details">
              <img
                src={profile_photo ? profile_photo : defaultImage}
                alt="detail"
              />
              <div className="user-info">
                <p>Name - {toTitleCase(name)}</p>
                <p>Age - {age} years</p>
                <p>Gender - {toTitleCase(gender)}</p>
                <p>Blood group - {blood_group}</p>
                <p>Diseases - {toTitleCase(disease)}</p>
              </div>
              <div className="qr-code">
                <QrcodeOutlined />
              </div>
              <a href={qr_code} rel="noreferrer" target="_blank">
                <OrangeButton
                  text="Download"
                  type="orange-button"
                  click={saveFile}
                />
              </a>
            </div>
          )}
        </div>
      </CommonCard>
      {addProfile && (
        <ProfileDialog
          addProfile={addProfile}
          closeProfile={closeProfile}
          token={token}
        />
      )}
    </div>
  );
};

export default Profiles;

const ProfileDialog = ({ addProfile, closeProfile, token }) => {
  return (
    <div className="profile-dialog">
      <User addProfile={addProfile} closeProfile={closeProfile} token={token} />
    </div>
  );
};
