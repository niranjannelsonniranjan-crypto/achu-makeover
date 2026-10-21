/**
 * Booking controllers - public booking creation + admin management.
 */
const Booking = require('../models/Booking');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Create a new booking request (public)
 * @route   POST /api/bookings
 * @access  Public
 */
const createBooking = asyncHandler(async (req, res) => {
  const { name, phone, email, service, date, time, message } = req.body;

  const booking = await Booking.create({
    name,
    phone,
    email,
    service,
    date,
    time,
    message,
  });

  // Notify the studio. Fire-and-forget: a mail failure must not fail the booking.
  sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New ${service} booking - ${name}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Message:</strong> ${message || '-'}</p>
    `,
  });

  res.status(201).json({
    success: true,
    message: 'Booking request submitted successfully. We will contact you shortly.',
    data: booking,
  });
});

/**
 * @desc    Get all bookings (optionally filter by status)
 * @route   GET /api/bookings?status=pending
 * @access  Private (admin)
 */
const getBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const bookings = await Booking.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

/**
 * @desc    Get a single booking by id
 * @route   GET /api/bookings/:id
 * @access  Private (admin)
 */
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.status(200).json({ success: true, data: booking });
});

/**
 * @desc    Update a booking (typically the status: pending -> confirmed)
 * @route   PUT /api/bookings/:id
 * @access  Private (admin)
 */
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Only allow whitelisted fields to be updated
  const allowed = ['name', 'phone', 'email', 'service', 'date', 'time', 'message', 'status'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) booking[field] = req.body[field];
  });

  const updated = await booking.save();

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: updated,
  });
});

/**
 * @desc    Delete a booking
 * @route   DELETE /api/bookings/:id
 * @access  Private (admin)
 */
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Booking deleted successfully',
  });
});

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
