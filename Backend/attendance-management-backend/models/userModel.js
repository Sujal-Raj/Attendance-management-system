const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true, // removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true, // ensures email is unique
        trim: true,
        lowercase: true, // stores email in lowercase
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true, // automatically adds createdAt and updatedAt fields
});

// Create model
module.exports = mongoose.model('User', userSchema);
