import { convertData } from "../utils";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "../Chart";
import React, { Component, useContext } from "react";
import { SimulationValueContext } from "../App";

class MainChart extends Component {
  render() {
    const { stoksDataObj, simulationValue } = this.props;

    const timeFrame = stoksDataObj.timeframe;

    if (stoksDataObj.charts === null) {
      return <div>Data chart is empty. Please try again later.</div>;
    }

    const stockData = convertData(stoksDataObj.charts);
    console.log(stockData);
    return (
      <div style={{ width: "100%" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          TimeFrame: {timeFrame}
        </h1>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Номер симуляции: {simulationValue}
        </h2>
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
