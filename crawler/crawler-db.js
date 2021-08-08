const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  port: 3306,
  password: "12345",
  database: "stock",
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }else{
    console.log("連線成功");
  }
});

// 不關閉連線，認為程式一直在執行
connection.end();

// async function getStockData() {
//   try {
//     let stockCode = await new Promise((resolve, reject) => {
//       fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
//         if (err) {
//           reject("有錯誤", err);
//         } else {
//           resolve(stockCode);
//         }
//       });
//     });
//     // console.log(stockCode);
//     let response = await axios.get(
//       "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//       {
//         params: {
//           response: JSON,
//           date: moment().format("YYYYMMDD"),
//           stockNo: stockCode,
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     console.log("the end");
//   }
// }

// getStockData();
