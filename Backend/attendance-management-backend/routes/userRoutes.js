const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');

// POST /api/users
router.post('/employeeaddform', addUser);

module.exports = router;