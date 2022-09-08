import React from "react";
import MainChart from "./MainChart";
import { useSimulation } from "./Context/SimulationNameAndValue/SimulationContext";
import InputTimeFrame from "./InputTimeFrame/InputTimeFrame";
import { useData } from "./Context/GetData/DataContext";

const MainPage = () => {
  const {
    options,
    setOption,
    selectedOption,
    setSelectedOption,
    dataSim: { nameSim, valueSim },
    error,
    statistics,
  } = useData();

  // const arrStatistics = [];

  if (!nameSim || !valueSim) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Введите данные
      </h1>
    );
  }
  if (error) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Неккоректные данные для симуляции. Введите заново
      </h1>
    );
  }

  if (!options) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>Loading...</h1>
    );
  }
  if (!options.length) {
    return (
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Array DataCharts is empty. Please try again later.
      </h1>
    );
  }

  if (!statistics) {
    return null;
  }

  console.log(statistics);

  // if (statistics) {
  //   for (let key in statistics) {
  //     arrStatistics.push({ [key]: statistics[key] });
  //     console.log(arrStatistics[0]);
  //   }
  // }
  //
  // if (!arrStatistics) {
  //   return null;
  // }

  return (
    <div>
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>commission_sum</strong> : {statistics.commission_sum}
          </div>
          <div>
            <strong>id</strong> : {statistics.id}
          </div>
          <div>
            <strong>long_count</strong> : ${statistics.long_count}
          </div>
          <div>
            <strong>long_sum</strong> : {statistics.long_sum}
          </div>
        </div>
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>loss_count</strong> : {statistics.loss_count}
          </div>
          <div>
            <strong>loss_sum</strong> : {statistics.loss_sum}
          </div>
          <div>
            <strong>low_amount</strong> : {statistics.low_amount}
          </div>
          <div>
            <strong>prof_count</strong> : {statistics.prof_count}
          </div>
        </div>
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>prof_sum</strong> : {statistics.prof_sum}
          </div>
          <div>
            <strong>profit_factor</strong> : {statistics.profit_factor}
          </div>
          <div>
            <strong>result</strong> : {statistics.result}
          </div>
          <div>
            <strong>short_count</strong> : {statistics.short_count}
          </div>
        </div>
        <div style={{ marginRight: "50px" }}>
          <div>
            <strong>short_sum</strong> : {statistics.short_sum}
          </div>
          <div>
            <strong>symbol</strong> : {statistics.symbol}
          </div>
          <div>
            <strong>total_sum</strong> : {statistics.total_sum}
          </div>
        </div>
      </div>
      <MainChart
        dataSim={{ nameSim, valueSim }}
        stoksDataObj={selectedOption}
      />
    </div>
  );
};

export default MainPage;
