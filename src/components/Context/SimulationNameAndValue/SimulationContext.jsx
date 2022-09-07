import { createContext, useContext, useState } from "react";

const SimulationContext = createContext();

export const useSimulation = () => {
  return useContext(SimulationContext);
};

export const SimulationProvider = ({ children }) => {
  const [nameSim, setNameSim] = useState("nearusdt");
  const [valueSim, setValueSim] = useState("1662526924");
  // const [dataSim, setDataSim] = useState(null);

  return (
    <SimulationContext.Provider
      value={{
        nameSim,
        setNameSim,
        valueSim,
        setValueSim,
        // dataSim,
        // setDataSim,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
