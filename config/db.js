const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

connection.connect(function (err) {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Database Connected!");
});

module.exports = connection;
