const express = require('express');
const otpGenerator = require('otp-generator');
const mongoose = require('mongoose');
const {uploadImageToCloudinary} = require('../Config/imageUploader');
const OTP = require('../Models/OTP');
const JobSeeker = require('../Models/jobseeker');

// Generate OTP
const generateOTP = () => {
  return otpGenerator.generate(6, {
    specialChars: false,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false
  });
};

// Signup with OTP
// exports.jobSeekerSignup = async (req, res) => {
//   const { whatsapp_number,email, full_name, city, job_preference, vehicle_number, experience, preferred_locations, vehicle_type, start_time, end_time } = req.body;
//   const { aadhar_image, profile_image } = req.files || {};

//   if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
//   if (!job_preference) return res.status(400).json({ success: false, message: 'Job preference is required' });

//   const otp = generateOTP();
  
//   try {
//     const existingJobSeeker = await JobSeeker.findOne({ email });

//     if (existingJobSeeker) {
//       if (existingJobSeeker.verified) {
//         return res.status(400).json({ success: false, message: 'User already registered' });
//       }
//       await OTP.create({ email, otp });
//       return res.status(200).json({ success: true, message: 'OTP sent to WhatsApp number' });
//     }
    
//     let aadharImageUrl = null;
//     let profileImageUrl = null;
//     if (aadhar_image && aadhar_image[0]) {
//       const aadharUpload = await uploadImageToCloudinary(aadhar_image[0].path,
//                 process.env.FOLDER_NAME,
//                 1000,
//                 1000);
//       aadharImageUrl = aadharUpload.secure_url;
//     }
    
//     if (profile_image && profile_image[0]) {
//       const profileUpload = await uploadImageToCloudinary(profile_image[0].path,
//                 process.env.FOLDER_NAME,
//                 1000,
//                 1000);
//       profileImageUrl = profileUpload.secure_url;
//     }
//     const jobSeekerData = {
//       whatsapp_number,
//       email,
//       full_name,
//       city,
//       job_preference,
//       vehicle_number,
//       experience,
//       preferred_locations: preferred_locations || [],
//       vehicle_type,
//       aadhar_image: aadharImageUrl,
//       profile_image: profileImageUrl,
//       start_time,
//       end_time,
//       verified: false,
//     };

//     const jobSeeker = await JobSeeker.create(jobSeekerData);
//     await OTP.create({ email, otp });

//     res.status(200).json({ success: true, message: 'OTP sent to email' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.jobSeekerSignup = async (req, res) => {
//   const { whatsapp_number,email, full_name} = req.body;
//   if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

//   const otp = generateOTP();
  
//   try {
//     const existingJobSeeker = await JobSeeker.findOne({ email });

//     if (existingJobSeeker) {
//       if (existingJobSeeker.verified) {
//         return res.status(400).json({ success: false, message: 'User already registered' });
//       }
//       await OTP.create({ email, otp });
//       return res.status(200).json({ success: true, message: 'OTP sent to WhatsApp number' });
//     }
    
    
//     const jobSeekerData = {
//       whatsapp_number,
//       email,
//       full_name,
//       verified: false,
//     };

//     const jobSeeker = await JobSeeker.create(jobSeekerData);
//     await OTP.create({ email, otp });

//     res.status(200).json({ success: true, message: 'OTP sent to email' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // Verify OTP for Signup
// exports.verifyJobSeekerSignup = async (req, res) => {
//   const { email, otp } = req.body;
  
//   if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

//   try {
//     const jobSeeker = await JobSeeker.findOne({ email });
//     if (!jobSeeker) return res.status(404).json({ success: false, message: 'Job seeker not found' });

//     const otpRecord = await OTP.findOne({ email, otp });
//     if (otpRecord) {
//       await JobSeeker.updateOne({ email }, { verified: true });
//       await OTP.deleteMany({ email });
//       req.session.userType = 'jobSeeker';
//       req.session.jobSeekerId = jobSeeker._id;
//       req.session.jobSeeker = jobSeeker;
//       return res.status(200).json({ success: true, message: 'Signup successful' });
//     }
//     res.status(400).json({ success: false, message: 'Invalid OTP' });
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ success: false, message: 'Error during OTP verification' });
//   }
// };

// // Login with OTP
// exports.jobSeekerLogin = async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ success: false, message: 'email is required' });

//   try {
//     const jobSeeker = await JobSeeker.findOne({ email });
//     if (!jobSeeker || !jobSeeker.verified) return res.status(404).json({ success: false, message: 'Job seeker not registered or not verified' });

//     const otp = generateOTP();
//     await OTP.create({ email, otp });

//     res.status(200).json({ success: true, message: 'OTP sent to email' });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ success: false, message: 'Error during login' });
//   }
// };

// // Verify OTP for Login
// exports.verifyJobSeekerLogin = async (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp) return res.status(400).json({ success: false, message: 'email and OTP are required' });

//   try {
//     const jobSeeker = await JobSeeker.findOne({ email });
//     if (!jobSeeker) return res.status(404).json({ success: false, message: 'Job seeker not registered' });

//     const otpRecord = await OTP.findOne({ email, otp });
//     if (otpRecord) {
//       req.session.userType = 'jobSeeker';
//       req.session.jobSeeker = jobSeeker;
//       req.session.jobSeekerId = jobSeeker._id;
//       return res.status(200).json({ success: true, message: 'Login successful' });
//     }

//     res.status(400).json({ success: false, message: 'Invalid OTP' });
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ success: false, message: 'Error during OTP verification' });
//   }
// };

exports.jobSeekerSignup = async (req, res) => {
  const { whatsapp_number, email, full_name } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = generateOTP();

  try {
    const existingJobSeeker = await JobSeeker.findOne({ email });

    if (existingJobSeeker && existingJobSeeker.verified) {
      return res.status(400).json({ success: false, message: 'User already registered' });
    }

    await OTP.create({ email, otp });

    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify OTP and Register Job Seeker
exports.verifyJobSeekerSignup = async (req, res) => {
  const { email, otp, whatsapp_number, full_name } = req.body;

  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const existingJobSeeker = await JobSeeker.findOne({ email });

    if (!existingJobSeeker) {
      const jobSeekerData = { whatsapp_number, email, full_name, verified: true };
      await JobSeeker.create(jobSeekerData);
    } else {
      await JobSeeker.updateOne({ email }, { verified: true });
    }

    await OTP.deleteMany({ email });

    res.status(200).json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ success: false, message: 'Error during OTP verification' });
  }
};

// Login with OTP
exports.jobSeekerLogin = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const jobSeeker = await JobSeeker.findOne({ email });

    if (!jobSeeker || !jobSeeker.verified) {
      return res.status(404).json({ success: false, message: 'Job seeker not registered or not verified' });
    }

    const otp = generateOTP();
    await OTP.create({ email, otp });

    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Error during login' });
  }
};

// Verify OTP for Login
exports.verifyJobSeekerLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const jobSeeker = await JobSeeker.findOne({ email });

    if (jobSeeker) {
      req.session.userType = 'jobSeeker';
      req.session.jobSeekerId = jobSeeker._id;
      req.session.jobSeeker = jobSeeker;
      await OTP.deleteMany({ email });
      return res.status(200).json({ success: true, message: 'Login successful',data:jobSeeker });
    }

    res.status(404).json({ success: false, message: 'Job seeker not registered' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ success: false, message: 'Error during OTP verification' });
  }
};
