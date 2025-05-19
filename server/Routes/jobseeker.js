const express = require('express');
const router = express.Router();
const {getJobSeekers} = require('../Controllers/Jobseeker');



router.get('/search', getJobSeekers);

module.exports = router;
