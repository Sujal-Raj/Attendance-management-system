import React from 'react'
import { NavLink } from 'react-router-dom'

function LeaveApplicationForm() {
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
        <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
  {/* <h2 class="text-2xl font-bold mb-4 text-center">Leave Application</h2> */}
  
  <form>

    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Employee Name</label>
      <input type="text" placeholder="Enter your name" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Employee ID</label>
      <input type="text" placeholder="Enter employee ID" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Leave Type</label>
      <select class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Select leave type</option>
        <option>Sick Leave</option>
        <option>Casual Leave</option>
        <option>Annual Leave</option>
        <option>Maternity/Paternity Leave</option>
      </select>
    </div>


    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Start Date</label>
      <input type="date" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>


    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">End Date</label>
      <input type="date" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>


    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Reason for Leave</label>
      <textarea placeholder="Enter reason for leave" rows="4" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
    </div>

    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
      Submit Leave Request
    </button>
  </form>
</div>

        </div>
    </>
  )

}


export default LeaveApplicationForm