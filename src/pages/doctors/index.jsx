import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctor } from "redux/userActions";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import CommonCard from "common/card";
import OrangeButton from "common/button/index";
import TextInput from "common/input";
import PreLoader from "common/loader";
import AddDoctor from "./addDoctor";
import "./index.scss";

const Doctors = ({ boarding }) => {
  const dispatch = useDispatch();
  const { doctor, loading } = useSelector((state) => state.userReducer);
  const [openDoctor, setOpenDoctor] = useState(doctor[0]);
  const [addDoctor, setAddDoctor] = useState(false);

  useEffect(() => {
    dispatch(getDoctor());
  }, []); //eslint-disable-line

  const viewDoctor = (name) => {
    doctor.forEach((item) => {
      const { user_name } = item;
      if (user_name === name) {
        setOpenDoctor(item);
      }
    });
  };

  const handleCloseDialog = () => {
    setAddDoctor(false);
  };

  const {
    doctor_experience,
    doctorProfilePhoto,
    dpctor_expertise,
    user_name: doctorName,
    doctor_fees,
  } = openDoctor || "";

  return (
    <>
      {loading ? (
        <div className="loading">
          <CommonCard>
            <PreLoader />
          </CommonCard>
        </div>
      ) : (
        <div className="doctors">
          <CommonCard>
            <div className="doctor-list">
              <div className="doc-top">
                <div className="search-bar">
                  <TextInput placeholder="Search doctor..." />
                  <SearchOutlined />
                </div>
                {boarding && (
                  <div className="add-doc">
                    <UserAddOutlined onClick={() => setAddDoctor(true)} />
                  </div>
                )}
              </div>
              <div className="list-content">
                {doctor &&
                  doctor.map((item, i) => {
                    const {
                      doctor_experience,
                      doctorProfilePhoto,
                      dpctor_expertise,
                      user_name,
                    } = item;
                    return (
                      <div
                        className={
                          user_name === doctorName ? "list active" : "list"
                        }
                        key={i}
                        onClick={() => viewDoctor(user_name)}
                      >
                        <img src={doctorProfilePhoto} alt="member" />
                        <div className="info">
                          <p>Name - Dr. {user_name}</p>
                          <p>Expertise - {dpctor_expertise}</p>
                          <p>Experience - {doctor_experience} years</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CommonCard>
          <CommonCard>
            <div className="doctor-info">
              <div className="details">
                <img src={doctorProfilePhoto} alt="detail" />
                <div className="doc-info">
                  <p>Name - Dr. {doctorName}</p>
                  <p>Expertise - {dpctor_expertise}</p>
                  <p>Experience - {doctor_experience} years</p>
                  <p>Fees - INR {doctor_fees}/-</p>
                </div>
                {!boarding && (
                  <>
                    <hr />
                    <span className="note">
                      For a consultation please pay fees
                    </span>
                    <OrangeButton text="Pay" type="orange-button" />
                  </>
                )}
              </div>
            </div>
          </CommonCard>
          {addDoctor && <AddDoctor handleCloseDialog={handleCloseDialog} />}
        </div>
      )}
    </>
  );
};

export default Doctors;
