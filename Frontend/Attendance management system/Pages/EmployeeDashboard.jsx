import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


function EmployeeDashboard() {

  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format
  const [summary, setSummary] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    averageWorkHours: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLeaves = async () => {
      try {
        // Get user info from localStorage (adjust according to how you store user data)
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user)
        
        if (!user) {
          setError('User not found. Please login again.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/attendance/employee/${user._id}/${selectedMonth}`);
        // console.log(response)
        setAttendance(response.data);

        // Calculate summary
        const present = response.data.filter(record => record.status === 'Present').length;
        const totalHours = response.data.reduce((acc, record) => {
          if (record.totalTime) {
            const hours = parseFloat(record.totalTime.split(' ')[0]);
            return acc + (isNaN(hours) ? 0 : hours);
          }
          return acc;
        }, 0);

        setSummary({
          totalPresent: present,
          totalAbsent: response.data.length - present,
          averageWorkHours: response.data.length ? (totalHours / present).toFixed(2) : 0
        });

      } catch (error) {
        console.error('Error fetching leaves:', error);
        setError('Failed to fetch your leave requests');
      }
    };



    fetchUserLeaves();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleLogout = ()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <>
      <nav className='h-[10vh] font-bold flex items-center justify-between px-10'>
        <p className='text-4xl'>Your Dashboard</p>
        <div className='flex items-center gap-4'>
          <button className=' bg-blue-500 px-4 py-2 rounded-md'>
              <NavLink className='font-bold !text-white focus:outline-none' to="/leaveformapplication">
                  Apply for Leave
              </NavLink>
          </button>
          <button className=' bg-emerald-500 px-4 py-2 rounded-md'>
              <NavLink className='font-bold !text-white focus:outline-none' to="/leavedashboardemployee">
                  Your Leaves
              </NavLink>
          </button>
          <button onClick={handleLogout} className='w-[35px] h-[35px] rounded-full flex items-center justify-center hover:cursor-pointer'>
              <IoIosLogOut className='text-xl font-extrabold'/> 
              {/* LogOut */}
          </button>
        </div>
      </nav>
      <section>
      <div className="p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Present Days</h3>
              <p className="text-2xl font-bold text-blue-600">{summary.totalPresent}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800">Absent Days</h3>
              <p className="text-2xl font-bold text-red-600">{summary.totalAbsent}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Avg. Work Hours</h3>
              <p className="text-2xl font-bold text-green-600">{summary.averageWorkHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Attendance Report</h2>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-600" />
              <input
                type="month"
                className="border px-2 py-1 rounded"
                value={selectedMonth}
                onChange={handleMonthChange}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.clockIn || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.clockOut || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.totalTime || '-'}</td>
                  </tr>
                ))}
                {attendance.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No attendance records found for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default EmployeeDashboard