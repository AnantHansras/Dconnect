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
  return `<h1>Your OTP Code</h1><p>Your OTP code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`;
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
