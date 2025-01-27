import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div className='h-[10vh] flex justify-between items-center px-10'>
            {/* <p className='font-bold text-5xl'>AMS</p> */}
            <NavLink className='font-bold text-5xl !text-zinc-900' to="/">AMS</NavLink>

            <div className='flex gap-2'>
                {/* <button className=' bg-blue-500 px-4 py-2 rounded-md'>
                    <NavLink className='font-bold !text-white focus:outline-none' to="/login">
                        Login
                    </NavLink>
                </button> */}
                {/* <button className=' bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition shadow-lg'>
                    <NavLink className='font-bold !text-white focus:outline-none ' to="/register">
                        Register
                    </NavLink>
                </button> */}
            </div>
        </div>
    </>
  )
}

export default Navbar