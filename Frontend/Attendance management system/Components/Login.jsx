import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(emailId, password, role);

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        emailId,
        password,
        role,
      });
 
      // Handle successful login
      const { token, role:serverRole } = response.data; // Assuming the backend returns a JWT token
      localStorage.setItem("authToken", token); // Store token in localStorage
      alert("Login successful!");

      if (role === "Admin") {
        navigate("/admindashboard");
      } else if (role === "Employee") {
        navigate("/employeedashboard");
      }
      // navigate("/admindashboard"); // Redirect to the dashboard
    } catch (err) {
      // Handle login error
      console.error("Login failed:", err.response?.data?.message || err.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    <form action="" onSubmit={handleLogin}>
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

    {/* ID Field */}
    <div className="mb-4">
      <label htmlFor="email-id" className="block text-gray-700 font-medium mb-2">
        Email-ID
      </label>
      <input
        type="text"
        id="email-id"
        placeholder="Enter your ID"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
              Select Role
            </label>
            <select
              id="role"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
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