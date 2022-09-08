import React, { useState } from "react";
import { useData } from "../Context/GetData/DataContext";

const InputTimeFrame = () => {
  const [valueTimeFrame, setValueTimeFrame] = useState("WTF");

  const { options, setOption, selectedOption, setSelectedOption } = useData();

  const onSelectedValueChange = (e) => {
    setValueTimeFrame(e.target.value);
  };

  // const onSelectedValueChange = (e) => {
  //   setSelectedOption(
  //     options.find((option) => option.timeframe === e.target.value)
  //   );
  // };
  // if (!options) {
  //   return (
  //     <h1 style={{ display: "flex", justifyContent: "center" }}>Loading...</h1>
  //   );
  // }
  // if (!options.length) {
  //   return (
  //     <h1 style={{ display: "flex", justifyContent: "center" }}>
  //       Array DataCharts is empty. Please try again later.
  //     </h1>
  //   );
  // }

  return (
    <>
      <select
        value={valueTimeFrame}
        onChange={onSelectedValueChange}
        name="select"
        className="MainPage-select"
      >
        <option value={valueTimeFrame}>{valueTimeFrame}</option>
      </select>
    </>
  );
};

//   return (
//     <div
//       style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
//     >
//       <select
//         value={selectedOption.timeframe}
//         onChange={onSelectedValueChange}
//         name="select"
//         className="MainPage-select"
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option.timeframe}>
//             {option.timeframe}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

export default InputTimeFrame;
