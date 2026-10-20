// Vercel serverless function for bookings
const mongoose = require('mongoose');

// MongoDB connection (using environment variable)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/achu-bridal';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Booking schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  service: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  time: { type: String, required: true, trim: true },
  message: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      await connectToDatabase();

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

      res.status(201).json({
        success: true,
        message: 'Booking request submitted successfully',
        data: booking,
      });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit booking',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
