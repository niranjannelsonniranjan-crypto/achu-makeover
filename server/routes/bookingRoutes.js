/**
 * Booking routes: /api/bookings
 */
const express = require('express');
const { body, param } = require('express-validator');

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { BOOKING_SERVICES, BOOKING_STATUSES } = require('../models/Booking');

const router = express.Router();

// Reusable id validator so bad ids return 400 instead of a cast error
const idParam = [param('id').isMongoId().withMessage('Invalid booking id')];

// Validation rules for creating a booking
const createRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }).withMessage('Name is too long'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]{7,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('service')
    .isIn(BOOKING_SERVICES)
    .withMessage(`Service must be one of: ${BOOKING_SERVICES.join(', ')}`),
  body('date').isISO8601().withMessage('Date must be a valid date (YYYY-MM-DD)'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('message').optional().trim().isLength({ max: 500 }).withMessage('Message is too long'),
];

// Public
router.post('/', createRules, validate, createBooking);

// Admin only
router.get('/', protect, getBookings);
router.get('/:id', protect, idParam, validate, getBookingById);
router.put(
  '/:id',
  protect,
  [
    ...idParam,
    body('status')
      .optional()
      .isIn(BOOKING_STATUSES)
      .withMessage(`Status must be one of: ${BOOKING_STATUSES.join(', ')}`),
    body('email').optional().trim().isEmail().withMessage('Please provide a valid email'),
    body('service').optional().isIn(BOOKING_SERVICES).withMessage('Invalid service'),
  ],
  validate,
  updateBooking
);
router.delete('/:id', protect, idParam, validate, deleteBooking);

module.exports = router;
