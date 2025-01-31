import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { FcLeave } from "react-icons/fc";
import { FiAlignJustify } from "react-icons/fi";


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    // console.log(users);
  },[]);


  const handleDateChange = (userId, date) => {
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        date: date,
      },
    }));
  };

  
  const handleAttendance = (userId) => {
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        status: prev[userId]?.status === "Present" ? "Absent" : "Present",
      },
    }));
  };

  // Handle Clock-In Time
  const handleClockIn = (userId) => {
    const currentTime = new Date().toLocaleTimeString();
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        clockIn: currentTime,
      },
    }));
  };

  // Handle Clock-Out Time
  const handleClockOut = (userId) => {
    const currentTime = new Date().toLocaleTimeString();
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        clockOut: currentTime,
      },
    }));
  };


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
      <section className='flex'>
      <aside className='bg-gray-200 p-4 min-h-[90vh] w-[15%]'>
        <button className='w-full text-left hover:bg-gray-400 transition-all flex items-center gap-2'>
          <FiAlignJustify />
          <NavLink to="/admindashboard" className="!text-black text-2xl text-semibold tracking-tighter ">Attendance</NavLink>
        </button>
        <button className='w-full text-left mt-2 flex items-center gap-2 hover:bg-gray-400 transition-all'>
          <FcLeave />
          <NavLink to="/leavedashboardadmin" className="!text-black text-2xl text-semibold tracking-tighter">Leaves</NavLink>
        </button>
      </aside>
      <div className="p-4  w-[85%] min-h-[90vh]">
      <h2 className="text-2xl font-bold mb-4">Employee Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Attendance</th>
              <th className="px-4 py-2 border">Clock-In Time</th>
              <th className="px-4 py-2 border">Clock-Out Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{user.fullName}</td>
                <td className="px-4 py-2 border">{user.emailId}</td>
                <td className="px-4 py-2 border">
              <input
                type="date"
                className="border px-2 py-1 rounded"
                value={attendance[user._id]?.date || ""}
                onChange={(e) => handleDateChange(user._id, e.target.value)}
              />
            </td>
                <td className="px-4 py-2 border">
                      <button
                        className={`px-3 py-1 rounded ${
                          attendance[user._id]?.status === "Present"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                        onClick={() => handleAttendance(user._id)}
                      >
                        {attendance[user._id]?.status || "Absent"}
                      </button>
                    </td>

                    {/* Clock-In Button */}
                    <td className="px-4 py-2 border">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => handleClockIn(user._id)}
                      >
                        {attendance[user._id]?.clockIn || "Clock In"}
                      </button>
                    </td>

                    {/* Clock-Out Button */}
                    <td className="px-4 py-2 border">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleClockOut(user._id)}
                      >
                        {attendance[user._id]?.clockOut || "Clock Out"}
                      </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </section>
    </>
  )
}

export default AdminDashboard