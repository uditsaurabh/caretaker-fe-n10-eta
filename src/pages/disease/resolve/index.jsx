import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { showMessage } from "constants/constant";
import secureAxios from "services/http";
import OrangeButton from "common/button";

const ResolveDialog = ({
  resolve,
  diseaseList,
  closeResolve,
  rejectDisease,
}) => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [mergeLoad, setMergeLoad] = useState(false);

  const mergeDisease = () => {
    setMergeLoad(true);
    secureAxios
      .post("/merge-disease", {
        disease: selectedDisease,
        mergeDisease: resolve,
      })
      .then((res) => {
        if (res.data.status) {
          setMergeLoad(false);
          showMessage("Merge request success");
          rejectDisease(resolve);
          closeResolve();
        }
      });
  };

  return (
    <div className="resolve">
      <div className="close-icon" onClick={closeResolve}>
        <CloseOutlined />
      </div>
      <p>
        Please select the disease to merge <b>{resolve}</b>?
      </p>
      <select
        defaultValue="disease"
        onChange={(e) => setSelectedDisease(e.target.value)}
      >
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
      <OrangeButton
        text="Proceed"
        type="orange-button"
        click={mergeDisease}
        loading={mergeLoad}
      />
    </div>
  );
};

export default ResolveDialog;
