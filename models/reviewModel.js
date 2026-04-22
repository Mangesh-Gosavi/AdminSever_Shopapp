const connection = require("../config/db");

const getAllReviews = (callback) => {
  connection.query("SELECT * FROM reviews", callback);
};

module.exports = { getAllReviews };
