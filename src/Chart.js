import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { timeFormat } from "d3-time-format";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import LineSeries from "react-stockcharts/lib/series/LineSeries";
import StochasticSeries from "react-stockcharts/lib/series/StochasticSeries";
import StochasticTooltip from "react-stockcharts/lib/tooltip/StochasticTooltip";
import rsi from "react-stockcharts/lib/indicator/rsi";
import OHLCTooltip from "react-stockcharts/lib/tooltip/OHLCTooltip";
import ToolTipTSpanLabel from "react-stockcharts/lib/tooltip/ToolTipTSpanLabel";
import ToolTipText from "react-stockcharts/lib/tooltip/ToolTipText";
import MyOHLCTooltip from "./components/CustumOHLCTooltip";

class MyChart extends React.Component {
  render() {
    const height = 400;
    const { type, data: initialData, width, ratio } = this.props;

    const margin = { left: 70, right: 70, top: 20, bottom: 30 };

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 }
      : {};
    const xGrid = showGrid
      ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 }
      : {};

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.time
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(initialData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={1200}
        ratio={ratio}
        width={width}
        margin={{ left: 80, right: 80, top: 50, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}

      >
        <Chart id={1} height={400} yExtents={(d) => d.price}>
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            {...yGrid}
            inverted={true}
            tickStroke="#000"
          />
          <XAxis
            axisAt="bottom"
            orient="bottom"
            {...xGrid}
            outerTickSize={0}
            stroke="#000"
            opacity={0.5}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <LineSeries
            yAccessor={(d) => d.price}
            stroke="#000"
            strokeDasharray="Split"
            strokeWidth={1}
          />
          {/*<OHLCTooltip origin={[-40, 0]} />*/}
          <MyOHLCTooltip origin={[-40, -20]} />
        </Chart>
        <Chart
          id={2}
          origin={(w, h) => [0, 450]}
          height={150}
          yExtents={(d) => [d.rsi, d.mas, d.mal]}
        >
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
          <YAxis
            axisAt="right"
            orient="right"
            tickFormat={format(".2s")}
            ticks={5}
            {...yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
            outerTickSize={0}
            stroke="#000"
            opacity={0.5}
          />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            tickStroke="#000"
          />

          <LineSeries
            yAccessor={(d) => d.rsi}
            stroke="#008B8B"
            strokeDasharray="line"
          />
          <LineSeries
            yAccessor={(d) => d.mas}
            stroke="#8B008B"
            strokeDasharray="line"
          />
          <LineSeries
            yAccessor={(d) => d.mal}
            stroke="#FFFF00"
            strokeDasharray="line"
          />
          <MyOHLCTooltip origin={[-40, -20]} />
        </Chart>
        <Chart
          id={3}
          origin={(w, h) => [0, 650]}
          height={150}
          yExtents={(d) => d.mfi}
        >
          <XAxis axisAt="bottom" orient="bottom" {...xGrid} showTicks={false} />
          <YAxis axisAt="right" orient="right" {...yGrid} ticks={5} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
            opacity={0.5}
          />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <LineSeries
            yAccessor={(d) => d.mfi}
            stroke="#008000"
            strokeDasharray="Split"
            strokeWidth={1}
          />
          <MyOHLCTooltip origin={[-40, -10]} />
        </Chart>
        <Chart
          id={4}
          origin={(w, h) => [0, 850]}
          height={150}
          yExtents={(d) => [d.wt1, d.wt2]}
        >
          <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            tickFormat={format(".2s")}
            {...yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
            opacity={0.5}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <LineSeries
            yAccessor={(d) => d.wt1}
            stroke="#FF0000"
            strokeDasharray="line"
          />
          <LineSeries
            yAccessor={(d) => d.wt2}
            stroke="#006400"
            strokeDasharray="line"
          />
          <MyOHLCTooltip origin={[-40, -20]} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}
MyChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

MyChart.defaultProps = {
  type: "svg",
};
MyChart = fitWidth(MyChart);

export default MyChart;
