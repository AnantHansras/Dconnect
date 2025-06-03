const nodemailer = require('nodemailer');
const Connection = require('../Models/Connection'); // Adjust the path as needed

const transporter = nodemailer.createTransport({
  service: "gmail", // Or your SMTP provider
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.createConnection = async (req, res) => {
  try {
    const connection = new Connection(req.body);
    console.log("Connection data:", connection);
    await connection.save();

    // Extract data
    const companyName = connection.companyName;
    const jobseekerName = connection.jobSeekerName;
    const companyPhone = connection.companyPhone;
    const phone = connection.jobSeekerPhone;

    // Define mail options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Connection Request",
      text: `Company "${companyName}" (${companyPhone}) wants to connect with Jobseeker "${jobseekerName}" (${phone}).`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>New Connection Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px;">
            <h2 style="text-align: center; color: #333;">📢 New Connection Request</h2>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Phone:</strong> ${companyPhone}</p>
            <p>wants to connect with</p>
            <p><strong>Jobseeker:</strong> ${jobseekerName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
            <p style="text-align: center;">Please respond accordingly to initiate the connection.</p>
            <p style="text-align: center; color: #aaa; font-size: 14px;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(201).json({
      success: true,
      message: "Connection created successfully",
      data: connection,
    });
  } catch (error) {
    console.error("Error creating connection:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to create connection",
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
