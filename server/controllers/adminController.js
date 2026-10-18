/**
 * Admin controllers - one-time registration and login.
 */
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('../middleware/asyncHandler');

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

module.exports = { registerAdmin, loginAdmin, getMe };
