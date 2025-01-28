const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema
const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
});

// Hash password before saving to the database
employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); // Encrypt password
    next();
});

module.exports = mongoose.model('Employee', employeeSchema);
