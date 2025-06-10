const express = require('express');
const router = express.Router();
const { createConnection, getAllConnections,applyForJob,getAllApplications } = require('../Controllers/connection');

// Route to create a new connection
router.post('/create', createConnection);

// Route to get all connections
router.get('/all', getAllConnections);

// Route to create a new connection
router.post('/create/apply', applyForJob);

// Route to get all connections
router.get('/all/apply', getAllApplications);
module.exports = router;
