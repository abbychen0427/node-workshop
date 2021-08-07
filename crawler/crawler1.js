const axios = require("axios");
const moment = require("moment");

//api網址
//https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330

//比較醜的寫法
// axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210807&stockNo=2330")
// .then((response) => {
// console.log(response.data);
// })
//prettier
axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: JSON,
      date: moment().format("YYYYMMDD"),
      stockNo: 2330,
    },
  })
  .then((response) => {
    console.log(response.data);
  });
