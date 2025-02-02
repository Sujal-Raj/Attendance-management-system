import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function LeaveApplicationForm() {

  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [leaveType, setleaveType] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setleaveEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleLeaveApplication = async (e) => {
    e.preventDefault();

    try{
      await axios.post('http://localhost:5000/api/leave/leaveformapplication', { username, leaveType, leaveStartDate, leaveEndDate, reason,emailId });
      // alert("Leave Application successful!");
      toast.success("Leave Application successful!");
      <ToastContainer />
    }
    catch(err){
      console.error("Leave Application failed:", err.response?.data?.message || err.message);
      // alert("Leave Application failed. Please try again.");
      toast.error("Leave Application failed. Please try again.");
      <ToastContainer />
    }

    setUsername("");
    setEmailId("");
    setleaveType("");
    setLeaveStartDate("");
    setleaveEndDate("");
    setReason("");
  }


  return (
    <>
    <nav className='h-[10vh] font-bold flex items-center justify-between px-10'>
        <p className='text-4xl'>Leave Application</p>
        <button className=' bg-blue-500 px-4 py-2 rounded-md'>
            <NavLink className='font-bold !text-white focus:outline-none' to="/employeedashboard">
                Back To Dashboard
            </NavLink>
        </button>
      </nav>
        <div>
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
  {/* <h2 className="text-2xl font-bold mb-4 text-center">Leave Application</h2> */}
  
  <form onSubmit={handleLeaveApplication}>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Username</label>
      <input 
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      type="text" placeholder="Enter your name" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Email ID</label>
      <input
      value={emailId}
      onChange={(e)=>setEmailId(e.target.value)}
      type="email" placeholder="Enter email ID" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Leave Type</label>
      <select
      value={leaveType}
      onChange={(e)=>setleaveType(e.target.value)}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Select leave type</option>
        <option>Sick Leave</option>
        <option>Casual Leave</option>
        {/* <option>Annual Leave</option> */}
        <option>Vacation</option>
        <option>Maternity/Paternity Leave</option>
      </select>
    </div>


    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Start Date</label>
      <input
      value={leaveStartDate}
      onChange={(e)=>setLeaveStartDate(e.target.value)}
      type="date" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>


    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">End Date</label>
      <input
      value={leaveEndDate}
      onChange={(e)=>setleaveEndDate(e.target.value)}
      type="date" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>


    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Reason for Leave</label>
      <textarea
      value={reason}
      onChange={(e)=>setReason(e.target.value)}
      placeholder="Enter reason for leave" rows="4" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    </div>

    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
      Submit Leave Request
    </button>
  </form>
</div>

        </div>
    </>
  )

}


export default LeaveApplicationForm