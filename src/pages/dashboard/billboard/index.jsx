import React from "react";
import { line, zoom } from "billboard.js";
import BillboardChart from "react-billboardjs";
import "billboard.js/dist/theme/insight.css";
import moment from "moment";

let data = {
  columns: [
    ["Dinesh", 11, 12, 13, 14, 15, 16, 17, 18, 17, 16],
    ["Akshay", 10, 12, 14, 16, 18, 17, 15, 13, 14, 17],
    ["Kapil", 14, 12, 10, 11, 13, 15, 17, 16, 18, 16],
  ],
  type: line(),
};

const LineChart = () => {
  return (
    <div className="App">
      <BillboardChart
        data={data}
        zoom={{
          enabled: zoom(),
          type: "drag",
        }}
        color={{
          pattern: ["#1f77b4", "#aec7e8", "#ff7f0e"],
        }}
      />
    </div>
  );
};

export default LineChart;
