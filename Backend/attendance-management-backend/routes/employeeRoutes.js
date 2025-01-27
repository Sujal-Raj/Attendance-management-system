const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  const { name, email, position } = req.body;

  try {
    const newEmployee = new Employee({ name, email, position });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an employee's attendance
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.attendance.push({ date, status });
    await employee.save();

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
