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
    enum: ["Delivery Boy (Zomato, Swiggy, etc.)","Driver (Cab, Auto, Private)","Helper (Shop, Warehouse, etc.)","Sales/Marketing (In-store, promotions)","Other (please specify)"],
    required: true,
  },
  job_type_1: {
    type: String,
  },
  vehicle_type: {
    type: String,
    enum: ["Yes – Personal bike (for deliveries)", "No – I’m looking for jobs that don’t require a vehicle","Yes – Personal vehicle (Car, Auto, etc.)"],
    required: true,
  },
  vehicle: {
    type: String,
    required: function () {
      return this.vehicle_type.includes("Yes");
    },
  },
  experience: {
    type: String,
    enum: ["Yes, I have worked as a delivery boy (Zomato, Swiggy, etc.)", "Yes, I have experience as a driver (cab, auto, etc.)","Yes, I’ve worked in a shop/warehouse or as a helper","No, I am new to the field but willing to learn","No, I have no prior experience"],
    required: true,
  },
  job_need: {
    type: String,
    enum: [
      "Immediately – I’m available to start right away",
      "Within 1 week – I need a little time to settle in",
      "I’m just exploring options, no urgency",
    ],
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
  profile_pic: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
},{ collection: "JOB_SEEKERS" });

const User = mongoose.model("JOB_SEEKER", Schema);

module.exports = User;
