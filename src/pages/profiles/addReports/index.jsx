import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Upload, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getProfiles } from "redux/userActions";
import secureAxios from "services/http";
import { showMessage } from "constants/constant";
import OrangeButton from "common/button";
import "./index.scss";

const AddReports = ({ closeProfile, profile }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  const [fileList, setFileList] = useState([]);
  const [load, setLoad] = useState(false);
  const { _id } = profile;

  const handleUploadReports = () => {
    setLoad(true);
    const formData = new FormData();

    formData.append("pid", _id);
    formData.append("access_token", token);
    fileList.forEach((file) => {
      formData.append("reports", file);
    });

    secureAxios.post("/upload_report", formData).then((res) => {
      if (res.data.status) {
        setLoad(false);
        showMessage("Reports added");
        dispatch(getProfiles(token));
        closeProfile();
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

  return (
    <div className="add-reports-container">
      <div className="close-icon">
        <CloseOutlined onClick={closeProfile} />
      </div>
      <div className="upload">
        <Upload {...props}>
          <Button className="orange-button">Upload reports</Button>
        </Upload>
      </div>
      <div className="done-button">
        <OrangeButton
          text="Save"
          type="orange-button"
          click={handleUploadReports}
          loading={load}
        />
      </div>
    </div>
  );
};

export default AddReports;
