const nodemailer = require('nodemailer');
const Connection = require('../Models/Connection'); // Adjust the path as needed

// Configure transporter (use your email service credentials securely)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // e.g. admin@example.com
    pass: process.env.MAIL_PASS, // Use environment variables
  },
});

exports.createConnection = async (req, res) => {
  try {
    const connection = new Connection(req.body);
    console.log("Connection data:", connection);
    await connection.save();

    // Extract names
    const companyName = connection.companyName; // Ensure these fields exist in your schema
    const jobseekerName = connection.jobSeekerName;
    const companyPhone = connection.companyPhone
    const phone = connection.jobSeekerPhone
    // Email content
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Connection Request',
      text: `Company "${companyName}"(${companyPhone}) wants to connect with Jobseeker "${jobseekerName}(${phone})".`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Connection created successfully',
      data: connection,
    });
  } catch (error) {
    console.error("Error creating connection:", error.message);
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
