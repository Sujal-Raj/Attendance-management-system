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