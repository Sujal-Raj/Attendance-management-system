import React, { useState } from 'react'
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function EmployeeAddForm() {
  const [fullName, setFullName] = useState("")
  const [emailId, setemailId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [department, setDepartment] = useState("")
  const [joiningDate, setJoiningDate] = useState("")
  const [password, setPassword] = useState("");


  const handleAddEmployee = async (e) => {
    e.preventDefault();
    // setPassword(phoneNumber);
    // console.log(fullName, emailId, phoneNumber, department, joiningDate,password);
    try {
      await axios.post('http://localhost:5000/api/user/employeeaddform', { fullName, emailId, phoneNumber, department, joiningDate, password });
      // alert("Employee added successfully!");
      toast.success("Employee added successfully!");
      <ToastContainer />
    } catch (err) {
      console.log(err)
      // alert("Employee addition failed. Please try again.");
      toast.error("Employee addition failed. Please try again.");
      <ToastContainer />
    }

    setFullName("");
    setemailId("");
    setPhoneNumber("");
    setDepartment("");
    setJoiningDate("");
    setPassword("");
  }
  return (
    <>
        <nav className='h-[10vh] font-bold flex items-center justify-between px-10'>
        <p className='text-4xl'>Add an Employee</p>
        <button className=' bg-blue-500 px-4 py-2 rounded-md'>
            <NavLink className='font-bold !text-white focus:outline-none' to="/admindashboard">
                Back To Dashboard
            </NavLink>
        </button>
      </nav>
        <div>
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
  {/* <h2 className="text-2xl font-bold mb-4 text-center">Add Employee</h2> */}
  
  <form onSubmit={handleAddEmployee}>
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
      <input
      value={fullName}
      onChange={(e)=>setFullName(e.target.value)}
       type="text" placeholder="Enter full name" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Email</label>
      <input type="email"
      value={emailId}
      onChange={(e)=>setemailId(e.target.value)}
      placeholder="Enter email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
      <input
      value={phoneNumber}
      onChange={(e)=>{
        setPhoneNumber(e.target.value) 
        setPassword(e.target.value)
      }}
      type="tel" placeholder="Enter phone number" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Department</label>
      <select
      value={
        department
      }
      onChange={(e)=>setDepartment(e.target.value)}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Select department</option>
        <option>HR</option>
        <option>Engineering</option>
        <option>Marketing</option>
        <option>Sales</option>
      </select>
    </div>

    
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Joining Date</label>
      <input
      value={joiningDate}
      onChange={(e)=>setJoiningDate(e.target.value)}
      type="date" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
      Add Employee
    </button>
  </form>
</div>
        </div>

    </>
  )
}

export default EmployeeAddForm;