const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const login = async (req, res) => {
  const data = JSON.parse(req.query.data);
  try {
    const queryResult = await new Promise((resolve, reject) => {
      adminModel.findAdminByEmail(data.email, function (err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (queryResult.length > 0) {
      const user = queryResult[0];
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ login: "successful", token });
      } else {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    } else {
      return res.status(401).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

const signup = async (req, res) => {
  const details = req.body;
  const hashedPassword = await bcrypt.hash(details.password, 10);

  adminModel.createAdminTableIfNotExists(function (err) {
    if (err) {
      console.error("Error creating admin table:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    adminModel.findAdminByEmail(details.email, function (err, prevResult) {
      if (err) {
        console.error("Error checking admin user:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      if (prevResult.length === 0) {
        adminModel.insertAdmin(details, hashedPassword, function (err) {
          if (err) {
            console.error("Error inserting admin user:", err);
            return res.status(500).json({ success: false, message: "Database error" });
          }
          console.log("1 record inserted");
          const token = jwt.sign({ id: details.id, email: details.email }, JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).json({ login: "successful", token });
        });
      } else {
        return res.status(401).json({ success: false, message: "Already a user with this email" });
      }
    });
  });
};

const logout = (req, res) => {
  console.log("Logout successful");
  return res.status(200).json({ status: "successful" });
};

module.exports = { login, signup, logout };
