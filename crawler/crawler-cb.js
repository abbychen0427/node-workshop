const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

fs.readFile("stock.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    axios
      .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
          response: JSON,
          date: moment().format("YYYYMMDD"),
          stockNo: data,
        },
      })
      .then((response) => {
        console.log(response.data.title);
      });
  }
});
