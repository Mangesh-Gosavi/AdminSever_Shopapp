const express = require("express");
const router = express.Router();
const { getOrderItems, getOrders, updateOrderStatus } = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/items", authenticateToken, getOrderItems);
router.get("/orders", authenticateToken, getOrders);
router.post("/orderstatus", authenticateToken, updateOrderStatus);

module.exports = router;
