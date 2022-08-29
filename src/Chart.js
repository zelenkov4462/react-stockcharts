import React, { useState } from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  BollingerSeries,
  CandlestickSeries,
  LineSeries,
  StochasticSeries,
  ScatterSeries,
  CircleMarker,
  SquareMarker,
  TriangleMarker,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  BollingerBandTooltip,
  StochasticTooltip,
  GroupTooltip,
} from "react-stockcharts/lib/tooltip";
import {
  ema,
  stochasticOscillator,
  bollingerBand,
} from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { scaleTime } from "d3-scale";
import AreaSeries from "react-stockcharts/lib/series/AreaSeries";
import EventCapture from "react-stockcharts/lib/EventCapture";

const MyChart = (props) => {
  const { type, data: initialData, width, ratio } = props;
  const { mouseMoveEvent, panEvent, zoomEvent, clamp, zoomAnchor } = props;
  console.log(props);
  console.log(mouseMoveEvent);

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.time
  );
  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[data.length - 100]);
  const xExtents = [start, end];

  return (
    <ChartCanvas
      seriesName="MSFT"
      xScale={xScale}
      data={data}
      ratio={ratio}
      height={1200}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} height={400} yExtents={(d) => d.price}>
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="left" orient="left" ticks={5} />
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
        {/*<OHLCTooltip forChart={1} origin={[150, 0]} />*/}

        {/*<ScatterSeries*/}
        {/*  yAccessor={(d) => d.price}*/}
        {/*  marker={CircleMarker}*/}
        {/*  markerProps={{ width: 2, stroke: "#ff7f0e", fill: "#ff7f0e" }}*/}
        {/*  markerProps={{ r: 3 }}*/}
        {/*/>*/}
      </Chart>
      <Chart
        id={2}
        origin={(w, h) => [0, 450]}
        height={150}
        yExtents={(d) => [d.rsi, d.mas, d.mal]}
      >
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="right" orient="right" tickFormat={format(".2s")} />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
        />

        <MouseCoordinateY
          at="right"
          orient="right"
          displayFormat={format(".2f")}
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
      </Chart>
      <Chart
        id={3}
        origin={(w, h) => [0, 650]}
        height={150}
        yExtents={(d) => d.mfi}
      >
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="left" orient="left" />

        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
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
      </Chart>
      <Chart
        id={4}
        origin={(w, h) => [0, 850]}
        height={150}
        yExtents={(d) => [d.wt1, d.wt2]}
      >
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={5}
          tickFormat={format(".2s")}
        />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
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
        <StochasticSeries yAccessor={(d) => [d.wt1, d.wt2]} />
        {/*<StochasticTooltip*/}
        {/*// origin={[-38, 15]}*/}
        {/*// yAccessor={(d) => [d.wt1, d.wt2]}*/}
        {/*// options={wt1.options()}*/}
        {/*// appearance={stoAppearance}*/}
        {/*// label="wt1 wt2"*/}
        {/*/>*/}
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
};

MyChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

MyChart.defaultProps = {
  type: "svg",
  mouseMoveEvent: true,
  panEvent: true,
  zoomEvent: true,
  clamp: false,
  width: window.innerWidth,
};

// MyChart = fitWidth(CandleStickChartWithZoomPan);

export default MyChart;

//
// <ChartCanvas
//   width={width}
//   height={400}
//   margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
//   seriesName="MSFT"
//   data={data}
//   type="svg"
//   xAccessor={(d) => d.time}
//   xScale={scaleTime()}
//   xExtents={[new Date(2022, 7, 3), new Date(2022, 7, 5)]}
//   ratio={ratio}
// >
//   <Chart id={0} yExtents={(d) => d.price}>
//     <XAxis axisAt="bottom" orient="bottom" ticks={6} />
//     <YAxis axisAt="left" orient="left" />
//     {/*<AreaSeries yAccessor={(d) => d.price} />*/}
//     <LineSeries
//       yAccessor={(d) => d.price}
//       stroke="#000"
//       strokeDasharray="line"
//     />
//     <ScatterSeries
//       yAccessor={(d) => d.price}
//       marker={SquareMarker}
//       markerProps={{ width: 2, stroke: "#ff7f0e", fill: "#ff7f0e" }}
//     />
//   </Chart>
//   <Chart id={1} yExtents={(d) => d.mas}>
//     <XAxis axisAt="bottom" orient="bottom" ticks={6} />
//     <YAxis axisAt="right" orient="right" />
//     {/*<AreaSeries yAccessor={(d) => d.price} />*/}
//     <LineSeries
//       yAccessor={(d) => d.mas}
//       stroke="#ff7f0e"
//       strokeDasharray="line"
//     />
//     <ScatterSeries
//       yAccessor={(d) => d.mas}
//       marker={SquareMarker}
//       markerProps={{ width: 0, stroke: "#ff7f0e", fill: "#ff7f0e" }}
//     />
//   </Chart>
// </ChartCanvas>
