const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true, // removes extra spaces
    },
    emailId: {
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
    password: {  // Add password field
        type: String,
        required: true,
    }
}, {
    timestamps: true, // automatically adds createdAt and updatedAt fields
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new/modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (err) {
        next(err);
    }
});

// Create model
module.exports = mongoose.model('User', userSchema);