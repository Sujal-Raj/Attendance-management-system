const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
