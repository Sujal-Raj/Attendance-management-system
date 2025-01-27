const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  attendance: [
    {
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' },
    },
  ],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
