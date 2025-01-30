const User = require('../models/userModel');

// Add a new user
exports.addUser = async (req, res) => {
    try {
        // console.log('Request body:', req.body);
        const { fullName, emailId, phoneNumber, department, joiningDate,password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        // Create a new user
        const user = new User({
            fullName,
            emailId,
            phoneNumber,
            department,
            joiningDate,
            password
        });

        // console.log('Attempting to save user:', user);

        // Save user to the database
        await user.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding user' });
    }
};