import React from "react";
import { line, zoom } from "billboard.js";
import BillboardChart from "react-billboardjs";
import "billboard.js/dist/theme/insight.css";

const LineChart = ({ dashboard }) => {
  let chartData = Object.entries(dashboard);
  let finalArray = [];
  for (let key in Object.keys(chartData)) {
    let dataArray = [];
    dataArray.push(chartData[key][0]);
    for (let index in Object.keys(chartData[key][1])) {
      dataArray.push(chartData[key][1][index][0]);
    }
    finalArray.push(dataArray);
  }

  let data = {
    columns: finalArray,
    type: line(),
  };

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
