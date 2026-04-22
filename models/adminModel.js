const connection = require("../config/db");

const findAdminByEmail = (email, callback) => {
  connection.query("SELECT * FROM admin WHERE email = ?", email, callback);
};

const createAdminTableIfNotExists = (callback) => {
  connection.query("SHOW TABLES LIKE 'admin'", function (err, result) {
    if (err) return callback(err);
    if (result.length === 0) {
      const createTableQuery = `
        CREATE TABLE admin (
          id VARCHAR(20),
          name VARCHAR(40),
          phone VARCHAR(255),
          email VARCHAR(100) UNIQUE PRIMARY KEY,
          password VARCHAR(255),
          date DATE
        )
      `;
      connection.query(createTableQuery, function (err) {
        if (err) return callback(err);
        console.log("Table admin created");
        callback(null);
      });
    } else {
      callback(null);
    }
  });
};

const insertAdmin = (details, hashedPassword, callback) => {
  const date = new Date().toJSON().slice(0, 10);
  const insertQuery = "INSERT INTO admin (id, name, phone, email, password, date) VALUES ?";
  const values = [
    [details.id, details.name, details.phone, details.email, hashedPassword, date],
  ];
  connection.query(insertQuery, [values], callback);
};

module.exports = { findAdminByEmail, createAdminTableIfNotExists, insertAdmin };
