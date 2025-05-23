const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyPhone: {
    type: String,
    required: true,
  },
  jobSeekerName: {
    type: String,
    required: true,
  },
  jobSeekerPhone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Connection', ConnectionSchema);
