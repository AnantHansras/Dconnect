// routes/jobRoutes.js
const express = require('express');
const {postJob, getAllJobs} = require('../Controllers/Job.js');


const router = express.Router();

router.post('/jobs', postJob);
router.get('/jobs', getAllJobs);

module.exports = router;