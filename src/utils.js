import { tsvParse, csvParse } from "d3-dsv";
import { timeFormat, timeParse } from "d3-time-format";
import axios from "axios";

function parseData(parse) {
  return function (d) {
    d.time = parse(d.time);
    d.mal = +d.mal;
    d.mas = +d.mas;
    d.mfi = +d.mfi;
    d.rsi = +d.rsi;
    d.price = +d.price;
    d.wt1 = +d.wt1;
    d.wt2 = +d.wt2;

    return d;
  };
}

// const parseDate = timeParse("%Y-%m-%d");
const parseDate = timeParse("%Y-%m-%dT%H:%M:%SZ");

export function getData() {
  const promiseMSFT = fetch("./123.tsv")
    .then((response) => response.text())
    .then((data) => tsvParse(data, parseData(parseDate)));
  return promiseMSFT;
}
