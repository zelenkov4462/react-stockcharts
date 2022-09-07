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

  console.log(statistics);
  return (
    <div>
      <p>result: {statistics.result}</p>
      <p>commission_sum: {statistics.commission_sum}</p>
      <p>low_amount: {statistics.low_amount}</p>
      <p>profit_factor: {statistics.profit_factor}</p>
      <p>short_sum: {statistics.short_sum}</p>
      <InputTimeFrame />
      <MainChart
        dataSim={{ nameSim, valueSim }}
        stoksDataObj={selectedOption}
      />
    </div>
  );
};

export default MainPage;
