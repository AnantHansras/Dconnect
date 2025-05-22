// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    minlength: 2,
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
  },
  jobType: {
    type: String,
    enum: [
      "Delivery Boy (Zomato, Swiggy, etc.)",
      "Driver (Cab, Auto, Private)",
      "Helper (Shop, Warehouse, etc.)",
      "Sales/Marketing (In-store, promotions)",
      "Other (please specify)",
    ],
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
  },
  expectedSalary: {
    type: String,
    required: true,
  },
  work_time: {
    type: String,
    enum: [
      "Morning (6 AM – 12 PM)",
      "Afternoon (12 PM – 6 PM)",
      "Evening (6 PM – 10 PM)",
      "Night (10 PM – 6 AM)",
      "Flexible/Any time",
    ],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
    min: 16,
  },
  maxAge: {
    type: Number,
    required: true,
    min: 16,
    validate: {
      validator: function (value) {
        return value >= this.minAge;
      },
      message: "Maximum age must be greater than or equal to minimum age",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  requirements: {
    type: String,
    required: true,
    minlength: 10,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
