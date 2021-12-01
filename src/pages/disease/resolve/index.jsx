import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import OrangeButton from "common/button";

const ResolveDialog = ({ resolve, diseaseList, closeResolve }) => {
  return (
    <div className="resolve">
      <div className="close-icon" onClick={closeResolve}>
        <CloseOutlined />
      </div>
      <p>
        Please select the disease to merge <b>{resolve}</b>?
      </p>
      <select defaultValue="disease">
        <option value="disease" disabled>
          Disease
        </option>
        {diseaseList.map((item) => {
          const { _id, disease } = item;
          return (
            <option key={_id} value={disease}>
              {disease}
            </option>
          );
        })}
      </select>
      <OrangeButton text="Proceed" type="orange-button" />
    </div>
  );
};

export default ResolveDialog;
