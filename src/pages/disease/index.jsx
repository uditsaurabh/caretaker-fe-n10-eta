import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDisease, getReqDisease, getUser } from "redux/userActions";
import {
  CloseOutlined,
  CheckOutlined,
  IssuesCloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { commonUtil } from "util/commonUtils";
import { toTitleCase, showMessage } from "constants/constant";
import CommonCard from "common/card";
import TextInput from "common/input";
import OrangeButton from "common/button";
import PreLoader from "common/loader";
import ResolveDialog from "./resolve";
import RejectDisease from "./reject";
import "./index.scss";

const Disease = () => {
  const dispatch = useDispatch();
  const { disease, loading, reqDisease, token } = useSelector(
    (state) => state.userReducer
  );
  const [diseaseInput, setDiseaseInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openReject, setopenReject] = useState(false);
  const [resolve, setResolve] = useState("");
  const [load, setLoad] = useState(false);
  const [rejectLoad, setRejectLoad] = useState(false);

  const handleResolve = (node, val) => {
    if (node === "resolve") {
      setOpen(true);
    }
    if (node === "reject") {
      setopenReject(true);
    }
    setResolve(val);
  };

  const rejectDisease = (val) => {
    setRejectLoad(true);
    const payload = { reqDisease: val };
    commonUtil("/delete-req-disease", payload).then((res) => {
      if (res.data.status) {
        setRejectLoad(false);
        showMessage("Request removed");
        dispatch(getReqDisease());
        setopenReject(false);
      } else {
        setRejectLoad(false);
        showMessage("Invalid data");
      }
    });
  };

  const addDisease = () => {
    setLoad(true);
    const payload = { disease: diseaseInput };
    commonUtil("/add-disease", payload).then((res) => {
      if (res.data.status) {
        setLoad(false);
        showMessage("Disease added successfully");
        dispatch(getDisease());
        setDiseaseInput("");
      } else {
        setLoad(false);
        showMessage("Invalid data");
      }
    });
  };

  const deleteDisease = (val) => {
    const payload = { disease: val };
    commonUtil("/delete-disease", payload).then((res) => {
      if (res.data.status) {
        dispatch(getDisease());
        showMessage(`${toTitleCase(val)} removed`);
      }
    });
  };

  const closeResolve = () => {
    setOpen(false);
    setopenReject(false);
  };

  useEffect(() => {
    dispatch(getUser(token));
    dispatch(getDisease());
    dispatch(getReqDisease());
  }, []); //eslint-disable-line

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
                          <CloseOutlined
                            onClick={() => handleResolve("reject", reqDisease)}
                          />
                          <IssuesCloseOutlined
                            onClick={() => handleResolve("resolve", reqDisease)}
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
                        <DeleteOutlined
                          onClick={() => deleteDisease(disease)}
                        />
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
              rejectDisease={rejectDisease}
            />
          )}
          {openReject && (
            <RejectDisease
              resolve={resolve}
              closeResolve={closeResolve}
              rejectDisease={rejectDisease}
              rejectLoad={rejectLoad}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Disease;
