const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/users", authenticateToken, getAllUsers);

module.exports = router;
