import React, { useState } from "react";
import CommonCard from "../../components/common/card";
import OrangeButton from "../../components/common/button/index";
import TextInput from "../../components/common/input";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";

const Doctors = () => {
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
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "ABCD",
      experience: "6",
      fees: "50",
      expertise: "Neurologist",
    },
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "DEFG",
      experience: "8",
      fees: "50",
      expertise: "Dermatologists",
    },
    {
      image: "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg",
      name: "TUVW",
      experience: "10",
      fees: "50",
      expertise: "Endocrinologists",
    },
  ];

  const [doctor, setDoctor] = useState(data[0]);

  const viewDoctor = (name) => {
    data.forEach((item) => {
      if (item.name === name) {
        setDoctor(item);
      }
    });
  };

  return (
    <div className="doctors">
      <CommonCard>
        <div className="doctor-list">
          <div className="search-bar">
            <TextInput placeholder="Search doctor..." />
            <SearchOutlined />
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
            <hr />
            <span className="note">For a consultation please pay fees</span>
            <OrangeButton text="Pay" type="orange-button" />
          </div>
        </div>
      </CommonCard>
    </div>
  );
};

export default Doctors;
