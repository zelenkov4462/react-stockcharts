import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SimulationValueContext } from "../../App";

const InputTimeFrame = ({ selectedOption, setSelectedOption }) => {
  const [options, setOptions] = useState(null);
  const [error, setError] = useState(false);
  const value = useContext(SimulationValueContext);
  console.log(value);
  const onSelectedValueChange = (e) => {
    setSelectedOption(
      options.find((option) => option.timeframe === e.target.value)
    );
  };

  useEffect(() => {
    const getOptions = async () => {
      try {
        setError(false);
        const responseOptions = await axios.get(
          // "https://chart-template.herokuapp.com/simulation/123456"
          `https://chart-template.herokuapp.com/simulation/${value}`
        );
        if (responseOptions.status === 200) {
          const options = responseOptions.data.data.slice(0, 5);
          setOptions(options);
          setSelectedOption(options[0]);
          console.log(options);
          setError(false);
        } else {
          throw "Некорректный номер симуляции";
        }
      } catch (e) {
        setError(true);
        setOptions(null);
        setSelectedOption(null);
      }
    };
    getOptions();
  }, [value]);

  // useEffect(() => {
  //   const getOptions = async () => {
  //     const responseOptions = await axios.get(
  //       // "https://chart-template.herokuapp.com/simulation/123456"
  //       `https://chart-template.herokuapp.com/simulation/${value}`
  //     );
  //
  //     console.log(responseOptions);
  //     // if (!responseOptions) {
  //     //   setError("Ошибка");
  //     // }
  //
  //     const options = responseOptions.data.data.slice(0, 5);
  //
  //     setOptions(options);
  //     setSelectedOption(options[0]);
  //     console.log(options);
  //   };
  //   getOptions();
  // }, [value]);

  if (error) {
    return <h1>Номер симулятора неверен. Введите заново.</h1>;
  }

  if (!options) {
    return <h1>Loading...</h1>;
  }
  if (!options.length) {
    return <h1>Array DataCharts is empty. Please try again later.</h1>;
  }
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
