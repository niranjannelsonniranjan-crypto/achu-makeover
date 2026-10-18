/**
 * Nodemailer helper - sends transactional emails via the configured
 * EMAIL_USER / EMAIL_PASS credentials (Gmail App Password recommended).
 */
const nodemailer = require('nodemailer');

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

/**
 * Send an email. Returns null (and logs) when email is not configured,
 * so the API never fails because of a mail problem.
 */
const sendEmail = async ({ to, subject, html, text }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email skipped: EMAIL_USER / EMAIL_PASS are not configured.');
    return null;
  }

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Achu Bridal Studio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.error(`Email send failed: ${error.message}`);
    return null;
  }
};

module.exports = sendEmail;
