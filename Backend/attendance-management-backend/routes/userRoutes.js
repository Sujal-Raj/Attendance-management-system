const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');
const UserModel = require('../models/userModel');

// POST /api/users
router.post('/employeeaddform', addUser);


router.get("/users", async (req, res) => {
    try {
      const users = await UserModel.find(); // Fetch all users
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Error fetching users" });
    }
  });


module.exports = router;