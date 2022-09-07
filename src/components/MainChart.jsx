import { convertData } from "../utils";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "../Chart";
import React, { Component } from "react";

class MainChart extends Component {
  render() {
    const { stoksDataObj, dataSim } = this.props;

    const { nameSim, valueSim } = dataSim;

    const timeFrame = stoksDataObj.timeframe;

    if (stoksDataObj.charts === null) {
      return <div>Data chart is empty. Please try again later.</div>;
    }

    const stockData = convertData(stoksDataObj.charts);
    return (
      <div style={{ width: "100%" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          TimeFrame: {timeFrame}
        </h1>
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Symbol: {nameSim}
        </h3>
        <h4 style={{ display: "flex", justifyContent: "center" }}>
          idSimulation: {valueSim}
        </h4>
        <TypeChooser>
          {(type) => (
            <Chart type={type} data={stockData} timeFrame={timeFrame} />
          )}
        </TypeChooser>
      </div>
    );
  }
}

export default MainChart;
