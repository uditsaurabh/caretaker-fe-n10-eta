import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboard } from "redux/userActions";
import LineChart from "./billboard";
import { test } from "constants/constant";
import CommonCard from "common/card";
import "billboard.js/dist/theme/insight.css";
import "./index.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, token } = useSelector((state) => state.userReducer);
  const [testName, setTestName] = useState(test[0]);
  console.log(dashboard);

  useEffect(() => {
    const { value } = testName;
    dispatch(getDashboard(token, value));
  }, []);

  return (
    <div className="dashboard">
      <CommonCard>
        <div className="graph">
          <h1>
            Blood report <span>- {testName.name}</span>
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
          {test.map((item, i) => {
            const { name } = item;
            return (
              <p
                key={i}
                onClick={() => setTestName(item)}
                className={`${
                  testName.name === name ? "test-list active" : "test-list"
                }`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </CommonCard>
    </div>
  );
};

export default Dashboard;
