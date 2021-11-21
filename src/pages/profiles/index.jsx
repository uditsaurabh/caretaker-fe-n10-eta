import React, { useState, useEffect } from "react";
import CommonCard from "../../components/common/card";
import TextInput from "../../components/common/input";
import OrangeButton from "../../components/common/button/index";
import User from "../user";
import secureAxios from "../../services/http";
import {
  UserAddOutlined,
  FileAddOutlined,
  FileTextOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import "./index.scss";

const Profiles = ({ token }) => {
  const [addProfile, setAddProfile] = useState(false);
  const [allProfiles, setAllProfiles] = useState([]);
  const [profile, setProfile] = useState({});

  const closeProfile = () => {
    setAddProfile(false);
  };

  const viewProfile = (id) => {
    allProfiles.forEach((item) => {
      if (item._id === id) {
        setProfile(item);
      }
    });
  };

  const getData = async () => {
    const token = sessionStorage.getItem("user");
    secureAxios
      .post("/get_profile_list", { access_token: token })
      .then((res) => {
        setAllProfiles(res?.data?.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getData();
    return () => null;
  }, []);

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
            {allProfiles &&
              allProfiles.map((item) => (
                <div
                  className={
                    item.profile_details.name === profile?.profile_details?.name
                      ? "profile-section active"
                      : "profile-section"
                  }
                  key={item._id}
                  onClick={() => viewProfile(item._id)}
                >
                  <img
                    src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
                    alt="member"
                  />
                  <div className="info">
                    <p>Name - Mr. {item?.profile_details?.name}</p>
                    <p>Age - {item?.profile_details?.age} years</p>
                    <p>Gender - Male</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CommonCard>
      <CommonCard>
        <div className="profile-detail">
          <div className="profile-icons">
            <FileAddOutlined />
            <EditOutlined />
            <DeleteOutlined />
          </div>
          {profile && (
            <div className="details">
              <img
                src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
                alt="detail"
              />
              <div className="user-info">
                <p>Name - {profile?.profile_details?.name}</p>
                <p>Age - {profile?.profile_details?.age} years</p>
                <p>Gender - Male</p>
                <p>Blood group - {profile?.profile_details?.blood_group}</p>
                <p>Diseases - {profile?.profile_details?.gender}</p>
              </div>
              <div className="qr-code">
                <QrcodeOutlined />
              </div>
              <OrangeButton text="Download" type="orange-button" />
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
