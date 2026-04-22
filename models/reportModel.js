const connection = require("../config/db");

const getSalesReport = (callback) => {
  const query = `
    SELECT
      productid,
      brand,
      size,
      SUM(boughtprice * soldquantity) AS total_boughtprice,
      SUM(price * soldquantity) AS total_price,
      SUM(soldquantity) AS total_soldquantity,
      CASE
        WHEN SUM(price * soldquantity) > SUM(boughtprice * soldquantity) THEN 'Profit'
        ELSE 'Loss'
      END AS profit_loss
    FROM
      soldproduct
    GROUP BY
      productid,
      brand,
      size`;
  connection.query(query, callback);
};

module.exports = { getSalesReport };
