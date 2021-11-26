import React from "react";
import { Card } from "antd";
import "./index.scss";

const CommonCard = ({ children }) => {
  return <Card className="card">{children}</Card>;
};

export default CommonCard;
