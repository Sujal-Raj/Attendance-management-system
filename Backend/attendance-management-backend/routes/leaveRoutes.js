const express = require('express');
const router = express.Router();
const { createLeaveRequest, getAllLeaveRequests, updateLeaveRequestStatus,getEmployeeLeaveRequests } = require('../controllers/leaveController');

// POST /api/leave
router.post('/leaveformapplication', createLeaveRequest);

router.get('/leavedashboardadmin',getAllLeaveRequests);

router.put('/updatestatus/:id', updateLeaveRequestStatus);

router.get('/employeeleave/:emailId', getEmployeeLeaveRequests);

module.exports = router;