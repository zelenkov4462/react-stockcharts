import React, { useContext, useEffect, useState } from "react";
import MainChart from "./MainChart";
import axios from "axios";
import InputTimeFrame from "./InputTimeFrame/InputTimeFrame";
import { SimulationValueContext } from "../App";

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const simulationValue = useContext(SimulationValueContext);

  return (
    <div>
      <InputTimeFrame
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {selectedOption === null ? null : (
        <MainChart
          simulationValue={simulationValue}
          stoksDataObj={selectedOption}
        />
      )}
    </div>
  );
};

export default MainPage;
