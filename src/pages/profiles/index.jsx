import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import { getProfiles, getUser } from "redux/userActions";
import { defaultImage, toTitleCase } from "constants/constant";
import AddProfile from "./addProfile";
import AddReports from "./addReports";
import ViewReports from "./viewReport";
import ViewProfile from "./viewProfile";
import CommonCard from "common/card";
import TextInput from "common/input";
import PreLoader from "common/loader";
import "./index.scss";

const Profiles = () => {
  const dispatch = useDispatch();
  const { userProfiles, loading, token } = useSelector(
    (state) => state.userReducer
  );
  const [addProfile, setAddProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [requestDisease, setRequestDisease] = useState(false);
  const [addReports, setAddReports] = useState(false);
  const [viewReports, setViewReports] = useState(false);
  const [profile, setProfile] = useState(userProfiles[0]);

  const closeProfile = () => {
    setAddProfile(false);
    setRequestDisease(false);
    setEditProfile(false);
    setAddReports(false);
    setViewReports(false);
  };

  const openRequest = () => {
    setRequestDisease(true);
  };
  const closeRequest = () => {
    setRequestDisease(false);
  };

  const viewProfile = (id) => {
    userProfiles.forEach((item) => {
      if (item._id === id) {
        setProfile(item);
      }
    });
  };

  useEffect(() => {
    dispatch(getUser(token));
    dispatch(getProfiles(token));
  }, []); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className="loading">
          <CommonCard>
            <PreLoader />
          </CommonCard>
        </div>
      ) : (
        <div className="profiles">
          <CommonCard>
            <div className="main-content">
              <div className="top-section">
                <div className="search-bar">
                  <TextInput placeholder="Search profile..." />
                  <SearchOutlined />
                </div>
                <div className="icons">
                  <UserAddOutlined onClick={() => setAddProfile(true)} />
                </div>
              </div>
              <div className="profile-content">
                {userProfiles.length > 0 &&
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
            {profile && Object.keys(profile).length > 0 && (
              <ViewProfile
                profile={profile}
                setProfile={setProfile}
                setAddReports={setAddReports}
                setEditProfile={setEditProfile}
                setViewReports={setViewReports}
                userProfiles={userProfiles}
              />
            )}
          </CommonCard>
          {addProfile && (
            <div className="profile-dialog">
              <AddProfile
                addProfile={addProfile}
                closeProfile={closeProfile}
                token={token}
                requestDisease={requestDisease}
                closeRequest={closeRequest}
                openRequest={openRequest}
              />
            </div>
          )}
          {editProfile && (
            <div className="profile-dialog">
              <AddProfile
                closeProfile={closeProfile}
                profile={profile}
                editProfile={editProfile}
                addProfile={addProfile}
              />
            </div>
          )}
          {addReports && (
            <AddReports closeProfile={closeProfile} profile={profile} />
          )}
          {viewReports && (
            <ViewReports closeProfile={closeProfile} profile={profile} />
          )}
        </div>
      )}
    </>
  );
};

export default Profiles;
