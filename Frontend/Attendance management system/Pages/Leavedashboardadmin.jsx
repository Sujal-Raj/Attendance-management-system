import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FcLeave } from "react-icons/fc";
import { FiAlignJustify } from "react-icons/fi";
import axios from "axios";

function Leavedashboardadmin() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leave/leavedashboardadmin"
      ); // Adjust API URL
      setLeaveRequests(response.data);
      //   console.log(leaveRequests[0]._id);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleStatusUpdate = async (leaveId, newStatus) => {
    console.log(leaveId, newStatus);
    try {
      await axios.put(
        `http://localhost:5000/api/leave/updatestatus/${leaveId}`,
        {
          status: newStatus,
        }
      );
      // Refresh the leave requests after successful update
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <>
      <nav className="h-[10vh] font-bold flex items-center justify-between px-10">
        <p className="text-4xl">Admin Dashboard</p>
        <button className=" bg-blue-500 px-4 py-2 rounded-md">
          <NavLink
            className="font-bold !text-white focus:outline-none"
            to="/employeeaddform"
          >
            Add an Employee
          </NavLink>
        </button>
      </nav>
      <section className="flex">
        <aside className="bg-gray-200 p-4 min-h-[90vh] w-[15%]">
          <button className="w-full text-left hover:bg-gray-400 transition-all flex items-center gap-2">
            <FiAlignJustify />
            <NavLink
              to="/admindashboard"
              className="!text-black text-2xl text-semibold tracking-tighter "
            >
              Attendance
            </NavLink>
          </button>
          <button className="w-full text-left mt-2 flex items-center gap-2 hover:bg-gray-400 transition-all">
            <FcLeave />
            <NavLink
              to="/leavedashboardadmin"
              className="!text-black text-2xl text-semibold tracking-tighter"
            >
              Leaves
            </NavLink>
          </button>
        </aside>
        <div className="p-4 w-[85%] min-h-[90vh] bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Leave Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Username</th>
                  <th className="py-3 px-6 text-left">Leave Type</th>
                  <th className="py-3 px-6 text-left">Start Date</th>
                  <th className="py-3 px-6 text-left">End Date</th>
                  <th className="py-3 px-6 text-left">Reason</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave, index) => (
                  <tr
                    key={index}
                    className={`border-b transition duration-300 ease-in-out hover:bg-blue-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-6">{leave.username}</td>
                    <td className="py-3 px-6">{leave.leaveType}</td>
                    <td className="py-3 px-6">
                      {new Date(leave.leaveStartDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      {new Date(leave.leaveEndDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">{leave.reason}</td>
                    {/* <td className="py-3 px-6">{index}</td> */}
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
                    <td className="py-3 px-6">
                      {leave.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(leave._id, "Approved")
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(leave._id, "Rejected")
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {leaveRequests.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Leavedashboardadmin;
