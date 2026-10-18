/**
 * Contact controllers - website enquiry form.
 */
const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Submit a contact form message (public)
 * @route   POST /api/contact
 * @access  Public
 */
const createContact = asyncHandler(async (req, res) => {
  const { name, phone, message } = req.body;

  const contact = await Contact.create({ name, phone, message });

  // Notify the studio (non-blocking)
  sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New enquiry from ${name}`,
    html: `
      <h2>New Contact Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been sent.',
    data: contact,
  });
});

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (admin)
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

/**
 * @desc    Delete a contact message
 * @route   DELETE /api/contact/:id
 * @access  Private (admin)
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully',
  });
});

module.exports = { createContact, getContacts, deleteContact };
