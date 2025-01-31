import React from 'react'
import { NavLink } from 'react-router-dom'


function EmployeeDashboard() {
  return (
    <>
      <nav className='h-[10vh] font-bold flex items-center justify-between px-10'>
        <p className='text-4xl'>Your Dashboard</p>
        <div>
          <button className=' bg-blue-500 px-4 py-2 rounded-md'>
              <NavLink className='font-bold !text-white focus:outline-none' to="/leaveformapplication">
                  Apply for Leave
              </NavLink>
          </button>
          <button className=' bg-emerald-500 px-4 py-2 rounded-md ml-2'>
              <NavLink className='font-bold !text-white focus:outline-none' to="/leavedashboardemployee">
                  Your Leaves
              </NavLink>
          </button>
        </div>
      </nav>
    </>
  )
}

export default EmployeeDashboard