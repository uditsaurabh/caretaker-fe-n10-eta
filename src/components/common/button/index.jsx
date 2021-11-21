import React from "react";
import { Button } from "antd";
import "./index.scss";

const OrangeButton = ({ text, type, disabled, click, submit }) => {
  return (
    <>
      <Button
        disabled={disabled}
        className={type}
        onClick={click}
        type={submit}
      >
        {text}
      </Button>
    </>
  );
};

export default OrangeButton;
