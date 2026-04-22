const express = require("express");
const router = express.Router();
const { getSalesReport } = require("../controllers/reportController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/data", authenticateToken, getSalesReport);

module.exports = router;
