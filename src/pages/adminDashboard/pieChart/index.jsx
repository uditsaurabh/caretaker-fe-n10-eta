import React from "react";
import { pie } from "billboard.js";
import BillboardChart from "react-billboardjs";
import "billboard.js/dist/theme/insight.css";

let data = {
  columns: [
    ["Users", 5],
    ["Doctors", 3],
    ["Reports", 15],
  ],
  type: pie(),
};

const PieChart = () => {
  return (
    <div className="App">
      <BillboardChart
        data={data}
        color={{
          pattern: ["#665191", "#ffa600", "#f95d6a"],
        }}
      />
    </div>
  );
};

export default PieChart;
