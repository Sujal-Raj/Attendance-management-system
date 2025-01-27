import React from 'react'
import { NavLink } from 'react-router-dom'


function Login() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    <form action="">
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

    {/* ID Field */}
    <div className="mb-4">
      <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
        ID
      </label>
      <input
        type="text"
        id="id"
        placeholder="Enter your ID"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* Password Field */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full mb-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-bold"
    >
      Login
    </button>

    </form>

    <p className='font-bold text-center'>Or</p>

    {/* Register Button */}
    <div className="mt-2 text-center">
      <button className=" w-full bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition shadow-lg">
        <NavLink
          className="font-bold !text-white focus:outline-none"
          to="/register"
        >
          Register
        </NavLink>
      </button>
    </div>
  </div>
</div>

  )
}

export default Login