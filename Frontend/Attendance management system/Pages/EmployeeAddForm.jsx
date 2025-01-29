import React from 'react'

function EmployeeAddForm() {
  return (
    <>
        <nav className='h-[10vh] font-bold flex items-center justify-center px-10'>
        <p className='text-4xl'>Add an Employee</p>
      </nav>
        <div>
        <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
  {/* <h2 class="text-2xl font-bold mb-4 text-center">Add Employee</h2> */}
  
  <form>
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Full Name</label>
      <input type="text" placeholder="Enter full name" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Email</label>
      <input type="email" placeholder="Enter email" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Phone Number</label>
      <input type="tel" placeholder="Enter phone number" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Department</label>
      <select class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Select department</option>
        <option>HR</option>
        <option>Engineering</option>
        <option>Marketing</option>
        <option>Sales</option>
      </select>
    </div>

    
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">Joining Date</label>
      <input type="date" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>

    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
      Add Employee
    </button>
  </form>
</div>
        </div>

    </>
  )
}

export default EmployeeAddForm