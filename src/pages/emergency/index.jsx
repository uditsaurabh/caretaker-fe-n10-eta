import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getEmergency } from "redux/userActions";
import { defaultImage, toTitleCase } from "constants/constant";
import PreLoader from "common/loader";
import "./index.scss";

const Emergency = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const { emergency, loading } = useSelector((state) => state.userReducer);
  const { age, blood_group, emergency_contact, name, disease } =
    emergency?.profile_details || "";
  const pid = new URLSearchParams(search).get("pid");

  useEffect(() => {
    dispatch(getEmergency(pid));
  }, []); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className="load">
          <PreLoader />
        </div>
      ) : (
        <>
          {emergency && Object.keys(emergency).length > 0 && (
            <div className="emergency-container">
              <div className="header">
                <h1>Care Tracker</h1>
              </div>
              <div className="content">
                <img src={defaultImage} alt="defaultImage" />
                <p>
                  Name - <b>{toTitleCase(name)}</b>
                </p>
                <p>
                  Age - <b>{age}</b>
                </p>
                <p>
                  Blood group - <b>{blood_group}</b>
                </p>
                <p>
                  Emergency contact - <b>{emergency_contact}</b>
                </p>
                <p>
                  Pre known diseases - <b>{toTitleCase(disease)}</b>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Emergency;
