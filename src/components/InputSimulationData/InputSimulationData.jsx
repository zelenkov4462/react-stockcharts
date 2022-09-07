import React from "react";
import { useSimulation } from "../Context/SimulationNameAndValue/SimulationContext";
import { useData } from "../Context/GetData/DataContext";

const InputSimulationData = () => {
  const { nameSim, setNameSim, valueSim, setValueSim } = useSimulation();

  const { dataSim, setDataSim } = useData();

  const submitHandler = (e) => {
    e.preventDefault();
    setDataSim({ nameSim, valueSim });
    setNameSim("");
    setValueSim("");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <form onSubmit={submitHandler}>
        <input
          value={nameSim}
          onChange={(e) => setNameSim(e.target.value)}
          name="nameSim"
          className=""
          placeholder="Введите nameSimulation"
        />
        <input
          value={valueSim}
          onChange={(e) => setValueSim(e.target.value)}
          name="nameSim"
          className=""
          placeholder="Введите idSimulation"
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default InputSimulationData;
