import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";

import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Createemployee" element={<CreateEmployee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/employee/:employeeID" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
