import React from "react";
import { useData } from "../Context/GetData/DataContext";

const InputTimeFrame = () => {
  const { options, setOption, selectedOption, setSelectedOption } = useData();

  const onSelectedValueChange = (e) => {
    setSelectedOption(
      options.find((option) => option.timeframe === e.target.value)
    );
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <select
        value={selectedOption.timeframe}
        onChange={onSelectedValueChange}
        name="select"
        className="MainPage-select"
      >
        {options.map((option, index) => (
          <option key={index} value={option.timeframe}>
            {option.timeframe}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputTimeFrame;
