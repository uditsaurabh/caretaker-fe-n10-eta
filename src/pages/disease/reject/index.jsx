import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import OrangeButton from "common/button";

const RejectDisease = ({
  resolve,
  closeResolve,
  rejectDisease,
  rejectLoad,
}) => {
  return (
    <div className="resolve">
      <div className="close-icon" onClick={closeResolve}>
        <CloseOutlined />
      </div>
      <p>
        Are you sure to reject <b>{resolve}</b> ?
      </p>
      <div>
        <OrangeButton
          text="Confirm"
          type="orange-button"
          loading={rejectLoad}
          click={() => rejectDisease(resolve)}
        />
      </div>
    </div>
  );
};

export default RejectDisease;
