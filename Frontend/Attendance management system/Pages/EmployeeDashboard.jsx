import React from 'react'
import { NavLink } from 'react-router-dom'


function EmployeeDashboard() {
  return (
    <>
      <nav className='h-[10vh] font-bold flex items-center justify-between px-10'>
        <p className='text-4xl'>Your Dashboard</p>
        <button className=' bg-blue-500 px-4 py-2 rounded-md'>
            <NavLink className='font-bold !text-white focus:outline-none' to="/leaveformapplication">
                Apply for Leave
            </NavLink>
        </button>
      </nav>
    </>
  )
}

export default EmployeeDashboard