const express = require('express');
const router = express.Router();
const { signup, verifySignup, login, verifyLogin } = require('../Controllers/companyauth');

// Signup Route
router.post('/signup', signup);

// Verify Signup OTP Route
router.post('/verify-signup', verifySignup);

// Login Route
router.post('/login', login);

// Verify Login OTP Route
router.post('/verify-login', verifyLogin);

module.exports = router;