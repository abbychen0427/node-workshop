const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }else{
    console.log("連線成功");
  }
});
// let eachData = allData.data;
    // for(let i = 0; i < eachData.length; i ++){
    //   let noCommaData = eachData[0][i].replace(/,/g,"");
    //   noCommaData[0] = parseInt(noCommaData[0].replace(/\//g, ""), 10)+ 19110000;
    //   console.log(noCommaData);
    // }
async function getStockDataPromise() {
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
    // let response = await axios.get(
    //   "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    //   {
    //     params: {
    //       response: JSON,
    //       date: moment().format("YYYYMMDD"),
    //       stockNo: stockCode,
    //     },
    //   }
    // );
    // console.log(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    // 不關閉連線，認為程式一直在執行
    connection.end();
    console.log("the end");
  }
}

getStockDataPromise();
