import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboard, getUser } from "redux/userActions";
import { test } from "constants/constant";
import LineChart from "./lineChart";
import CommonCard from "common/card";
import PreLoader from "common/loader";
import "billboard.js/dist/theme/insight.css";
import "./index.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, token, loading } = useSelector(
    (state) => state.userReducer
  );
  const [testName, setTestName] = useState(test[0]);

  useEffect(() => {
    const { value } = testName;
    dispatch(getUser(token));
    dispatch(getDashboard(token, value));
  }, [testName]); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className="loading">
          <CommonCard>
            <PreLoader />
          </CommonCard>
        </div>
      ) : (
        <div className="dashboard">
          <CommonCard>
            <div className="graph">
              <h1>
                Blood report <span>- {testName.name}</span>
              </h1>
              <LineChart dashboard={dashboard} />
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
      )}
    </>
  );
};

export default Dashboard;
