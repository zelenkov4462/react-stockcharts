import { createContext, useContext, useState } from "react";

const SimulationContext = createContext();

export const useSimulation = () => {
  return useContext(SimulationContext);
};

export const SimulationProvider = ({ children }) => {
  const [nameSim, setNameSim] = useState("nearusdt");
  const [valueSim, setValueSim] = useState("1662526924");
  const [valueTimeFrame, setValueTimeFrame] = useState("WTF");

  return (
    <SimulationContext.Provider
      value={{
        nameSim,
        setNameSim,
        valueSim,
        setValueSim,
        valueTimeFrame,
        setValueTimeFrame,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
