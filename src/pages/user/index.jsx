import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import OrangeButton from "../../common/button";
import CommonCard from "../../common/card";
import TextInput from "../../common/input";
import { bloodGroup, gender, defaultImage } from "./constant";
import "./index.scss";

const User = ({ addProfile, closeProfile }) => {
  const history = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [fileList, setFileList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const handleChange = (node, val) => {
    let updateDetail = Object.assign({}, userDetail);
    updateDetail[node] = val;
    setUserDetail(updateDetail);
  };

  const addNewMember = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user");

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

    axios({
      method: "post",
      url: "https://stark-island-21254.herokuapp.com/create_profile",
      data: formData,
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
    }).then((res) => console.log(res));
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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader?.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="user">
      <CommonCard>
        {addProfile && (
          <div className="close-icon">
            <CloseOutlined onClick={closeProfile} />
          </div>
        )}
        <form
          onSubmit={addNewMember}
          className={addProfile ? "user-content profile" : "user-content"}
        >
          <div className="image-section">
            <img src={defaultImage} alt="detail" />
            <Upload {...imageProps} className="dp">
              <Button className="orange-button">Upload image</Button>
            </Upload>
            <Upload {...props}>
              <Button className="orange-button">Upload reports</Button>
            </Upload>
          </div>
          <div className="form-section">
            <TextInput
              placeholder="Name"
              color="grey"
              value={userDetail?.name}
              change={(e) => handleChange("name", e.target.value)}
            />
            <TextInput
              placeholder="Age"
              color="grey"
              value={userDetail?.age}
              change={(e) => handleChange("age", e.target.value)}
            />
            <TextInput
              placeholder="Emergency contact"
              color="grey"
              value={userDetail?.emergencyContact}
              change={(e) => handleChange("emergency_contact", e.target.value)}
            />
            <select
              name="bloodGroup"
              onChange={(e) => handleChange("blood_group", e.target.value)}
              defaultValue="bloodGroup"
              className="orange"
            >
              <option value="bloodGroup" disabled>
                Blood Group
              </option>
              {bloodGroup.map((item, i) => (
                <option value={item.value} key={i}>
                  {item.value}
                </option>
              ))}
            </select>
            <select
              name="gender"
              onChange={(e) => handleChange("gender", e.target.value)}
              defaultValue="gender"
            >
              <option value="gender" disabled>
                Gender
              </option>
              {gender.map((item, i) => (
                <option value={item.value} key={i}>
                  {item.name}
                </option>
              ))}
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
              <option value="other">Other</option>
            </select>
          </div>
        </form>
        <div className="save-button">
          <OrangeButton
            text="Save"
            type="orange-button"
            submit="submit"
            click={addProfile ? addNewMember : () => history("/dashboard")}
          />
        </div>
      </CommonCard>
    </div>
  );
};

export default User;
