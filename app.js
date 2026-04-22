const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const initDb = require("./config/initDb");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const reportRoutes = require("./routes/reportRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/", adminRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);
app.use("/", reviewRoutes);
app.use("/", reportRoutes);
app.use("/", uploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  initDb();
});
