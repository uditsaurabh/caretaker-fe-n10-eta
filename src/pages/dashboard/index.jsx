import React, { useState } from "react";
import CommonCard from "../../components/common/card";
import "billboard.js/dist/theme/insight.css";
import "./index.scss";
import LineChart from "./billboard";

const Dashboard = () => {
  const [testName, setTestName] = useState("Haemoglobin");
  const test = [
    { name: "RBC count" },
    { name: "WBC count" },
    { name: "Platelet count" },
    { name: "Haemoglobin" },
  ];

  return (
    <div className="dashboard">
      <CommonCard>
        <div className="graph">
          <h1>
            Blood report <span>- {testName}</span>
          </h1>
          <LineChart />
          <p>
            Biological Reference interval - <b> 13.0 - 17.0 g/dL</b>
          </p>
        </div>
      </CommonCard>
      <CommonCard>
        <div className="test-name">
          <h1>Test name</h1>
          <hr />
          {test.map((item, i) => (
            <p
              key={i}
              onClick={() => setTestName(item.name)}
              className={`${
                testName === item.name ? "test-list active" : "test-list"
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </CommonCard>
    </div>
  );
};

export default Dashboard;
