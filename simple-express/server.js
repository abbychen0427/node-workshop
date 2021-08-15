const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

//使用中間件
app.use((req, res, next) => {
  let current = new Date();
  console.log(`拜訪網站時間: ${current.toISOString()}`);
  //不加next就會一直pending卡住
  next();
})

app.use((req, res, next) => {
  let current = new Date();
  console.log("第二個中間件");
  next();
})

// HTTP Method: get, post, put, patch, delete
app.get("/", function (request, response, next) {
  response.send("Hello");
});

app.get("/about", function (request, response, next) {
  response.send("about me1");
});
//在express上下關係明確 因此router重複的話，只會跑上面那一個
app.get("/about", function (request, response, next) {
  response.send("about me2");
});

app.listen(3000, function () {
  console.log("我們的 web server 啟動了～");
});