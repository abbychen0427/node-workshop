const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

async function getStockData() {
  try {
    let stockCode = await new Promise((resolve, reject) => {
      fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
        if (err) {
          reject("有錯誤", err);
        } else {
          resolve(stockCode);
        }
      });
    });
    // console.log(stockCode);
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: JSON,
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("the end");
  }
}

getStockData();
