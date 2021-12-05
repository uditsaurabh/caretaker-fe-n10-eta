import React from "react";
import CommonCard from "common/card";
import AdminLineChart from "./lineChart";
import AdminPieChart from "./pieChart";
import "./index.scss";

const AdminDashboard = () => {
  const stats = [
    { title: "Users", count: 5, id: 0 },
    { title: "Doctors", count: 3, id: 1 },
    { title: "Reports", count: 15, id: 2 },
  ];
  return (
    <div className="admin-container">
      <CommonCard>
        <div className="admin-content">
          <div className="stats">
            {stats.map((item) => {
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
            <div className="line-chart">
              <AdminLineChart />
            </div>
            <div className="pie-chart">
              <AdminPieChart />
            </div>
          </div>
        </div>
      </CommonCard>
    </div>
  );
};

export default AdminDashboard;
