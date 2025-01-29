import React from 'react'
import { NavLink } from 'react-router-dom'


function AdminDashboard() {
  return (
    <>
      <nav className='h-[10vh] font-bold flex items-center justify-between px-10'>
        <p className='text-4xl'>Admin Dashboard</p>
        <button className=' bg-blue-500 px-4 py-2 rounded-md'>
            <NavLink className='font-bold !text-white focus:outline-none' to="/employeeaddform">
                Add an Employee
            </NavLink>
        </button>
      </nav>
    </>
  )
}

export default AdminDashboard