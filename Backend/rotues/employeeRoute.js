const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { authenticateJwt } = require("../middleware/auth");
const { Employee } = require("../models/userModel");
const { ObjectId } = require("bson");

const employeeSchema = z.object({
  createdBy: z.string(),
  name: z.string().min(1),
  email: z.string().email("please enter a valid email"),
  mobilenumber: z.string().min(10).max(10),
  designation: z.enum(["HR", "Manager", "Sales"]),
  gender: z.enum(["M", "F"]),
  course: z.array(z.enum(["MCA", "BCA", "BSC"])),
  img: z.string().min(1),
});

const employeeSchemaUpdate = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email("please enter a valid email").optional(),
  mobilenumber: z.string().min(10).max(10).optional(),
  designation: z.enum(["HR", "Manager", "Sales"]).optional(),
  gender: z.enum(["M", "F"]).optional(),
  course: z.array(z.enum(["MCA", "BCA", "BSC"])).optional(),
  img: z.string().min(1).optional(),
  id: z.string(),
});

router.post("/create", authenticateJwt, async (req, res) => {
  console.log(req.body);

  try {
    const { data } = employeeSchema.safeParse(req.body);
    const existingEmp = await Employee.findOne({ email: data.email });
    if (existingEmp) {
      return res.json({ message: "Email should be unique" });
    }
    console.log(data);
    const employee = await Employee.create({
      createdBy: new ObjectId(req.user),
      name: data.name,
      email: data.email,
      mobilenumber: data.mobilenumber,
      designation: data.designation,
      gender: data.gender,
      course: data.course,
      img: data.img,
    });
    if (employee) {
      res.status(201).json({ message: "Employee succesfully created" });
    } else {
      res.status(401).json({ message: "Employee creation failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", authenticateJwt, async (req, res) => {
  console.log(req.body);
  try {
    const { data } = employeeSchemaUpdate.safeParse(req.body);
    console.log(data);

    const employee = await Employee.findByIdAndUpdate(data.id, data, {
      new: true,
      runValidators: true,
    });
    if (employee) {
      res.json({ message: "Updated succesfully" });
    } else {
      res.json({ message: "Update Failed" });
    }
  } catch (error) {
    res.json({ message: "Update Failed" });
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const emp = await Employee.findByIdAndDelete(id);
  console.log(emp);
});

router.get("/allemployees", authenticateJwt, async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user.id });
  res.json(employees);
});

router.get("/:id", authenticateJwt, async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id });
  res.json(employee);
});

module.exports = router;
