const express = require('express');
const router = express.Router();
const { clockIn, clockOut, getUserAttendance } = require('../controllers/attendanceController');

// POST /api/attendance/clock-in
router.post('/clock-in', clockIn);

// POST /api/attendance/clock-out
router.post('/clock-out', clockOut);

// GET /api/attendance/:username (Admin or User to see attendance)
router.get('/:username', getUserAttendance);

module.exports = router;
