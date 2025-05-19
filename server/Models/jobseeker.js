const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  whatsapp_number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  job_preference: {
  type: String,
  
  enum: ["delivery", "ride-sharing"], 
  message: "{VALUE} is not a valid job preference"
},
  full_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    
  },
  vehicle_number: {
    type: String,
    default: null,  
  },
  experience: {
    type: String,
    default: null,
  },
  preferred_locations: {
    type: [String],
    default: [],
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  vehicle_type: {
    type: String,
    default: null,
  },
  aadhar_image: {
    type: String,
    default: null,
  },
  profile_image: {
    type: String,
    default: null,
  },
  start_time: {
    type: String,
    default: null,
  },
  end_time: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
