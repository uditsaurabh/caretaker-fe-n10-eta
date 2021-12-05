import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDisease, getReqDisease } from "redux/userActions";
import {
  CloseOutlined,
  CheckOutlined,
  IssuesCloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import secureAxios from "services/http";
import { toTitleCase } from "constants/constant";
import ResolveDialog from "./resolve";
import CommonCard from "common/card";
import TextInput from "common/input";
import OrangeButton from "common/button";
import PreLoader from "common/loader";
import "./index.scss";

const Disease = () => {
  const dispatch = useDispatch();
  const { disease, loading, reqDisease } = useSelector(
    (state) => state.userReducer
  );
  const [diseaseInput, setDiseaseInput] = useState("");
  const [open, setOpen] = useState(false);
  const [resolve, setResolve] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getDisease());
  }, []); //eslint-disable-line

  useEffect(() => {
    dispatch(getReqDisease());
  }, []); //eslint-disable-line

  const handleResolve = (val) => {
    setResolve(val);
    setOpen(true);
  };

  const closeResolve = () => {
    setOpen(false);
  };

  const success = (type) => {
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

  const addDisease = () => {
    setLoad(true);
    secureAxios.post("/add-disease", { disease: diseaseInput }).then((res) => {
      if (res.data.status) {
        setLoad(false);
        success("Disease added successfully");
        dispatch(getDisease());
        setDiseaseInput("");
      } else {
        setLoad(false);
        success("Invalid data");
      }
    });
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <CommonCard>
            <PreLoader />
          </CommonCard>
        </div>
      ) : (
        <div className="disease">
          <CommonCard>
            <div className="user-request">
              <h1>User requests</h1>
              <hr />
              <div className="requests">
                {reqDisease &&
                  reqDisease.map((item) => {
                    const { reqDisease, userName, _id } = item;
                    return (
                      <div className="request-content" key={_id}>
                        <div className="info">
                          <p>Name - {toTitleCase(userName)}</p>
                          <p>Disease - {reqDisease}</p>
                        </div>
                        <div className="icons">
                          <CloseOutlined />
                          <IssuesCloseOutlined
                            onClick={() => handleResolve(reqDisease)}
                          />
                          <CheckOutlined onClick={addDisease} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CommonCard>
          <CommonCard>
            <div className="add">
              <h1>List of disease</h1>
              <hr />
              <div className="disease-list">
                {disease &&
                  disease.map((item, i) => {
                    const { disease } = item;
                    return (
                      <div className="list-content" key={i}>
                        <p>{toTitleCase(disease)}</p>
                        <DeleteOutlined />
                      </div>
                    );
                  })}
              </div>
              <hr />
              <TextInput
                placeholder="Disease"
                color="grey"
                value={diseaseInput}
                change={(e) => setDiseaseInput(e.target.value)}
              />
              <OrangeButton
                text="Add disease"
                type="orange-button"
                click={addDisease}
                loading={load}
              />
            </div>
          </CommonCard>
          {open && (
            <ResolveDialog
              resolve={resolve}
              diseaseList={disease}
              closeResolve={closeResolve}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Disease;
