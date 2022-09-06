import React, { useEffect, useState } from "react";
import MainChart from "./MainChart";
import axios from "axios";

const MainPage = () => {
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const onSelectedValueChange = (e) => {
    setSelectedOption(
      options.find((option) => option.timeframe === e.target.value)
    );
  };

  useEffect(() => {
    const getOptions = async () => {
      const responseOptions = await axios.get(
        "https://chart-template.herokuapp.com/simulation/123456"
      );

      const options = responseOptions.data.data.slice(0, 5);

      setOptions(options);
      setSelectedOption(options[0]);
      console.log(options);
    };

    getOptions();
  }, []);

  if (!options) {
    return <h1>Loading...</h1>;
  }
  if (!options.length) {
    return <h1>Array DataCharts is empty. Please try again later.</h1>;
  }
  return (
    <div>
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
      <MainChart stoksDataObj={selectedOption} />
    </div>
  );
};

export default MainPage;
