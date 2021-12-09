import React from "react";
import { Input } from "antd";
import "./index.scss";

const TextInput = ({
  change,
  size,
  placeholder,
  maxLength,
  value,
  color,
  disabled,
  required,
}) => {
  return (
    <>
      <Input
        onChange={change}
        size={size}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        className={color}
        disabled={disabled}
        required={required ? required : false}
      />
    </>
  );
};
export default TextInput;
