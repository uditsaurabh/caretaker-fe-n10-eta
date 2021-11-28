import React, { useState } from "react";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import secureAxios from "services/http";
import TextInput from "common/input";
import OrangeButton from "common/button";
import "antd/lib/message/style/index.css";
import "./index.scss";

const RequestDialog = ({ closeRequest }) => {
  const [details, setDetails] = useState({});
  const [load, setLoad] = useState(false);

  const handleChange = (node, val) => {
    const data = Object.assign({}, details);
    data[node] = val;
    setDetails(data);
  };

  const success = () => {
    message.success({
      content: "Request sent",
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

  const requestDisease = () => {
    setLoad(true);
    secureAxios.post("/add-req-disease", details).then((res) => {
      if (res.data.status) {
        success();
        setLoad(false);
        closeRequest();
      }
    });
  };

  return (
    <div className="request-cont">
      <div className="close" onClick={closeRequest}>
        <CloseOutlined />
      </div>
      <div className="request-form">
        <TextInput
          placeholder="Name"
          change={(e) => handleChange("userName", e.target.value)}
          value={details?.userName}
        />
        <TextInput
          placeholder="Disease"
          change={(e) => handleChange("reqDisease", e.target.value)}
          value={details?.reqDisease}
        />
        <OrangeButton
          text="Request"
          type="orange-button"
          click={requestDisease}
          loading={load}
        />
      </div>
    </div>
  );
};

export default RequestDialog;
