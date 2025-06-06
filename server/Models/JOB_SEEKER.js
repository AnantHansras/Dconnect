const mongoose = require("mongoose");

  
  
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  job_type: {
    type: String,
    enum: ["Bike Delivery","Van Driver","Auto Driver","Cab/Taxi Driver","Tempo/Truck Driver","Any available opportunity"],
    required: true,
  },
  vehicle_type: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  vehicle: {
    type: String,
  },
  prior_exp: { type: String, enum: ['Yes', 'No'], required: true },
  experience: { type: String }, 
  //job_type_1

  // job_need: {
  //   type: String,
  //   enum: [
  //     "Immediately – I’m available to start right away",
  //     "Within 1 week – I need a little time to settle in",
  //     "I’m just exploring options, no urgency",
  //   ],
  //   required: true,
  // },
  // work_time: {
  //   type: String,
  //   enum: [
  //     "Morning (6 AM – 12 PM)",
  //     "Afternoon (12 PM – 6 PM)",
  //     "Evening (6 PM – 10 PM)",
  //     "Night (10 PM – 6 AM)",
  //     "Flexible/Any time",
  //   ],
  //   required: true,
  // },
  // profile_pic: {
  //   type: String,
  // },
  gender: { type: String, enum: ['Male', 'Female', 'Prefer not to say'], required: true },
  job_timing: { type: String, enum: ['Full-time', 'Part-time','Flexible/Shift-based'], required: true }

  
},{ collection: "JOB_SEEKER" });

const User = mongoose.model("JOB_SEEKER", Schema);

module.exports = User;
