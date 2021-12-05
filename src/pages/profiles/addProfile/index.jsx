import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Upload, Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getProfiles } from "redux/userActions";
import secureAxios from "services/http";
import RequestDialog from "../requestDialog";
import OrangeButton from "common/button";
import CommonCard from "common/card";
import TextInput from "common/input";
import { bloodGroup, gender, defaultImage } from "constants/constant";
import "./index.scss";

const AddProfile = ({
  addProfile,
  closeProfile,
  requestDisease,
  closeRequest,
  openRequest,
  profile,
  editProfile,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  const [userDetail, setUserDetail] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [load, setLoad] = useState(false);
  const { name, age, blood_group, emergency_contact } =
    profile?.profile_details || "";
  const { _id } = profile || "";

  const handleChange = (node, val) => {
    let updateDetail = Object.assign({}, userDetail);
    updateDetail[node] = val;
    setUserDetail(updateDetail);

    if (val === "request") {
      openRequest();
    }
  };

  const showMessage = (type) => {
    message.success({
      content: type,
      duration: 3,
      className: "custom-class",
      style: {
        display: "flex",
        position: "fixed",
        left: "45%",
        top: "5vh",
        padding: "4px 8px",
        borderRadius: "4px",
        gap: "5px",
      },
    });
  };

  const addNewMember = (e) => {
    e.preventDefault();
    setLoad(true);

    const formData = new FormData();
    formData.append("access_token", token);
    Object.keys(userDetail).forEach((key) =>
      formData.append(key, userDetail[key])
    );

    fileList.forEach((file) => {
      formData.append("reports", file);
    });

    imageList.forEach((file) => {
      formData.append("profile_photo", file);
    });

    secureAxios.post("/create_profile", formData).then((res) => {
      if (res.data.status) {
        setLoad(false);
        showMessage("Profile added");
        closeProfile();
        dispatch(getProfiles(token));
      } else {
        setLoad(false);
        showMessage("Network error");
      }
    });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setLoad(true);

    const payload = {
      access_token: token,
      blood_group: userDetail.blood_group
        ? userDetail.blood_group
        : blood_group,
      age: userDetail.age ? userDetail.age : age,
      name: userDetail.name ? userDetail.name : name,
      emergency_contact: userDetail.emergency_contact
        ? userDetail.emergency_contact
        : emergency_contact,
      pid: _id,
    };

    secureAxios.post("/update_profile", payload).then((res) => {
      if (res.data.status) {
        setLoad(false);
        showMessage("Profile edit done");
        closeProfile();
        dispatch(getProfiles(token));
      }
    });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);

      return setFileList(newFileList);
    },
    beforeUpload: (file) => {
      let newList = fileList;
      newList.push(file);
      setFileList(newList);
      return false;
    },
    multiple: true,
    fileList: fileList,
    maxCount: 5,
  };

  const imageProps = {
    onRemove: (file) => {
      const index = imageList.indexOf(file);
      const newFileList = imageList.slice();
      newFileList.splice(index, 1);

      return setImageList(newFileList);
    },
    beforeUpload: (file) => {
      let newList = imageList;
      newList.push(file);
      setImageList(newList);
      return false;
    },
    multiple: true,
    imageList: imageList,
    maxCount: 1,
  };

  return (
    <div className="user">
      <CommonCard>
        <div className="close-icon">
          <CloseOutlined onClick={closeProfile} />
        </div>
        <form
          onSubmit={addProfile ? addNewMember : handleEditProfile}
          className={editProfile ? "edit-form" : "user-content"}
        >
          {addProfile && (
            <div className="image-section">
              <img src={defaultImage} alt="detail" />
              <Upload {...imageProps} className="dp">
                <Button className="orange-button">Upload image</Button>
              </Upload>
              <Upload {...props}>
                <Button className="orange-button">Upload reports</Button>
              </Upload>
            </div>
          )}
          <div className={"form-section"}>
            <TextInput
              placeholder={name ? name : "Name"}
              color="grey"
              value={userDetail?.name}
              change={(e) => handleChange("name", e.target.value)}
            />
            <TextInput
              placeholder={age ? age : "Age"}
              color="grey"
              value={userDetail?.age}
              change={(e) => handleChange("age", e.target.value)}
            />
            <TextInput
              placeholder={
                emergency_contact ? emergency_contact : "Emergency contact"
              }
              color="grey"
              value={userDetail?.emergencyContact}
              change={(e) => handleChange("emergency_contact", e.target.value)}
            />
            <select
              name="bloodGroup"
              onChange={(e) => handleChange("blood_group", e.target.value)}
              defaultValue={blood_group ? blood_group : "bloodGroup"}
              className="orange"
            >
              <option value="bloodGroup" disabled>
                Blood Group
              </option>
              {bloodGroup.map((item, i) => {
                const { value, label } = item;
                return (
                  <option value={value} key={i}>
                    {label}
                  </option>
                );
              })}
            </select>
            {addProfile && (
              <>
                <select
                  name="gender"
                  onChange={(e) => handleChange("gender", e.target.value)}
                  defaultValue="gender"
                >
                  <option value="gender" disabled>
                    Gender
                  </option>
                  {gender.map((item, i) => {
                    const { value, label } = item;
                    return (
                      <option value={value} key={i}>
                        {label}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="disease"
                  onChange={(e) => handleChange("disease", e.target.value)}
                  defaultValue="disease"
                >
                  <option value="disease" disabled>
                    Disease
                  </option>
                  <option value="hypertension">Hypertension</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="cancer">Cancer</option>
                  <option value="request">Request</option>
                </select>
              </>
            )}
          </div>
        </form>
        <div className="save-button">
          <OrangeButton
            text="Save"
            type="orange-button"
            submit="submit"
            click={addProfile ? addNewMember : handleEditProfile}
            loading={load}
          />
        </div>
      </CommonCard>
      {requestDisease && <RequestDialog closeRequest={closeRequest} />}
    </div>
  );
};

export default AddProfile;
