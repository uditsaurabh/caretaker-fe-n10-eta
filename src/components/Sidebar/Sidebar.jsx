import React from "react";
import { UserOutlined, ProjectOutlined, TeamOutlined } from "@ant-design/icons";
import { ReactComponent as DoctorIcon } from "../../assets/icons/doctor.svg";
import { ReactComponent as Logo } from "../../assets/icons/medical-device.svg";
import { Link, useLocation } from "react-router-dom";
import sidebarBackground from "../../assets/sidebar/sidebar.jpg";
import "./Sidebar.scss";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="background">
        <img src={sidebarBackground} alt="bg" />
        <div className="icons">
          <div className="logo">
            <span>
              <Logo fill="white" style={{ height: "24px", width: "24px" }} />
            </span>
            <h3>Care Tracker</h3>
          </div>
          <div className="menu">
            <Link
              className={`${
                location.pathname === "/user" ? "nav nav-active" : "nav"
              }`}
              to="/user"
            >
              <UserOutlined />
              <p>User</p>
            </Link>
            <Link
              className={`${
                location.pathname === "/dashboard" ? "nav nav-active" : "nav"
              }`}
              to="/dashboard"
            >
              <ProjectOutlined rotate={180} />
              <p>Dashboard</p>
            </Link>
            <Link
              className={`${
                location.pathname === "/profiles" ? "nav nav-active" : "nav"
              }`}
              to="/profiles"
            >
              <TeamOutlined />
              <p>Profiles</p>
            </Link>
            <Link
              className={`${
                location.pathname === "/doctors" ? "nav nav-active" : "nav"
              }`}
              to="/doctors"
            >
              <span>
                <DoctorIcon
                  fill="white"
                  style={{ height: "24px", width: "24px" }}
                />
              </span>
              <p>Doctors</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
