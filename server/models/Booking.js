/**
 * Booking model - bridal / party / HD makeup appointment requests.
 */
const mongoose = require('mongoose');

const BOOKING_STATUSES = ['pending', 'confirmed'];

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    time: {
      type: String,
      required: [true, 'Booking time is required'],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: BOOKING_STATUSES,
        message: 'Status must be either pending or confirmed',
      },
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Speeds up the admin dashboard when filtering by status or sorting by date.
bookingSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
module.exports.BOOKING_STATUSES = BOOKING_STATUSES;
