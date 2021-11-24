import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import TextInput from "../../../common/input";
import OrangeButton from "../../../common/button";
import "./index.scss";

const AddDoctor = ({ handleCloseDialog }) => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [imageList, setImageList] = useState("");

  const handleChange = (node, val) => {
    let updateDetail = Object.assign({}, doctorInfo);
    updateDetail[node] = val;
    setDoctorInfo(updateDetail);
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
    <div className="add-doctor">
      <div className="close-icon">
        <CloseOutlined onClick={handleCloseDialog} />
      </div>
      <div className="doc-details">
        <TextInput
          placeholder="Name"
          color="grey"
          value={doctorInfo?.name}
          change={(e) => handleChange("name", e.target.value)}
        />
        <TextInput
          placeholder="Expertise"
          color="grey"
          value={doctorInfo?.expertise}
          change={(e) => handleChange("expertise", e.target.value)}
        />
        <TextInput
          placeholder="Experience"
          color="grey"
          value={doctorInfo?.experience}
          change={(e) => handleChange("experience", e.target.value)}
        />
        <TextInput
          placeholder="Fees"
          color="grey"
          value={doctorInfo?.fees}
          change={(e) => handleChange("fees", e.target.value)}
        />
        <Upload {...imageProps}>
          <Button className="orange-button">Upload image</Button>
        </Upload>
      </div>
      <div className="save">
        <OrangeButton text="Save" type="orange-button" />
      </div>
    </div>
  );
};

export default AddDoctor;
