const productModel = require("../models/productModel");

const addProduct = (req, res) => {
  const detail = req.body;
  console.log(detail);

  productModel.createProductTableIfNotExists(function (err) {
    if (err) {
      console.error("Error checking product table:", err);
      return res.status(500).send("Database error");
    }
    try {
      productModel.insertProduct(detail, function (err) {
        if (err) {
          console.error("Error inserting product:", err);
          return res.status(500).send("Database error");
        }
        console.log("1 record inserted in product");
        res.status(200).send("Product Added Successfully");
      });
    } catch (err) {
      console.log("Product not added", err);
      res.status(500).send("Product not added");
    }
  });
};

const getAllProducts = (req, res) => {
  productModel.getAllProducts(function (err, result) {
    try {
      if (err) throw err;
      console.log("Products");
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

const deleteProduct = (req, res) => {
  const productid = req.body.productid;
  console.log(productid);

  try {
    productModel.deleteProductById(productid, function (err) {
      if (err) {
        console.error("Error deleting product:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("Product Deleted successfully");
      return res.status(200).json({ success: true });
    });

    productModel.deleteFromSoldProduct(productid, function (err) {
      if (err) {
        console.error("Error deleting from soldproduct:", err);
      }
    });
  } catch (err) {
    console.log("Product not Deleted", err);
    res.status(500).send("Product not Deleted");
  }
};

const updateStock = (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    productModel.getStockByIdAndSize(data.productid, data.size, function (err, result) {
      if (err) {
        console.error("Error checking stock:", err);
        return res.status(500).send("Product Stock not updated");
      }
      console.log("Data from inventory", result);
      if (result.length > 0) {
        const newquantity = result[0].stock + data.stock;
        productModel.updateStock(newquantity, data.productid, data.size, function (err) {
          if (err) {
            console.error("Error updating stock:", err);
            return res.status(500).send("Product Stock not updated");
          }
          console.log("1 product updated quantity");
        });
        res.status(200).send("Product Stock updated");
      }
    });
  } catch (err) {
    console.log("Product Stock not updated", err);
    res.status(500).send("Product Stock not updated");
  }
};

module.exports = { addProduct, getAllProducts, deleteProduct, updateStock };
