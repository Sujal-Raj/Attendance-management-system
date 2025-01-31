const mongoose = require('mongoose');

// Define schema
const leaveSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Store username instead of userId
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['Sick Leave', 'Casual Leave', 'Vacation', 'Maternity/Paternity Leave'], // Enum for different leave types
    },
    leaveStartDate: {
        type: Date,
        required: true,
    },
    leaveEndDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected'], // Enum for status
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create model
module.exports = mongoose.model('Leave', leaveSchema);