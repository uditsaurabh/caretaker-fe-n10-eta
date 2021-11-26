import React from "react";
import { Button } from "antd";
import "./index.scss";

const OrangeButton = ({ text, type, disabled, click, submit, loading }) => {
  return (
    <>
      <Button
        disabled={disabled || loading}
        className={type}
        onClick={click}
        type={submit}
        loading={loading}
      >
        {text}
      </Button>
    </>
  );
};

export default OrangeButton;
