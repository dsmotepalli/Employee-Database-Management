const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
app.use(cors());
app.use(express.json());

const userRoutes = require("./rotues/userRoute");
const employeeRoutes = require("./rotues/employeeRoute");

const conn = mongoose.connect(process.env.MONGO_URI, {
  dbName: "dealsdrayonline",
});

console.log(`MognoDB connected `);

app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
