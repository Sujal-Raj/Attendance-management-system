import React from 'react'
import { Routes, Route } from "react-router-dom";
import Homepage from '../Components/Homepage';
import Login from '../Components/Login';
import Register from '../Components/Register';
import AdminDashboard from '../Pages/AdminDashboard'
import EmployeeAddForm from '../Pages/EmployeeAddForm';
import EmployeeDashboard from '../Pages/EmployeeDashboard';
import LeaveApplicationForm from '../Pages/LeaveApplicationForm';
import Leavedashboardadmin from '../Pages/Leavedashboardadmin';
import Leavedashboardemployee from '../Pages/Leavedashboardemployee';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/employeedashboard" element={<EmployeeDashboard/>}/>
      <Route path="/employeeaddform" element={<EmployeeAddForm/>}/>
      <Route path="/leaveformapplication" element={<LeaveApplicationForm/>}/>
      <Route path="/leavedashboardadmin" element={<Leavedashboardadmin/>}/>
      <Route path="/leavedashboardemployee" element={<Leavedashboardemployee/>}/>
    </Routes>
  )
}

export default App