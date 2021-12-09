import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import TextInput from "common/input";
import OrangeButton from "common/button";
import { commonUtil } from "util/commonUtils";
import { showMessage } from "constants/constant";
import "./index.scss";

const RequestDialog = ({ closeRequest }) => {
  const [details, setDetails] = useState({});
  const [load, setLoad] = useState(false);

  const handleChange = (node, val) => {
    const data = Object.assign({}, details);
    data[node] = val;
    setDetails(data);
  };

  const requestDisease = () => {
    setLoad(true);
    commonUtil("/add-req-disease", details).then((res) => {
      if (res.data.status) {
        showMessage("Request sent");
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
