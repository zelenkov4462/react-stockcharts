import "./App.css";
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from "./Chart";
import { getData } from "./utils";
import React from "react";

class App extends React.Component {
  componentDidMount() {
    getData().then((data) => {
      this.setState({ data });
    });
    console.log(this.state);
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {(type) => <Chart type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

export default App;
