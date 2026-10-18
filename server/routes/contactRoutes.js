/**
 * Contact routes: /api/contact
 */
const express = require('express');
const { body, param } = require('express-validator');

const {
  createContact,
  getContacts,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

// Public - submit the contact form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }).withMessage('Name is too long'),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^[0-9+\-\s()]{7,15}$/)
      .withMessage('Please provide a valid phone number'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 1000 })
      .withMessage('Message cannot exceed 1000 characters'),
  ],
  validate,
  createContact
);

// Admin only
router.get('/', protect, getContacts);
router.delete(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid contact id')],
  validate,
  deleteContact
);

module.exports = router;
