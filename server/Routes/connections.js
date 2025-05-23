const express = require('express');
const router = express.Router();
const { createConnection, getAllConnections } = require('../Controllers/connection');

// Route to create a new connection
router.post('/create', createConnection);

// Route to get all connections
router.get('/all', getAllConnections);

module.exports = router;
