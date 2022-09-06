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
}

export function convertData(jsonData, jsonDots) {
  let stockItems = [];
  // let stockItemsDots = [];

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

    if (json.long_in) {
      item.long_in = json.long_in;
    }
    if (json.long_out) {
      item.long_out = json.long_out;
    }
    if (json.short_in) {
      item.short_in = json.short_in;
    }
    if (json.short_out) {
      item.short_out = json.short_out;
    }
    if (json.tp_dot) {
      item.tp_dot = json.tp_dot;
    }
    if (json.vu_man_sell) {
      item.vu_man_sell = json.vu_man_sell;
    }
    if (json.vu_man_buy) {
      item.vu_man_buy = json.vu_man_buy;
    }

    stockItems.push(item);
  }

  // for (let json of jsonDots) {
  //   let item = new StockItemDots();
  //   item.EndTime = parseDate(json.EndTime);
  //   item.StartTime = parseDate(json.StartTime);
  //   item.Side = json.Side;
  //   item.TakeDots = json.TakeDots;
  //
  //   stockItemsDots.push(item);
  // }

  // return { stockItems, stockItemsDots };
  return { stockItems };
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

// export function convertDots(jsonData) {
//   let stockItemsDots = [];
//
//   for (let json of jsonData) {
//     let item = new StockItemDots();
//     item.EndTime = parseDate(json.EndTime);
//     item.StartTime = parseDate(json.StartTime);
//     item.Side = json.Side;
//     item.TakeDots = json.TakeDots;
//
//     stockItemsDots.push(item);
//   }
//   return stockItemsDots;
// }

// export class StockItemDots {
//   EndTime;
//   StartTime;
//   Side;
//   TakeDots;
// }
