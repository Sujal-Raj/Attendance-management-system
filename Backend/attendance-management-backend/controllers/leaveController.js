const Leave = require('../models/leaveModel');

// Create a leave request
exports.createLeaveRequest = async (req, res) => {
    try {
        const { username, leaveType, leaveStartDate, leaveEndDate, reason,emailId } = req.body;

        // Create a new leave document
        const leaveRequest = new Leave({
            username,
            leaveType,
            leaveStartDate,
            leaveEndDate,
            reason,
            emailId
        });

        // Save the leave request to the database
        await leaveRequest.save();
        res.status(201).json({ message: 'Leave request created successfully', leaveRequest });
    } catch (err) {
        res.status(500).json({ error: 'Error creating leave request' });
    }
};


exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find(); // Fetch all leave requests from DB
        res.status(200).json(leaveRequests);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching leave requests' });
    }
};

exports.updateLeaveRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            { status },
            { new: true } // This option returns the updated document
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave request not found" });
        }

        res.json(updatedLeave);
    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ message: error.message });
    } 
}

exports.getEmployeeLeaveRequests = async (req, res) => {
    try {
        const { emailId } = req.params;
        // console.log(emailId);
        
        // Find all leaves for the specific email
        const leaves = await Leave.find({ emailId });
        // console.log(leaves); 
        
        res.json(leaves);
    } catch (error) {
        console.error('Error fetching employee leaves:', error);
        res.status(500).json({ message: error.message });
    }
}