const mongoose = require('mongoose');

// Define schema
const attendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    clockInTime: {
        type: Date,
        required: true,
    },
    clockOutTime: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        default: 'Absent',
        enum: ['Present', 'Absent'],
    },
    duration: {
        type: Number, // Duration in hours (decimal)
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to calculate duration if clockOutTime is provided
attendanceSchema.pre('save', function(next) {
    if (this.clockInTime && this.clockOutTime) {
        const durationInMillis = this.clockOutTime - this.clockInTime;
        this.duration = durationInMillis / (1000 * 60 * 60);  // Convert from milliseconds to hours
        this.status = 'Present'; // Mark as present if clock-in and clock-out times exist
    } else {
        this.status = 'Absent'; // If no clock-out time, mark as absent
    }
    next();
});

// Create model
module.exports = mongoose.model('Attendance', attendanceSchema);
