const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config();

const db_con = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();
  
  module.exports = db_con;