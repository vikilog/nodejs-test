const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, 'Mobile is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    index: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    index: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    index: true
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive']
  }
},{timestamps: true});


module.exports = mongoose.model('Employee', EmployeeSchema);
