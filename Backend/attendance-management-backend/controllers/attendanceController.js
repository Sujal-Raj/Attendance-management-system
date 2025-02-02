const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');

// Record attendance status (Present/Absent)
exports.recordAttendance = async (req, res) => {
  const { userId, status, date } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update or create attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { userId, date },
      { status },
      { new: true, upsert: true }
    );

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Record clock-in time
exports.recordClockIn = async (req, res) => {
  const { userId, clockIn, date } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update or create attendance record with clock-in time
    const attendance = await Attendance.findOneAndUpdate(
      { userId, date },
      { clockIn },
      { new: true, upsert: true }
    );

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Record clock-out time and calculate total time
exports.recordClockOut = async (req, res) => {
  const { userId, clockOut, date } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the attendance record for the user and date
    const attendance = await Attendance.findOne({ userId, date });
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Calculate total time
    const clockIn = attendance.clockIn;
    const totalTime = calculateTotalTime(clockIn, clockOut);

    // Update attendance record with clock-out time and total time
    attendance.clockOut = clockOut;
    attendance.totalTime = totalTime;
    await attendance.save();

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download attendance report as CSV
exports.downloadReport = async (req, res) => {
  try {
    // Fetch all attendance records and populate user details
    const attendances = await Attendance.find().populate('userId', 'fullName emailId');

    // Generate CSV content
    let csv = 'Name,Email,Date,Status,Clock-In,Clock-Out,Total Time\n';
    attendances.forEach((att) => {
      csv += `${att.userId.fullName},${att.userId.emailId},${att.date},${att.status},${att.clockIn || 'N/A'},${att.clockOut || 'N/A'},${att.totalTime || 'N/A'}\n`;
    });

    // Set response headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.attachment('attendance_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate total time
function calculateTotalTime(clockIn, clockOut) {
  if (!clockIn || !clockOut) return '0.00 hours';

  const [inHours, inMinutes] = clockIn.split(':');
  const [outHours, outMinutes] = clockOut.split(':');

  const totalMinutes = (outHours - inHours) * 60 + (outMinutes - inMinutes);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}.${minutes.toString().padStart(2, '0')} hours`;
}


exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const attendance = await Attendance.find({ date });
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeAttendance = async (req, res) => {
  try {
    const { userId, month } = req.params;

    // const user = await User.findOne({ emailId });
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    
    // Create date range for the selected month
    const startDate = `${month}-01`;
    const lastDay = new Date(month.split('-')[0], month.split('-')[1], 0).getDate();
    const endDate = `${month}-${lastDay}`;

    const attendance = await Attendance.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ date: 1 });

    res.json(attendance);
  } catch (error) {
    console.error('Error fetching employee attendance:', error);
    res.status(500).json({ message: error.message });
  }
};