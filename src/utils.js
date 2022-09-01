import { timeParse } from "d3-time-format";

// function parseData(parse) {
//   return function (d) {
//     d.time = parse(d.time);
//     d.mal = +d.mal;
//     d.mas = +d.mas;
//     d.mfi = +d.mfi;
//     d.rsi = +d.rsi;
//     d.price = +d.price;
//     d.wt1 = +d.wt1;
//     d.wt2 = +d.wt2;
//
//     return d;
//   };
// }

const parseDate = timeParse("%Y-%m-%dT%H:%M:%SZ");

export async function getData() {
  let url = "https://chart-template.herokuapp.com/simulation/123456";
  let response = await fetch(url);
  let jsonData = await response.json();
  return jsonData;
  // let stockData = convertData(jsonData.data[0].charts);
  // return stockData;
}

export function convertData(jsonData) {
  let stockItems = [];

  for (let json of jsonData) {
    let item = new StockItem();
    item.time = parseDate(json.time);
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
  time;
  mal;
  mas;
  mfi;
  rsi;
  price;
  wt1;
  wt2;
}

export function convertDots(jsonData) {
  let stockItemsDots = [];

  for (let json of jsonData) {
    let item = new StockItemDots();
    item.EndTime = parseDate(json.EndTime);
    item.StartTime = parseDate(json.StartTime);
    item.Side = json.Side;
    item.TakeDots = json.TakeDots;

    stockItemsDots.push(item);
  }
  return stockItemsDots;
}

export class StockItemDots {
  EndTime;
  StartTime;
  Side;
  TakeDots;
}
