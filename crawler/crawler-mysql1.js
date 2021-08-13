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

function getStockCode() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
      if (err) {
        reject("有錯誤", err);
      } else {
        resolve(stockCode.trim());
      }
    });
  });
}
function getStockData(stockCode) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
    params: {
      response: JSON,
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
      },
    }
  );
}
function queryStockCode(stockCode) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM stock WHERE stock_id = ?', [stockCode], function (error, results, fields) {
      if (error) {reject(error)};
      resolve(results);
    });
  })
}
// 將資料傳入資料庫
function insertDataPromise(formattedData) {
  return new Promise((resolve, reject) => {
    connection.query(
      //怕資料重複而衝突，用ignore自動忽略重複資料
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [formattedData],
      function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}
async function getStockDataPromise() {
  try {
    // 讀 stock.txt 把股票代碼讀進來
    let stockCode = await getStockCode();
    // 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
    let queryCheck = await queryStockCode(stockCode);
    // console.log(queryCheck);
    if(queryCheck.length === 0){
      throw "此代碼不在服務範圍內！";
    }
    console.info("在資料庫有抓到資料")
    // 如果是，才去證交所抓資料
    let response = await getStockData(stockCode);
    let allData = response.data;
    // console.log(allData);
    //整理要存入資料庫的資料格式
    let formattedData = allData.data.map((item)=>{
      //去掉逗號
      item = item.map((value) => {
        return value.replace(/,/g, "");
      });
      //日期去掉/轉變為數字 再加上19110000
      item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
      //在陣列最前面加上代碼資料
      item.unshift(stockCode);
      console.log(item);
      return item;
    })
    console.log(formattedData);
    // 抓回來的資料存到資料庫的 stock_price 表格裡去
    let insertData = await insertDataPromise(formattedData);
    console.log(insertData);

    } catch (err) {
    console.log(err);
  } finally {
    // 不關閉連線，認為程式一直在執行
    connection.end();
    console.log("the end");
  }
}

getStockDataPromise();
