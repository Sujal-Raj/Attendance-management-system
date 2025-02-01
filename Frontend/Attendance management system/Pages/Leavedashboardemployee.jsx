import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'


function Leavedashboardemployee() {

    const [userLeaves, setUserLeaves] = useState([]);
    const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserLeaves = async () => {
      try {
        // Get user info from localStorage (adjust according to how you store user data)
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        
        if (!user) {
          setError('User not found. Please login again.');
          return;
        }

        // Fetch leaves for the specific user using their username/id
        const response = await axios.get(`http://localhost:5000/api/leave/employeeleave/${user.emailId}`);
        setUserLeaves(response.data);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching leaves:', error);
        setError('Failed to fetch your leave requests');
      }
    };

    fetchUserLeaves();
  }, []);

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
          <button className=' bg-blue-500 px-4 py-2 rounded-md ml-2'>
              <NavLink className='font-bold !text-white focus:outline-none' to="/employeedashboard">
                  Back To Dashboard
              </NavLink>
          </button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Your Leave Requests</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Leave Type</th>
                <th className="py-3 px-6 text-left">Start Date</th>
                <th className="py-3 px-6 text-left">End Date</th>
                <th className="py-3 px-6 text-left">Reason</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userLeaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className={`border-b transition duration-300 ease-in-out hover:bg-blue-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6">{leave.leaveType}</td>
                  <td className="py-3 px-6">
                    {new Date(leave.leaveStartDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(leave.leaveEndDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{leave.reason}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        leave.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : leave.status === "Rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
              {userLeaves.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Leavedashboardemployee