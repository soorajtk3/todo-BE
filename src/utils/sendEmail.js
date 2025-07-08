// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or any other provider like 'hotmail', 'yahoo', or a custom SMTP
  auth: {
    user: process.env.EMAIL_USER,     // e.g., your Gmail address
    pass: process.env.EMAIL_PASS      // e.g., your Gmail app password
  }
});

module.exports = transporter;
