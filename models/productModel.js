const connection = require("../config/db");

const createProductTableIfNotExists = (callback) => {
  connection.query("SHOW TABLES LIKE 'product'", function (err, result) {
    if (err) return callback(err);
    if (result.length === 0) {
      const createTableQuery =
        "CREATE TABLE product(productid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,image VARCHAR(255),brand varchar(20),product varchar(20),boughtprice INT,price INT,discount INT,size varchar(20),stock INT,description varchar(100));";
      connection.query(createTableQuery, function (err) {
        if (err) return callback(err);
        console.log("Table product created");
        callback(null, true);
      });
    } else {
      callback(null, false);
    }
  });
};

const insertProduct = (detail, callback) => {
  const insertQuery =
    "INSERT INTO product(image,brand,product,boughtprice,price,discount,size,stock,description) VALUES ?";
  const values = [
    [
      detail.image,
      detail.brand,
      detail.product,
      detail.bought,
      detail.price,
      detail.discount,
      detail.size,
      detail.stock,
      detail.description,
    ],
  ];
  connection.query(insertQuery, [values], callback);
};

const getAllProducts = (callback) => {
  connection.query("SELECT * FROM product", callback);
};

const deleteProductById = (productid, callback) => {
  connection.query("DELETE FROM product WHERE productid = ?", productid, callback);
};

const deleteFromSoldProduct = (productid, callback) => {
  connection.query("DELETE FROM soldproduct WHERE productid = ?", productid, callback);
};

const getStockByIdAndSize = (productid, size, callback) => {
  connection.query(
    "SELECT * FROM product WHERE productid = ? AND size = ?",
    [productid, size],
    callback
  );
};

const updateStock = (newquantity, productid, size, callback) => {
  connection.query(
    "UPDATE product SET stock = ? WHERE productid = ? AND size = ?",
    [newquantity, productid, size],
    callback
  );
};

module.exports = {
  createProductTableIfNotExists,
  insertProduct,
  getAllProducts,
  deleteProductById,
  deleteFromSoldProduct,
  getStockByIdAndSize,
  updateStock,
};
