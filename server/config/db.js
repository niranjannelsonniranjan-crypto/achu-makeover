/**
 * MongoDB connection helper (Mongoose + MongoDB Atlas).
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined. Add it to your .env file.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Without a database the API is useless - stop the process.
    process.exit(1);
  }
};

module.exports = connectDB;
