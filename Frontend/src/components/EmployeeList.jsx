import axios from "axios";
import { url } from "../url";
import React, { useEffect, useState } from "react";
import { DataTable } from "./miscillaneous/DataTable";
import Columns from "./miscillaneous/Columns";

const EmployeeList = () => {
  const [Employees, setEmployees] = useState([]);

  async function fetchEmployees() {
    const { data } = await axios.get(`${url}` + `/employee/allemployees`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    setEmployees(data);
  }
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="w-full  flex flex-col gap-4">
      <div className="text-3xl font-extrabold ">
        Employees List {Employees.length}
      </div>

      <DataTable columns={Columns} data={Employees} />
    </div>
  );
};

export default EmployeeList;
