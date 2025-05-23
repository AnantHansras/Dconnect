const Connection = require('../Models/Connection.js');

// Create a new connection
exports.createConnection = async (req, res) => {
  try {
    const connection = new Connection(req.body);
    console.log("Connection data:", connection);
    await connection.save();

    res.status(201).json({
      success: true,
      message: 'Connection created successfully',
      data: connection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create connection',
      error: error.message,
    });
  }
};

// Get all connections
exports.getAllConnections = async (req, res) => {
  try {
    const connections = await Connection.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      message: 'Connections fetched successfully',
      data: connections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch connections',
      error: error.message,
    });
  }
};
