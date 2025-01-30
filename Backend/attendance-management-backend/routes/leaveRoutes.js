const express = require('express');
const router = express.Router();
const { createLeaveRequest, getAllLeaveRequests, getLeaveRequestsByUsername } = require('../controllers/leaveController');

// POST /api/leave
router.post('/leaveformapplication', createLeaveRequest);

module.exports = router;