import { Select } from "antd";
import React from "react";
import "./index.scss";

const CommonSelect = ({
  options,
  defaultValue,
  onChange,
  display,
  ...props
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      //   className={styles.slct}
      {...props}
    >
      {options.map((item, index) => (
        <Select.Option
          key={index}
          value={JSON.stringify(item)}
          disabled={item.disabled}
        >
          {item[display] || item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CommonSelect;
