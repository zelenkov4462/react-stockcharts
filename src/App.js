import "./App.css";
import React, { useState, useContext, createContext } from "react";
import MainPage from "./components/MainPage";

export const SimulationValueContext = createContext();

const App = () => {
  const [simulationValue, setSimulationValue] = useState("1662526924");
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(simulationValue);
    setSimulationValue("");
    console.log(value);
  };
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <form onSubmit={handleSubmit}>
          <input
            value={simulationValue}
            onChange={(e) => setSimulationValue(e.target.value)}
            type="text"
            placeholder="Введите номер симулятора"
            style={{ width: "200px", padding: "8px 12px" }}
          />
          <button
            style={{ marginLeft: "10px", padding: "4px 8px" }}
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
      {!value ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          <h1>Введите номер симулятора</h1>
        </div>
      ) : (
        <SimulationValueContext.Provider value={value}>
          <MainPage />
        </SimulationValueContext.Provider>
      )}
    </div>
  );
};

export default App;
