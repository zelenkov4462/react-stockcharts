import "./App.css";
import React from "react";
import MainPage from "./components/MainPage";
import { SimulationProvider } from "./components/Context/SimulationNameAndValue/SimulationContext";
import { DataProvider } from "./components/Context/GetData/DataContext";
import InputSimulationData from "./components/InputSimulationData/InputSimulationData";

const App = () => {
  return (
    <DataProvider>
      <SimulationProvider>
        <InputSimulationData />
        <MainPage />
      </SimulationProvider>
    </DataProvider>
  );
};

export default App;
