const express = require('express');
const router = express.Router();
const { createLeaveRequest, getAllLeaveRequests, getLeaveRequestsByUsername } = require('../controllers/leaveController');

// POST /api/leave
router.post('/', createLeaveRequest);

// GET /api/leave (Admin only)
router.get('/', getAllLeaveRequests);

// GET /api/leave/:username (Employee)
router.get('/:username', getLeaveRequestsByUsername);

module.exports = router;
