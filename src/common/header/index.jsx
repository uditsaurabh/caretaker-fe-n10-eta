import React, { useState, useRef, useEffect } from "react";
import { toTitleCase } from "constants/constant";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";

const Header = ({ handleLogout }) => {
  const [open, setOpen] = useState(false);
  const container = useRef(false);
  const location = useLocation();
  let pathnName = location.pathname;
  pathnName = pathnName.slice(1, pathnName.length);

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
    <div className="header">
      <p>{toTitleCase(pathnName)}</p>
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
  );
};

export default Header;
