import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import displayValuesFor from "react-stockcharts/lib/tooltip/displayValuesFor";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "./Chart";
import { getData } from "./utils";

function App() {
  const [charts, setCharts] = useState(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     axios
  //       .get("./123.json")
  //       .then((res) => setCharts(res.data))
  //       .catch((err) => console.log(err));
  //     console.log(charts);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    getData().then((data) => {
      setCharts(data);
    });
  }, []);

  // useEffect(() => {
  //   console.log(charts);
  // }, [charts]);

  return (
    <div>
      {charts != null ? (
        <TypeChooser>
          {(type) => (
            <Chart
              type={type}
              data={charts}
              // width={window.innerWidth}
              // width={500}
              ratio={2}
            />
          )}
        </TypeChooser>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}

export default App;
