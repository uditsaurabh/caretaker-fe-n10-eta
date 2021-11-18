import React, { useState } from "react";
import OrangeButton from "../../components/common/button";
import CommonCard from "../../components/common/card";
import TextInput from "../../components/common/input";
import secureAxios from "../../services/http";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

const User = ({ addProfile, closeProfile }) => {
  const history = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [reports, setReports] = useState("");

  const handleChange = (node, val) => {
    let updateDetail = Object.assign({}, userDetail);
    updateDetail[node] = val;
    setUserDetail(updateDetail);
  };

  const onFileChange = (event) => {
    let files = event.target.files;
    // const reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (e) => {
    //   setReports(e.target.result);
    // };
    // setReports(files[0]);

    fileToDataUri(files[0]).then((dataUrl) => {
      setReports(dataUrl);
    });
  };

  const addNewMember = (reports) => {
    const token = sessionStorage.getItem("user");

    const formData = new FormData();
    formData.append("access_token", token);
    Object.keys(userDetail).forEach((key) =>
      formData.append(key, userDetail[key])
    );
    if (reports) {
      formData.append("reports", [reports]);
    }
    axios({
      method: "post",
      url: "https://stark-island-21254.herokuapp.com/create_profile",
      data: formData,
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await addNewMember(reports);
    console.log(res.data);
  };

  console.log(reports);

  return (
    <div className="user">
      <CommonCard>
        {addProfile && (
          <div className="close-icon">
            <CloseOutlined onClick={closeProfile} />
          </div>
        )}
        {/* <div > */}
        <form
          onSubmit={handleSubmit}
          className={addProfile ? "user-content profile" : "user-content"}
        >
          <div className="image-section">
            <img
              src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
              alt="detail"
            />
            <OrangeButton text="Upload image" type="orange-button" />
            <label htmlFor="upload-report">Upload reports</label>
            <input type="file" id="upload-report" onChange={onFileChange} />
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
            {/* <select
              name="gender"
              onChange={(e) => handleChange("gender", e.target.value)}
              defaultValue="gender"
            >
              <option value="gender" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select> */}
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
            <TextInput
              placeholder="Blood group"
              color="grey"
              value={userDetail?.bloodGroup}
              change={(e) => handleChange("blood_group", e.target.value)}
            />
            <TextInput
              placeholder="Emergency contact"
              color="grey"
              value={userDetail?.emergencyContact}
              change={(e) => handleChange("emergency_contact", e.target.value)}
            />
          </div>
        </form>
        {/* </div> */}
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
