import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSimulation } from "../SimulationNameAndValue/SimulationContext";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataSim, setDataSim] = useState({ nameSim: null, valueSim: null });
  const [error, setError] = useState(false);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const { nameSim, valueSim, valueTimeFrame } = dataSim;
    const getOptions = async () => {
      try {
        setError(false);
        const responseOptions = await axios.get(
          // "http://159.223.232.224:8084/simulation/nearusdt_1662526924"
          // `http://159.223.232.224:8084/simulation/${nameSim}_${valueSim}`
          `http://159.223.232.224:8084/simulation/${nameSim}_${valueSim}?graph=${valueTimeFrame}`
        );
        if (responseOptions.status === 200) {
          const options = responseOptions.data.data;
          setOptions(options);
          setSelectedOption(options[0]);
          setError(false);
          console.log(options);
          console.log(selectedOption);
        } else {
          throw "Некорректная симуляция";
        }
      } catch (e) {
        setError(true);
        setOptions(null);
        setSelectedOption(null);
        console.log(error);
      }
    };
    getOptions();
    const getStatistics = async () => {
      try {
        setError(false);
        const responseOptions = await axios.get(
          `http://159.223.232.224:8084/statistics/${nameSim}_${valueSim}`
        );
        if (responseOptions.status === 200) {
          const statisticsData = responseOptions.data;
          setStatistics(statisticsData);
          setError(false);
        } else {
          throw "Ошибка";
        }
      } catch (e) {
        setError(true);
      }
    };
    getStatistics();
  }, [dataSim]);

  return (
    <DataContext.Provider
      value={{
        options,
        setOptions,
        selectedOption,
        setSelectedOption,
        dataSim,
        setDataSim,
        error,
        statistics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
