import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";

const Header = ({ handleLogout }) => {
  const [open, setOpen] = useState(false);
  const container = useRef(false);
  const location = useLocation();
  let pathnName = location.pathname;
  pathnName = pathnName.slice(1, pathnName.length);

  const toTitleCase = (s) => {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
  };

  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest(`.${container.current.className}`) && open) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

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
