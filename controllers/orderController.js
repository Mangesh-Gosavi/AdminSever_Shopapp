const orderModel = require("../models/orderModel");

const getOrderItems = (req, res) => {
  orderModel.getAllOrderItems(function (err, result) {
    try {
      if (err) throw err;
      console.log("Order Items");
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

const getOrders = (req, res) => {
  orderModel.getAllOrders(function (err, result) {
    try {
      if (err) throw err;
      console.log("Orders");
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

const updateOrderStatus = (req, res) => {
  const data = req.body;
  console.log(data);

  orderModel.updateOrderStatus(data.status, data.id, function (err, result) {
    try {
      if (err) throw err;
      console.log("Order Details");
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = { getOrderItems, getOrders, updateOrderStatus };
