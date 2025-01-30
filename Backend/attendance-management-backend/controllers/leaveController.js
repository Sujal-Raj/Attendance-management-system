const Leave = require('../models/leaveModel');

// Create a leave request
exports.createLeaveRequest = async (req, res) => {
    try {
        const { username, leaveType, leaveStartDate, leaveEndDate, reason } = req.body;

        // Create a new leave document
        const leaveRequest = new Leave({
            username,
            leaveType,
            leaveStartDate,
            leaveEndDate,
            reason,
        });

        // Save the leave request to the database
        await leaveRequest.save();
        res.status(201).json({ message: 'Leave request created successfully', leaveRequest });
    } catch (err) {
        res.status(500).json({ error: 'Error creating leave request' });
    }
};

// Get all leave requests (admin)
exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find();
        res.status(200).json(leaveRequests);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching leave requests' });
    }
};

// Get leave requests by username (employee can see their own requests)
exports.getLeaveRequestsByUsername = async (req, res) => {
    try {
        const { username } = req.params;  // Get username from URL parameters
        const leaveRequests = await Leave.find({ username });
        res.status(200).json(leaveRequests);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching your leave requests' });
    }
};
