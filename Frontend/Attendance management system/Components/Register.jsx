import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const formHandler = (e) => {
  //   e.preventDefault();
  //   console.log(username, emailId, password);
  //   navigate("/");
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, emailId, password });
      alert("Registration successful! Redirecting to login...");
      navigate('/login');
    } catch (err) {
      // console.error('Registration failed:', err.response.data.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center items-center h-[90vh]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <form action="" onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            {/* username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* ID Field */}
            <div className="mb-4">
              <label
                htmlFor="email-id"
                className="block text-gray-700 font-medium mb-2"
              >
                Email-ID
              </label>
              <input
                type="text"
                id="email-id"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Set Password
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
  );
}

export default Register;
