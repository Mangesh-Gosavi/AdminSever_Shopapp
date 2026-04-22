const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/productdetail", authenticateToken, addProduct);
router.get("/allproducts", authenticateToken, getAllProducts);
router.post("/deleteproduct", authenticateToken, deleteProduct);
router.post("/updatestock", authenticateToken, updateStock);

module.exports = router;
