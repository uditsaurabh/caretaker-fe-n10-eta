import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, ProjectOutlined, TeamOutlined } from "@ant-design/icons";
import { ReactComponent as DoctorIcon } from "assets/icons/doctor.svg";
import { ReactComponent as Logo } from "assets/icons/medical-device.svg";
import { ReactComponent as Virus } from "assets/icons/bacteria.svg";
import sidebarBackground from "assets/sidebar/sidebar.jpg";
import "./index.scss";

const Sidebar = ({ userType }) => {
  const location = useLocation();
  const { pathname } = location;
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
            {userType !== "doctor" && (
              <Link
                className={`${pathname === "/user" ? "nav nav-active" : "nav"}`}
                to="/user"
              >
                <UserOutlined />
                <p>User</p>
              </Link>
            )}
            {userType === "user" && (
              <Link
                className={`${
                  pathname === "/dashboard" || pathname === "/"
                    ? "nav nav-active"
                    : "nav"
                }`}
                to="/dashboard"
              >
                <ProjectOutlined rotate={180} />
                <p>Dashboard</p>
              </Link>
            )}
            {userType === "admin" && (
              <Link
                className={`${
                  pathname === "/admin-dashboard" || pathname === "/"
                    ? "nav nav-active"
                    : "nav"
                }`}
                to="/admin-dashboard"
              >
                <ProjectOutlined rotate={180} />
                <p>Dashboard</p>
              </Link>
            )}
            {userType === "doctor" && (
              <Link
                className={`${
                  pathname === "/doctor-Dashboard" || pathname === "/"
                    ? "nav nav-active"
                    : "nav"
                }`}
                to="/doctor-Dashboard"
              >
                <ProjectOutlined rotate={180} />
                <p>Dashboard</p>
              </Link>
            )}

            {userType === "admin" ? (
              <Link
                className={`${
                  pathname === "/disease" ? "nav nav-active" : "nav"
                }`}
                to="/disease"
              >
                <span>
                  <Virus
                    fill="white"
                    style={{ height: "24px", width: "24px" }}
                  />
                </span>
                <p>Disease</p>
              </Link>
            ) : userType === "user" ? (
              <Link
                className={`${
                  pathname === "/profiles" ? "nav nav-active" : "nav"
                }`}
                to="/profiles"
              >
                {userType === "admin" ? <Virus /> : <TeamOutlined />}
                <p>Profiles</p>
              </Link>
            ) : (
              ""
            )}
            {userType !== "doctor" && (
              <Link
                className={`${
                  pathname === "/doctors" || pathname === "/on-boarding"
                    ? "nav nav-active"
                    : "nav"
                }`}
                to={userType === "admin" ? "/on-boarding" : "/doctors"}
              >
                <span>
                  <DoctorIcon
                    fill="white"
                    style={{ height: "24px", width: "24px" }}
                  />
                </span>
                <p>Doctors</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
