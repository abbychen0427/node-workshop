const express = require("express");
const connection = require("./utils/db");

// 利用 express 建立了一個 express application
let app = express();

//處理cors問題 要放在所有路由、中間件前面
const cors = require("cors");
app.use(cors());

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

//stock get api
// app.get("/stock", async function (request, response, next) {
//   let result = await connection.queryAsync("SELECT * FROM stock");
//   response.json(result);
// });

// app.get("/stock/:stockCode", async (req, res, next) => {
//   let result = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ?", [req.params.stockCode]);
//   res.json(result);
// })
//試試看專案資料庫
app.get("/product", async function (request, response, next) {
  let result = await connection.queryAsync("SELECT * FROM product");
  response.json(result);
});

app.get("/product/:productId", async (req, res, next) => {
  let result = await connection.queryAsync("SELECT * FROM product WHERE id = ?", [req.params.productId]);
  res.json(result);
})
//前面都沒有遇到response 在這邊用找不到頁面的response接住 
//應放在所有路由最下面 不然response就停住了 會全顯示404
app.use((req, res, next) => {
  res.status(404).json({message: "NOT FOUND"});
})

app.listen(3000, async function () {
  //啟動時建立好資料庫連結
  // await connection.connectAsync();
  //用pool會自動建立連線 不需要再額外打上面這行
  console.log("我們的 web server 啟動了～");
});