import { useFormik } from "formik";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as Yup from "yup";
import axios from "axios";
import { url } from "../url";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobilenumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Mobile number is required"),
  designation: Yup.string().required("Designation is required"),
  gender: Yup.string().required("Gender is required"),
  course: Yup.array().min(1, "Select at least one course"),
  img: Yup.string().required("upload png or jpeg image"),
});

const CreateEmployee = () => {
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobilenumber: "",
      designation: "",
      gender: "",
      course: [],
      img: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post(
          `${url}` + `/employee/create`,
          {
            createdBy: localStorage.getItem("userId"),
            ...values,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data.message);
        toast({
          title: data.message,
        });
      } catch (error) {
        toast({
          title: error.response ? error.response.data.message : "Unknown error",
        });
      }
    },
  });

  return (
    <div className="flex flex-col items-center h-screen w-full mt-10 ">
      <h1 className="text-3xl font-bold">Create employee</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-[60%] gap-2"
      >
        <div>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="mobilenumber">Mobile Number</label>
          <Input
            id="mobilenumber"
            name="mobilenumber"
            type="number"
            onChange={(e) => {
              formik.setFieldValue("mobilenumber", String(e.target.value));
            }}
            value={formik.values.mobilenumber}
          />
          {formik.touched.mobilenumber && formik.errors.mobilenumber ? (
            <div className="text-red-500">{formik.errors.mobilenumber}</div>
          ) : null}
        </div>
        <div className="flex gap-2">
          <label htmlFor="designation">Designation</label>
          <select
            name="designation"
            id="designation"
            onChange={formik.handleChange}
            value={formik.values.designation}
            className="border-2 rounded-md border-black"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {formik.touched.designation && formik.errors.designation ? (
            <div className="text-red-500">{formik.errors.designation}</div>
          ) : null}
        </div>
        <div className="flex  items-center gap-5">
          <label>Gender</label>
          <div className="flex justify-center items-center gap-3">
            <Input
              type="radio"
              name="gender"
              value="M"
              onChange={formik.handleChange}
              checked={formik.values.gender === "M"}
              className=""
              id="M"
            />
            <label htmlFor="M">Male</label>
            <Input
              type="radio"
              name="gender"
              value="F"
              onChange={formik.handleChange}
              checked={formik.values.gender === "F"}
              className=""
              id="F"
            />
            <label htmlFor="F">Female</label>
          </div>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div className="flex items-center gap-5">
          <label>Courses</label>
          <div className="flex items-center justify-center gap-2">
            <Input
              type="checkbox"
              name="course"
              value="MCA"
              onChange={formik.handleChange}
              checked={formik.values.course.includes("MCA")}
              id="MCA"
            />
            <label htmlFor="MCA">MCA</label>
            <Input
              type="checkbox"
              name="course"
              value="BCA"
              onChange={formik.handleChange}
              checked={formik.values.course.includes("BCA")}
              id="BCA"
            />
            <label htmlFor="BCA">BCA</label>
            <Input
              type="checkbox"
              name="course"
              value="BSC"
              onChange={formik.handleChange}
              checked={formik.values.course.includes("BSC")}
              id="BSC"
            />
            <label htmlFor="BSC">BSC</label>
          </div>
          {formik.touched.course && formik.errors.course ? (
            <div className="text-red-500">{formik.errors.course}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="upload">Upload Image</label>
          <Input
            type="file"
            onChange={(event) => {
              if (
                event.target.files[0].type === "image/jpeg" ||
                event.target.files[0].type === "image/png"
              ) {
                const data = new FormData();
                data.append("file", event.target.files[0]);
                data.append("upload_preset", "chat-app");
                axios
                  .post(
                    "https://api.cloudinary.com/v1_1/deepakvasudev/image/upload",
                    data
                  )
                  .then((res) => {
                    formik.setFieldValue("img", res.data.url.toString());
                  });
              }
            }}
            id="upload"
          />
          {formik.touched.img && formik.errors.img ? (
            <div className="text-red-500">{formik.errors.img}</div>
          ) : null}
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <Toaster />
    </div>
  );
};

export default CreateEmployee;
