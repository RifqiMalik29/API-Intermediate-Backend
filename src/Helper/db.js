const mysql = require("mysql");
require("dotenv").config();

const conn = mysql.createConnection({
  localhost: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_NAME,
});

conn.connect();

module.exports = conn;
