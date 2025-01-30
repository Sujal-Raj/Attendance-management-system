const Employee = require('../models/Employee');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {
    try {
        const { username, emailId, password } = req.body;

        // Check if user already exists
        const existingUser = await Employee.findOne({ emailId });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        // Create new user
        const user = new Employee({ username, emailId, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { emailId, password,role } = req.body;
        console.log("role",role);

        // Find user by email
        // const user = await Employee.findOne({ emailId });

        let user;

        if (role === "Admin") {
            user = await Employee.findOne({ emailId });
          } else if (role === "employee") {
            user = await User.findOne({ emailId });
          } else {
            return res.status(400).json({ message: "Invalid role selected" });
          }


        if (!user) return res.status(404).json({ error: 'User not found' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token,role });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
