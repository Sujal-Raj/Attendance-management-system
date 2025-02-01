const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Record attendance status
router.post('/record', attendanceController.recordAttendance);

// Record clock-in time
router.post('/clockin', attendanceController.recordClockIn);

// Record clock-out time
router.post('/clockout', attendanceController.recordClockOut);

// Download attendance report
router.get('/report', attendanceController.downloadReport);

module.exports = router;