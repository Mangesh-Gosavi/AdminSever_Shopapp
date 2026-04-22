const connection = require("../config/db");

const getAllOrderItems = (callback) => {
  connection.query("SELECT * FROM orderitem", callback);
};

const getAllOrders = (callback) => {
  connection.query("SELECT * FROM orderdetails", callback);
};

const updateOrderStatus = (status, orderid, callback) => {
  connection.query(
    "UPDATE orderdetails SET status = ? WHERE orderid = ?",
    [status, orderid],
    callback
  );
};

module.exports = { getAllOrderItems, getAllOrders, updateOrderStatus };
