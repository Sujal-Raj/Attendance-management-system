import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FcLeave } from "react-icons/fc";
import { FiAlignJustify } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAttendance = async (userId) => {
    const newStatus = attendance[userId]?.status === "Present" ? "Absent" : "Present";
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        status: newStatus,
      },
    }));

    try {
      await axios.post("http://localhost:5000/api/attendance/record", {
        userId,
        status: newStatus,
        date: selectedDate,
      });
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  const handleClockIn = async (userId) => {
    const currentTime = new Date().toLocaleTimeString();
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        clockIn: currentTime,
      },
    }));

    try {
      await axios.post("http://localhost:5000/api/attendance/clockin", {
        userId,
        clockIn: currentTime,
        date: selectedDate,
      });
    } catch (error) {
      console.error("Error recording clock-in:", error);
    }
  };

  const handleClockOut = async (userId) => {
    const currentTime = new Date().toLocaleTimeString();
    setAttendance((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        clockOut: currentTime,
      },
    }));

    try {
      await axios.post("http://localhost:5000/api/attendance/clockout", {
        userId,
        clockOut: currentTime,
        date: selectedDate,
      });
    } catch (error) {
      console.error("Error recording clock-out:", error);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/report", {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <>
      <nav className='h-[10vh] font-bold flex items-center justify-between px-10 bg-blue-600 text-white'>
        <p className='text-4xl'>Admin Dashboard</p>
        <button className='bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-900 transition-all'>
          <NavLink className='font-bold !text-white focus:outline-none' to="/employeeaddform">
            Add an Employee
          </NavLink>
        </button>
      </nav>
      <section className='flex'>
        <aside className='bg-gray-200 p-4 min-h-[90vh] w-[15%]'>
          <button className='w-full text-left hover:bg-gray-400 transition-all flex items-center gap-2 p-2 rounded'>
            <FiAlignJustify />
            <NavLink to="/admindashboard" className="!text-black text-2xl text-semibold tracking-tighter">Attendance</NavLink>
          </button>
          <button className='w-full text-left mt-2 flex items-center gap-2 hover:bg-gray-400 transition-all p-2 rounded'>
            <FcLeave />
            <NavLink to="/leavedashboardadmin" className="!text-black text-2xl text-semibold tracking-tighter">Leaves</NavLink>
          </button>
        </aside>
        <div className="p-4 w-[85%] min-h-[90vh] bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Employee Attendance</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-600" />
              <input
                type="date"
                className="border px-2 py-1 rounded"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <button onClick={downloadReport} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
              Download Attendance Report
            </button>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Clock-In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Clock-Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all"
                        onClick={() => handleClockIn(user._id)}
                      >
                        {attendance[user._id]?.clockIn || "Clock In"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                        onClick={() => handleClockOut(user._id)}
                      >
                        {attendance[user._id]?.clockOut || "Clock Out"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {attendance[user._id]?.clockIn && attendance[user._id]?.clockOut
                        ? calculateTotalTime(attendance[user._id]?.clockIn, attendance[user._id]?.clockOut)
                        : "0.00 hours"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        className={`px-3 py-1 rounded transition-all ${
                          attendance[user._id]?.status === "Present"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        onClick={() => handleAttendance(user._id)}
                      >
                        {attendance[user._id]?.status || "Absent"}
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
  );
}

export default AdminDashboard;

function calculateTotalTime(clockIn, clockOut) {
  // Parse hours and minutes
  const [inHours, inMinutes] = clockIn.split(':').map(Number);
  const [outHours, outMinutes] = clockOut.split(':').map(Number);
  
  let totalMinutes;
  
  // Handle clock out time on next day (after midnight)
  if (outHours < inHours || (outHours === inHours && outMinutes < inMinutes)) {
      totalMinutes = ((outHours + 24) * 60 + outMinutes) - (inHours * 60 + inMinutes);
  } else {
      totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
  }
  
  // Calculate hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  // Format minutes to always show two digits
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${hours}.${formattedMinutes} hours`;
}