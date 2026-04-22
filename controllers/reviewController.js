const reviewModel = require("../models/reviewModel");

const getAllReviews = (req, res) => {
  reviewModel.getAllReviews(function (err, result) {
    try {
      if (err) {
        console.error("Error fetching reviews:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("Review Found");
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log("Error fetching data", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = { getAllReviews };
