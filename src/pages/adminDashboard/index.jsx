import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdmin } from "redux/userActions";
import CommonCard from "common/card";
import AdminLineChart from "./lineChart";
import AdminPieChart from "./pieChart";
import "./index.scss";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getAdmin());
  }, []); //eslint-disable-line

  return (
    <div className="admin-container">
      <CommonCard>
        <div className="admin-content">
          <div className="stats">
            {admin &&
              admin.length > 0 &&
              admin.map((item) => {
                const { title, count, id } = item;
                return (
                  <div className="stats-data" key={id}>
                    <h1>Total {title}</h1>
                    <p>{count}</p>
                  </div>
                );
              })}
          </div>
          <div className="charts">
            {admin && admin.length > 0 && (
              <div className="line-chart">
                <AdminLineChart />
              </div>
            )}
            {admin && admin.length > 0 && (
              <div className="pie-chart">
                <AdminPieChart />
              </div>
            )}
          </div>
        </div>
      </CommonCard>
    </div>
  );
};

export default AdminDashboard;
