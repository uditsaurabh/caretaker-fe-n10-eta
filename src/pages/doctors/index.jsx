import React, { useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import CommonCard from "../../common/card";
import OrangeButton from "../../common/button/index";
import TextInput from "../../common/input";
import axios from "axios";
import AddDoctor from "./addDoctor";
import "./index.scss";

const Doctors = ({ boarding }) => {
  const data = [
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "XYZ",
      experience: "3",
      expertise: "Cardiologist",
      fees: "50",
    },
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "ABC",
      experience: "6",
      fees: "50",
      expertise: "Neurologist",
    },
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "DEF",
      experience: "8",
      fees: "50",
      expertise: "Dermatologists",
    },
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "UVW",
      experience: "10",
      fees: "50",
      expertise: "Endocrinologists",
    },
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "XYZA",
      experience: "3",
      expertise: "Cardiologist",
      fees: "50",
    },
  ];

  const [doctor, setDoctor] = useState(data[0]);
  const [addDoctor, setAddDoctor] = useState(false);

  const viewDoctor = (name) => {
    data.forEach((item) => {
      if (item.name === name) {
        setDoctor(item);
      }
    });
  };

  const handleCloseDialog = () => {
    setAddDoctor(false);
  };

  const handleCall = () => {
    axios
      .post(
        "https://api.cluster.dyte.in/v1/organizations/10b2adc1-93a1-427a-a3b5-8b6d84a96c91/meeting",
        { title: "Consultation", authorization: { waitingRoom: true } },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "8bb9c4e4a9b1488f8435",
          },
        }
      )
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
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
            {data.map((item, i) => (
              <div
                className={item.name === doctor.name ? "list active" : "list"}
                key={i}
                onClick={() => viewDoctor(item.name)}
              >
                <img src={item.image} alt="member" />
                <div className="info">
                  <p>Name - Dr. {item.name}</p>
                  <p>Expertise - {item.expertise}</p>
                  <p>Experience - {item.experience} years</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CommonCard>
      <CommonCard>
        <div className="doctor-info">
          {boarding && (
            <div className="board-icons">
              <EditOutlined />
              <DeleteOutlined />
            </div>
          )}
          <div className="details">
            <img
              src="https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg"
              alt="detail"
            />
            <div className="doc-info">
              <p>Name - Dr. {doctor?.name}</p>
              <p>Expertise - {doctor?.expertise}</p>
              <p>Experience - {doctor?.experience} years</p>
              <p>Fees - INR {doctor?.fees}/-</p>
            </div>
            {!boarding && (
              <>
                <hr />
                <span className="note">For a consultation please pay fees</span>
                <OrangeButton
                  text="Pay"
                  type="orange-button"
                  click={handleCall}
                />
              </>
            )}
          </div>
        </div>
      </CommonCard>
      {addDoctor && <AddDoctor handleCloseDialog={handleCloseDialog} />}
    </div>
  );
};

export default Doctors;
