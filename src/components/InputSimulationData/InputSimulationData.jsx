import React from "react";
import {
  SimulationProvider,
  useSimulation,
} from "../Context/SimulationNameAndValue/SimulationContext";
import { useData } from "../Context/GetData/DataContext";
import InputTimeFrame from "../InputTimeFrame/InputTimeFrame";

const InputSimulationData = () => {
  const {
    nameSim,
    setNameSim,
    valueSim,
    setValueSim,
    valueTimeFrame,
    setValueTimeFrame,
  } = useSimulation();

  const { dataSim, setDataSim } = useData();

  const arrValueTimeFrame = [
    "WTF",
    "FTF",
    "GTF",
    "ETF",
    "MTF",
    "WTFCD",
    "FTFCD",
    "GTFCD",
    "RTF",
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setDataSim({ nameSim, valueSim, valueTimeFrame });
    // setNameSim("");
    // setValueSim("");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          style={{ height: "100%", marginBottom: "5px" }}
          value={nameSim}
          onChange={(e) => setNameSim(e.target.value)}
          name="nameSim"
          className=""
          placeholder="Введите nameSimulation"
        />
        <input
          style={{ height: "100%", marginBottom: "5px" }}
          value={valueSim}
          onChange={(e) => setValueSim(e.target.value)}
          name="nameSim"
          className=""
          placeholder="Введите idSimulation"
        />
        <select
          style={{ height: "121%", marginBottom: "5px" }}
          name="select"
          value={valueTimeFrame}
          onChange={(e) => setValueTimeFrame(e.target.value)}
        >
          {arrValueTimeFrame.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <button style={{ height: "121%" }} type="submit">
          Download
        </button>
      </form>
    </div>
  );
};

export default InputSimulationData;
