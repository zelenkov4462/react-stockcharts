import { tsvParse, csvParse, autoType } from "d3-dsv";
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

// export function getData() {
//   const promiseMSFT = fetch("./123.tsv")
//     .then((response) => response.text())
//     .then((data) => tsvParse(data, parseData(parseDate)));
//   return promiseMSFT;
// }

// export function getData() {
//   const promiseMSFT = fetch("./123.json")
//     .then((response) => response.json())
//     .then((jsonData) => convertData(jsonData));
//   return promiseMSFT;
// }

// export async function getData() {
//   let url = "./123.json";
//   let response = await fetch(url);
//   let jsonData = await response.json();
//   // return jsonData.charts;
//   let stockData = convertData(jsonData.charts);
//   return stockData;
// }

export async function getData() {
  let url = "https://chart-template.herokuapp.com/simulation/123456";
  let response = await fetch(url);
  let jsonData = await response.json();
  // return jsonData.data[0].charts;
  // let stockData = convertData(jsonData.data[0].charts);
  let stockData = convertData(jsonData.data[0].charts);
  return stockData;
}

function convertData(jsonData) {
  let stockItems = [];

  for (let json of jsonData) {
    // let parts = json.time.split("-"); // "2020-01-01"
    // let parts = json.time.split("-"); // "2020-01-01"
    let item = new StockItem();
    // item.time = new Date(parts[0], parts[1], parts[2]);
    item.time = parseDate(json.time);
    // item.open = json.open;
    // item.high = json.high;
    // item.low = json.low;
    // item.close = json.close;
    // item.volume = json.volume;

    item.mal = json.mal;
    item.mas = json.mas;
    item.mfi = json.mfi;
    item.rsi = json.rsi;
    item.price = json.price;
    item.wt1 = json.wt1;
    item.wt2 = json.wt2;

    stockItems.push(item);
  }
  return stockItems;
}

export class StockItem {
  // open;
  // close;
  // high;
  // low;
  // volume;
  // date;

  time;
  mal;
  mas;
  mfi;
  rsi;
  price;
  wt1;
  wt2;
}
