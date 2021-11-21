import React, { PureComponent } from "react";
import { line, zoom } from "billboard.js";
import BillboardChart from "./BillboardChart";

const LINE_CHART_DATA = {
  // x: "x",
  columns: [
    // ["x", "2021-08-16", "2021-09-16", "2021-10-16", "2021-11-16"],
    ["A", 10, 14, 12, 17, 18, 21],
    ["D", 15, 16, 16, 14, 12, 10],
    ["K", 14, 16, 13, 11, 15, 19],
  ],
  type: line(),
  zoom: {
    enabled: zoom(),
    type: "drag",
  },
  // axis: {
  //   x: {
  //     type: "timeseries",
  //     tick: {
  //       values: ["2021-08-16", "2021-08-16"],
  //     },
  //   },
  // },
};

const SUBCHART = {
  show: true,
};

class LineChart extends PureComponent {
  static displayName = "LineChart";

  state = {
    data: LINE_CHART_DATA,
  };

  componentDidMount() {
    this.setState(({ data }) => {
      return {
        data: {
          ...data,
          columns: data.columns.map((values) => {
            return values[0] === "data3"
              ? ["data3", 130, 150, 200, 300, 200, 100]
              : values;
          }),
        },
      };
    });
  }

  element = null;

  getRef = (Instance) => {
    this.element = Instance;
  };

  render() {
    return (
      <BillboardChart
        data={this.state.data}
        isPure
        ref={this.getRef}
        subchart={SUBCHART}
      />
    );
  }
}

export default LineChart;
