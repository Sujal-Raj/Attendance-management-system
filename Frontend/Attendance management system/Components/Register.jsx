import React from 'react'
import Navbar from './Navbar'

function Register() {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-[90vh]">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    <form action="">
    <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

    {/* username Field */}
    <div className="mb-4">
      <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
        Username
      </label>
      <input
        type="text"
        id="id"
        placeholder="Enter your username"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* ID Field */}
    <div className="mb-4">
      <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
        Email-ID
      </label>
      <input
        type="text"
        id="id"
        placeholder="Enter your email"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* Password Field */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
        Set Password
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
      Register
    </button>

    </form>
    </div>
    </div>
    </>
  )
}

export default Register