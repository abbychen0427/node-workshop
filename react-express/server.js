const express = require("express"),
app = express(),
port = process.env.PORT || 5000,
cors = require("cors");
const connection = require("./utils/db");

app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "我是首頁！" });
});

app.get("/product", async function (request, response, next) {
  let result = await connection.queryAsync("SELECT * FROM product");
  response.json(result);
});

app.listen(port, () => console.log("Backend server live on " + port));
