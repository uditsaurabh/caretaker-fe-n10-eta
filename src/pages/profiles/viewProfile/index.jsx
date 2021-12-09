import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FileAddOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { getProfiles } from "redux/userActions";
import { commonUtil } from "util/commonUtils";
import { defaultImage, toTitleCase, showMessage } from "constants/constant";
import OrangeButton from "common/button/index";

const ViewProfile = ({
  profile,
  setProfile,
  setAddReports,
  setEditProfile,
  setViewReports,
  userProfiles,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);

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
        throw err;
      });
  };

  const deleteProfile = () => {
    const { _id } = profile;
    const payload = { access_token: token, profile_id: _id };
    commonUtil("/delete_profile", payload).then((res) => {
      if (res.data.status) {
        dispatch(getProfiles(token));
        setProfile(userProfiles[0]);
        showMessage("Profile deleted");
      }
    });
  };

  const { name, age, blood_group, gender, disease } =
    profile?.profile_details || "";
  const { qr_code, profile_photo } = profile || "";

  let tempArray = disease && JSON.parse(JSON.stringify(disease));
  tempArray = tempArray.replace("[", "");
  tempArray = tempArray.replace("]", "");

  return (
    <div className="profile-detail">
      <div className="profile-icons">
        <FileAddOutlined onClick={() => setAddReports(true)} />
        <FileTextOutlined onClick={() => setViewReports(true)} />
        <EditOutlined onClick={() => setEditProfile(true)} />
        <DeleteOutlined onClick={deleteProfile} />
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
            <p>Diseases - {toTitleCase(tempArray)}</p>
          </div>
          <div className="qr-code">
            <QrcodeOutlined />
          </div>
          <a href={qr_code} target="_blank" rel="noreferrer">
            <OrangeButton
              text="Download"
              type="orange-button"
              click={saveFile}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
