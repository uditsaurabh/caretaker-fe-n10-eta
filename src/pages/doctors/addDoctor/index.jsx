import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import { getDoctor } from "redux/userActions";
import { commonUtil } from "util/commonUtils";
import { showMessage } from "constants/constant";
import TextInput from "common/input";
import OrangeButton from "common/button";
import "./index.scss";

const AddDoctor = ({ handleCloseDialog }) => {
  const dispatch = useDispatch();
  const [doctorInfo, setDoctorInfo] = useState({});
  const [imageList, setImageList] = useState([]);
  const [load, setLoad] = useState(false);

  const handleChange = (node, val) => {
    let updateDetail = Object.assign({}, doctorInfo);
    updateDetail[node] = val;
    setDoctorInfo(updateDetail);
  };

  const boardDoctor = () => {
    const formData = new FormData();
    Object.keys(doctorInfo).forEach((key) =>
      formData.append(key, doctorInfo[key])
    );
    imageList.forEach((file) => {
      formData.append("doctorProfilePhoto", file);
    });

    setLoad(true);
    commonUtil("/doctor-add", formData).then((res) => {
      if (res.data.status) {
        setLoad(false);
        showMessage("Doctor added successfull");
        dispatch(getDoctor());
        handleCloseDialog();
      }
    });
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
          value={doctorInfo?.user_name}
          change={(e) => handleChange("user_name", e.target.value)}
        />
        <TextInput
          placeholder="Expertise"
          color="grey"
          value={doctorInfo?.dpctor_expertise}
          change={(e) => handleChange("doctor_expertise", e.target.value)}
        />
        <TextInput
          placeholder="Experience"
          color="grey"
          value={doctorInfo?.doctor_experience}
          change={(e) => handleChange("doctor_experience", e.target.value)}
        />
        <TextInput
          placeholder="Fees"
          color="grey"
          value={doctorInfo?.doctor_fees}
          change={(e) => handleChange("doctor_fees", e.target.value)}
        />
        <TextInput
          placeholder="Mobile"
          color="grey"
          value={doctorInfo?.phone_number}
          change={(e) => handleChange("phone_number", e.target.value)}
        />
        <Upload {...imageProps}>
          <Button className="orange-button">Upload image</Button>
        </Upload>
      </div>
      <div className="save">
        <OrangeButton
          text="Add"
          type="orange-button"
          click={boardDoctor}
          loading={load}
        />
      </div>
    </div>
  );
};

export default AddDoctor;
