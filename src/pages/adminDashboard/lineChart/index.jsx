import React from "react";
import { line } from "billboard.js";
import BillboardChart from "react-billboardjs";
import "billboard.js/dist/theme/insight.css";

let data = {
  columns: [["Users/month", 0, 1, 3, 2, 5, 1, 4, 8]],
  type: line(),
};

const AdminLineChart = () => {
  return (
    <div className="App">
      <BillboardChart
        data={data}
        color={{
          pattern: ["#dc4405"],
        }}
      />
    </div>
  );
};

export default AdminLineChart;
