const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const employeeSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    name: { type: String },
    email: { type: String, unique: true },
    mobilenumber: { type: String },
    designation: { type: String },
    gender: { type: String },
    course: [{ type: String }],
    img: { type: String },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { User, Employee };
