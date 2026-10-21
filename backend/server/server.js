/**
 * Achu Bridal Studio - Application entry point.
 * Boots Express, connects to MongoDB Atlas and mounts all API routes.
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route modules
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

/* ------------------------------ Middleware ------------------------------ */
app.use(cors()); // Allow the website (any origin) to call this API
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form bodies

// Request logging only outside production to keep prod logs clean
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

/* -------------------------------- Routes -------------------------------- */

// Simple health check so you can verify the server is alive
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Achu Bridal Studio API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);

/* --------------------------- Error handling ---------------------------- */
// 404 handler + centralised error handler (must be registered last)
app.use(notFound);
app.use(errorHandler);

/* ------------------------------- Startup ------------------------------- */
const PORT = process.env.PORT || 5000;

// Only start the server if this file is run directly (not imported by Vercel)
if (require.main === module) {
  const startServer = async () => {
    // Fail fast if the database is unreachable
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  };

  startServer();
}

// Safety net: log (and in production, exit) on unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled rejection: ${err.message}`);
  if (process.env.NODE_ENV === 'production') process.exit(1);
});

module.exports = app;
