// const mysql = require('mysql2/promise');
const mysql = require('mysql');
require("dotenv").config();
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME
});

//promise化connection
connection = Promise.promisifyAll(connection);
//module指向connection物件 舊記憶體會被GC(垃圾回收)
module.exports = connection;
// const connection = require();
// connection.query

//在原本module指向的空記憶體中增加connection屬性 再指向connection物件
//這種方式還可以增加新的屬性like module.exports.abcd = ?
// module.exports.connection = connection;
// const db = require();
// db.connection.query
//or
// const {connection} =require();
// connection.query
