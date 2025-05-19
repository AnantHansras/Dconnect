const express = require('express');
const router = express.Router();
const { jobSeekerSignup, verifyJobSeekerSignup, jobSeekerLogin, verifyJobSeekerLogin } = require('../Controllers/jobseekerauth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
// Signup Route
// router.post('/signup',upload.fields([
//   { name: 'aadhar_image', maxCount: 1 },
//   { name: 'profile_image', maxCount: 1 }
// ]), jobSeekerSignup);

router.post('/signup', jobSeekerSignup);

// Verify Signup OTP Route
router.post('/verify-signup', verifyJobSeekerSignup);

// Login Route
router.post('/login', jobSeekerLogin);

// Verify Login OTP Route
router.post('/verify-login', verifyJobSeekerLogin);

module.exports = router;