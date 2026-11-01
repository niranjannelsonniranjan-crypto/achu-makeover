/**
 * Admin controllers - one-time registration and login.
 */
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendEmail');

// Sign a JWT for an admin document
const generateToken = (adminId) =>
  jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

/**
 * @desc    Register the (single) admin account
 * @route   POST /api/admin/register
 * @access  Public - works only once, while no admin exists
 */
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // One-time registration guard
  const adminExists = await Admin.findOne();
  if (adminExists) {
    return res.status(403).json({
      success: false,
      message: 'Admin already registered. Registration is disabled.',
    });
  }

  const admin = await Admin.create({ email, password });

  return res.status(201).json({
    success: true,
    message: 'Admin registered successfully',
    data: {
      _id: admin._id,
      email: admin.email,
    },
    token: generateToken(admin._id),
  });
});

/**
 * @desc    Login and receive a JWT
 * @route   POST /api/admin/login
 * @access  Public
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Explicitly select the password (excluded by default in the schema)
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      _id: admin._id,
      email: admin.email,
    },
    token: generateToken(admin._id),
  });
});

/**
 * @desc    Get the currently logged-in admin
 * @route   GET /api/admin/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.admin });
});

/**
 * @desc    Reset admin password
 * @route   POST /api/admin/reset-password
 * @access  Public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Email and new password are required',
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    });
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: 'Admin not found with this email',
    });
  }

  admin.password = newPassword;
  await admin.save();

  // Send confirmation email
  const subject = 'Password Reset Confirmation - Achu Bridal Studio';
  const text = `Your password has been successfully reset for Achu Bridal Studio Admin Panel. If you did not request this change, please contact support immediately.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #D48A7E;">Password Reset Confirmation</h2>
      <p style="color: #4A3B3B;">Your password has been successfully reset for Achu Bridal Studio Admin Panel.</p>
      <p style="color: #6B5B5B;">If you did not request this change, please contact support immediately.</p>
      <p style="color: #4A3B3B; margin-top: 20px;">Thank you,<br>Achu Bridal Studio Team</p>
    </div>
  `;

  await sendEmail({ to: email, subject, text, html });

  return res.status(200).json({
    success: true,
    message: 'Password reset successfully. Please login with your new password.',
  });
});

module.exports = { registerAdmin, loginAdmin, getMe, resetPassword };
