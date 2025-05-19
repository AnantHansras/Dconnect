const express = require('express');
const otpGenerator = require('otp-generator');
const mongoose = require('mongoose');

const OTP = require('../Models/OTP');
const Company = require('../Models/company');

// Generate OTP
const generateOTP = () => {
  return otpGenerator.generate(6,{
            specialChars:false,
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false
        });
};

// Signup with OTP
exports.signup = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = generateOTP();
  try {
    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res.status(400).json({ success: false, message: 'User already registered' });
    }

    await OTP.create({ email, otp });
    res.status(200).json({ success: true, message: 'OTP sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify OTP for Signup
exports.verifySignup = async (req, res) => {
  const { email, otp, name, phone, companyName, location } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (otpRecord) {
      const existingCompany = await Company.findOne({ email });

      if (!existingCompany) {
        await Company.create({ name, phone, email, companyName, location});
      } else {
        await Company.updateOne({ email });
      }

      await OTP.deleteMany({ email });
      req.session.userType = 'company';
      req.session.companyId = existingCompany ? existingCompany._id : null;

      return res.status(200).json({ success: true, message: 'Signup successful' });
    }

    res.status(400).json({ success: false, message: 'Invalid OTP' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ success: false, message: 'Error during OTP verification' });
  }
};

// Login with OTP
exports.login = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({success:false, message: 'Email is required' });

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({success:false, message: 'Company not registered' });

    const otp = generateOTP();
    await OTP.create({ email, otp });

    res.status(200).json({success:true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({success:false, message: 'Error during login' });
  }
};

// Verify OTP for Login
exports.verifyLogin = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({success:false, message: 'Email and OTP are required' });

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({success:false, message: 'Company not found' });

    const otpRecord = await OTP.findOne({ email, otp });
    if (otpRecord) {
      req.session.userType = 'company';
      req.session.company = company;
      req.session.companyId = company._id;
      return res.status(200).json({success:true, message: 'Login successful' });
    }

    res.status(400).json({success:false, message: 'Invalid OTP' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({success:false, message: 'Error during OTP verification' });
  }
};
