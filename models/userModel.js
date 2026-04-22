const connection = require("../config/db");

const getAllUsers = (callback) => {
  connection.query("SELECT * FROM users", callback);
};

module.exports = { getAllUsers };
