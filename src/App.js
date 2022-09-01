import "./App.css";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "./Chart";
import { convertData, convertDots, getData } from "./utils";
import React from "react";

class App extends React.Component {
  // componentDidMount() {
  //   getData().then((data) => {
  //     this.setState({ data });
  //     console.log(data);
  //   });
  //   console.log(this.state);
  // }

  componentDidMount() {
    getData().then((d) => {
      const stockData = convertData(d.data[0].charts);
      const timeFrame = d.data[0].timeframe;
      const tradeDots = convertDots(d.data[0].trade_dots);

      const allData = [stockData, tradeDots];

      // this.setState({ stockData });
      // this.setState({ tradeDots });
      this.setState({ allData });
      this.setState({ timeFrame });

      // console.log(stockData);
    });
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {(type) => (
          <Chart
            type={type}
            // data={this.state.stockData}
            data={this.state.allData}
            timeFrame={this.state.timeFrame}
            // tradeDots={this.state.tradeDots}
          />
        )}
      </TypeChooser>
    );
  }
}

export default App;
