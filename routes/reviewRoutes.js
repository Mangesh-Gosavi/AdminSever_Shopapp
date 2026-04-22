const express = require("express");
const router = express.Router();
const { getAllReviews } = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/adminreviews", authenticateToken, getAllReviews);

module.exports = router;
