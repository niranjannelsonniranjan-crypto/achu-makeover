// Vercel serverless function for contact form
const mongoose = require('mongoose');

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

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true }
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = async (req, res) => {
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

      const { name, phone, message } = req.body;

      const contact = await Contact.create({
        name,
        phone,
        message,
      });

      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: contact,
      });
    } catch (error) {
      console.error('Contact error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message',
        error: error.message,
      });
    }
  } else if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const contacts = await Contact.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch messages',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
