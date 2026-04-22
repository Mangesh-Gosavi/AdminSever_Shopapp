const express = require("express");
const router = express.Router();
const { login, signup, logout } = require("../controllers/adminController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/Adminlogin", login);
router.post("/Adminsignup", signup);
router.get("/logout", authenticateToken, logout);

module.exports = router;
