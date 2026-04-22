const reportModel = require("../models/reportModel");

const getSalesReport = (req, res) => {
  reportModel.getSalesReport(function (error, results) {
    if (error) {
      if (error.code === "ER_NO_SUCH_TABLE") {
        console.error("Table soldproduct does not exist:", error);
        return res.status(404).json({ success: false, message: "Table soldproduct does not exist" });
      }
      console.error("Error fetching sales report:", error);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json(results);
  });
};

module.exports = { getSalesReport };
