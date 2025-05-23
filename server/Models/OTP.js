const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const otpTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">DConnect</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #333;">Your OTP Code</h2>
          <p style="font-size: 16px; color: #555;">
            Use the code below to complete your verification. This code is valid for <strong>5 minutes</strong>.
          </p>
          <div style="font-size: 32px; font-weight: bold; color: #4A90E2; margin: 20px 0;">${otp}</div>
          <p style="font-size: 14px; color: #999;">If you did not request this, please ignore this email.</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} DConnect. All rights reserved.
        </div>
      </div>
    </div>
  `;
};

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                connectionTimeout: 90000,
                port: 465,
                secure: true,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })
            let info = await transporter.sendMail({
                from: 'chitChat',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}

const sendVerificationEmail = async (email, otp) => {
  try {
    await mailSender(email, 'Verification Email', otpTemplate(otp));
  } catch (error) {
    console.log('Error occurred while sending verification email:', error);
    throw error;
  }
};

OTPSchema.pre('save', async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model('OTP', OTPSchema);
