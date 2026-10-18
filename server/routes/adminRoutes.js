/**
 * Admin auth routes: /api/admin
 */
const express = require('express');
const { body } = require('express-validator');

const { registerAdmin, loginAdmin, getMe } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

const credentialsRules = [
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// One-time registration (blocked automatically if an admin already exists)
router.post('/register', credentialsRules, validate, registerAdmin);

// Login -> returns JWT
router.post('/login', credentialsRules, validate, loginAdmin);

// Current admin profile
router.get('/me', protect, getMe);

module.exports = router;
