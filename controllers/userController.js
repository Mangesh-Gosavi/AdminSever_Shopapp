const userModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  userModel.getAllUsers(function (err, result) {
    try {
      if (err) throw err;
      console.log("Users");
      console.log(result);
      const data = result.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = { getAllUsers };
