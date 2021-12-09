import React, { useState, useRef, useEffect } from "react";
import { toTitleCase } from "constants/constant";
import { useLocation } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import "./index.scss";

const Header = ({ handleLogout, handleToggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const container = useRef(false);
  const location = useLocation();
  let pathName = location.pathname;
  pathName = pathName.slice(1, pathName.length);

  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${container?.current?.className}`) && open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
  return (
    <>
      {pathName !== "emerygencydetails" && (
        <div className="header">
          <div className="left-icons">
            <MenuOutlined onClick={handleToggleSidebar} />
            <p>{pathName ? toTitleCase(pathName) : "Dashboard"}</p>
          </div>
          <div className="container" ref={container}>
            <div onClick={() => setOpen((open) => !open)}>
              <UserOutlined />
            </div>
            {open && (
              <div className="dropdown">
                <ul>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
