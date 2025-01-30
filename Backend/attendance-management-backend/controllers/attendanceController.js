const Attendance = require('../models/attendanceModel');

// Clock in the user
exports.clockIn = async (req, res) => {
    try {
        const { username } = req.body;

        // Create a new clock-in record
        const attendance = new Attendance({
            username,
            clockInTime: new Date(),
            status: 'Absent',  // Set status to 'Absent' initially until clock-out
        });

        await attendance.save();
        res.status(201).json({ message: 'User clocked in successfully', attendance });
    } catch (err) {
        res.status(500).json({ error: 'Error clocking in' });
    }
};

// Clock out the user
exports.clockOut = async (req, res) => {
    try {
        const { username } = req.body;

        // Find the latest attendance record for the user
        const attendance = await Attendance.findOne({ username, status: 'Absent' }).sort({ date: -1 });

        if (!attendance) {
            return res.status(400).json({ error: 'User has not clocked in yet' });
        }

        // Update the clock-out time and calculate the duration
        attendance.clockOutTime = new Date();
        await attendance.save();
        res.status(200).json({ message: 'User clocked out successfully', attendance });
    } catch (err) {
        res.status(500).json({ error: 'Error clocking out' });
    }
};

// Get attendance records of a user
exports.getUserAttendance = async (req, res) => {
    try {
        const { username } = req.params;
        const attendance = await Attendance.find({ username }).sort({ date: -1 });

        if (!attendance) {
            return res.status(404).json({ error: 'No attendance records found' });
        }

        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching attendance records' });
    }
};
