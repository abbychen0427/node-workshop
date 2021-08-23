//挑戰題
const fs = require("fs/promises");
// const mysql = require('mysql2/promise');
const connection = require("./utils/db");
//dotenv不用接 用config就可以把東西讀進來
// require("dotenv").config();
const axios = require("axios");
const {processStockDay} = require("./utils/TWESDataProcessor");
const moment = require("moment");

(async()=>{
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    // console.log(stockCode);
    //可以用加async的promise版 也可以不加async用原本的cb
    await connection.connectAsync();
    let [dbResults] = await connection.queryAsync('SELECT * FROM stock WHERE stock_id = ?', [stockCode]);
    console.log(dbResults);
    if (dbResults.length === 0) {
      throw "不在我們的服務範圍內";
    }
    let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    params: {
      response: JSON,
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
      },
    });
    const twseData = response.data;
    if (twseData.stat !== "OK") {
      throw "從證交所查到的資料有問題!";
    }
    let formattedData = processStockDay(stockCode, twseData.data);
    let results = await connection.queryAsync(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [formattedData]
    );
    console.log(results);
  } catch(e) {
    console.error(e);
  } finally {
    connection.end();
  }
})()

// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST, 
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER, 
//   password: process.env.DB_PASS, 
//   database: process.env.DB_NAME
// });