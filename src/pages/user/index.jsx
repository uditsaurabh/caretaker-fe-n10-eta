import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "redux/userActions";
import { commonUtil } from "util/commonUtils";
import { showMessage, warnMessage } from "constants/constant";
import OrangeButton from "common/button";
import CommonCard from "common/card";
import TextInput from "common/input";
import PreLoader from "common/loader";
import "./index.scss";

const User = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userReducer);
  const [detail, setDetail] = useState({});
  const [load, setLoad] = useState(false);

  const handleChange = (node, val) => {
    let updateData = Object.assign({}, detail);
    updateData[node] = val;
    setDetail(updateData);
  };

  const handleSave = () => {
    setLoad(true);
    const token = localStorage.getItem("user");

    const formData = new FormData();
    formData.append("access_token", token);
    Object.keys(detail).forEach((key) => formData.append(key, detail[key]));

    commonUtil("/updateAccountDetails", formData).then((res) => {
      if (res.data.status) {
        showMessage("Details updated");
        setLoad(false);
        history("/profiles");
      } else {
        warnMessage("Network wrror");
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    dispatch(getUser(token));
  }, []); //eslint-disable-line

  const { phone_number, user_name: name, user_email: email } = user?.data || "";
  const { user_name, user_email } = detail || "";

  return (
    <>
      {loading ? (
        <div className="loading">
          <CommonCard>
            <PreLoader />
          </CommonCard>
        </div>
      ) : (
        <div className="user-profile">
          <CommonCard>
            <div className="user-details">
              <TextInput
                placeholder={name ? name : "Name"}
                change={(e) => handleChange("user_name", e.target.value)}
                value={user_name}
              />
              <TextInput
                placeholder={email ? email : "Email"}
                change={(e) => handleChange("user_email", e.target.value)}
                value={user_email}
              />
              <TextInput
                placeholder="Mobile"
                value={phone_number}
                disabled={true}
              />
              <OrangeButton
                text="Save"
                type="orange-button"
                click={handleSave}
                loading={load}
              />
            </div>
          </CommonCard>
        </div>
      )}
    </>
  );
};

export default User;
