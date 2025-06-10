const nodemailer = require('nodemailer');
const Connection = require('../Models/Connection'); // Adjust the path as needed
const JobApplication = require('../Models/Connection');
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Connection Request</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, sans-serif;
      background-color: #f3f4f6;
      padding: 30px;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header {
      background-color: #10b981;
      color: white;
      padding: 24px 30px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
      background-color: #f4f4f4;
    }
    .content p {
      font-size: 16px;
      color: #374151;
      margin: 10px 0;
    }
    .content strong {
      color: #111827;
    }
    .divider {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📢 New Connection Request</h2>
    </div>
    <div class="content">
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Phone:</strong> ${companyPhone}</p>
      <p style="margin: 16px 0;">wants to connect with</p>
      <p><strong>Jobseeker:</strong> ${jobseekerName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr class="divider" />
      <p style="text-align: center;">Please respond accordingly to initiate the connection.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`

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


exports.applyForJob = async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    console.log("Application data:", application);
    await application.save();

    // Extract data
    const jobseekerName = application.jobSeekerName;
    const jobseekerPhone = application.jobSeekerPhone;
    const companyPhone = application.companyPhone;
    const companyName = application.companyName;

    // Define mail options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Job Application",
      text: `Jobseeker "${jobseekerName}" (${jobseekerPhone}) has applied for "${companyPhone}" at "${companyName}".`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Job Application</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, sans-serif;
      background-color: #f3f4f6;
      padding: 30px;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header {
      background-color: #3b82f6;
      color: white;
      padding: 24px 30px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
      background-color: #f4f4f4;
    }
    .content p {
      font-size: 16px;
      color: #333;
      margin: 8px 0;
    }
    .content strong {
      color: #111827;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #9ca3af;
    }
    .divider {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📝 New Job Application</h2>
    </div>
    <div class="content">
      <p><strong>Jobseeker:</strong> ${jobseekerName}</p>
      <p><strong>Phone:</strong> ${jobseekerPhone}</p>
       <p style="margin: 16px 0;">Applied for</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Phone:</strong> ${companyPhone}</p>
      <hr class="divider" />
      <p style="text-align: center;">Please review and take necessary action.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`,

    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error submitting application:", error.message);
    res.status(400).json({
      success: false,
      message: "Failed to apply for job",
      error: error.message,
    });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      message: 'Applications fetched successfully',
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    });
  }
};
