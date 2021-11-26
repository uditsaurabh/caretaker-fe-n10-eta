import React, { useState } from "react";
import {
  CloseOutlined,
  CheckOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import ResolveDialog from "./resolve";
import CommonCard from "../../common/card";
import TextInput from "../../common/input";
import OrangeButton from "../../common/button";
import "./index.scss";

const Disease = () => {
  const [disease, setDisease] = useState("");
  const [open, setOpen] = useState(false);
  const [resolve, setResolve] = useState("");

  const handleResolve = (val) => {
    setResolve(val);
    setOpen(true);
  };

  const closeResolve = () => {
    setOpen(false);
  };

  const data = [
    { name: "Mr.ABC", disease: "Sugar" },
    { name: "Mr.DEF", disease: "BP" },
    { name: "Mr.ABC", disease: "Sugar" },
    { name: "Mr.DEF", disease: "BP" },
    { name: "Mr.ABC", disease: "Sugar" },
    { name: "Mr.DEF", disease: "BP" },
    { name: "Mr.DEF", disease: "BP" },
    { name: "Mr.ABC", disease: "Sugar" },
    { name: "Mr.DEF", disease: "BP" },
  ];

  const diseaseList = [
    "Diabetes",
    "Hypertension",
    "Cholera",
    "Coronavirus (COVID-19)",
    "Dengue",
    "Hepatitis",
    "Tuberculosis",
    "Chikungunya",
    "Rabies",
  ];
  return (
    <div className="disease">
      <CommonCard>
        <div className="user-request">
          <h1>User requests</h1>
          <hr />
          <div className="requests">
            {data.map((item, i) => (
              <div className="request-content" key={i}>
                <div className="info">
                  <p>Name - {item.name}</p>
                  <p>Disease - {item.disease}</p>
                </div>
                <div className="icons">
                  <CloseOutlined />
                  <IssuesCloseOutlined
                    onClick={() => handleResolve(item.disease)}
                  />
                  <CheckOutlined />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CommonCard>
      <CommonCard>
        <div className="add">
          <h1>List of disease</h1>
          <hr />
          <div className="disease-list">
            {diseaseList.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
          <hr />
          <TextInput
            placeholder="Disease"
            color="grey"
            value={disease}
            change={(e) => setDisease(e.target.value)}
          />
          <OrangeButton text="Add disease" type="orange-button" />
        </div>
      </CommonCard>
      {open && (
        <ResolveDialog
          resolve={resolve}
          diseaseList={diseaseList}
          closeResolve={closeResolve}
        />
      )}
    </div>
  );
};

export default Disease;
