import React from "react";
import { Input } from "antd";
import "./index.scss";

function TextInput({ change, size, placeholder, maxLength, value, color }) {
  return (
    <>
      <Input
        onChange={change}
        size={size}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        className={color}
      />
    </>
  );
}
export default TextInput;
