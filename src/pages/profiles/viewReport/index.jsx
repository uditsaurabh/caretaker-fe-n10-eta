import React from "react";
import moment from "moment";
import { CloseOutlined } from "@ant-design/icons";
import "./index.scss";

const ViewReports = ({ profile, closeProfile }) => {
  const { reports } = profile;
  return (
    <div className="view-reports">
      <div className="close-icon">
        <CloseOutlined onClick={closeProfile} />
      </div>
      {reports.length > 0 ? (
        <div className="reports-container">
          {reports.map((item, i) => {
            const { file_url, uploaded_at } = item;
            let uploadDate = new Date(uploaded_at);
            uploadDate = moment(uploadDate).format("MMMM Do YYYY");
            return (
              <div className="reports" key={i}>
                <p>Uploaded at - {uploadDate}</p>
                <img src={file_url} alt={uploaded_at} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-reports">
          <h1>No reports</h1>
          <p>Please add some reports</p>
        </div>
      )}
    </div>
  );
};

export default ViewReports;
