# Achu Bridal Studio - Backend

## Overview
This is the backend API for the Achu Bridal Studio website. It's built with Node.js, Express.js, and MongoDB.

## Structure
```
backend/
├── server.js          # Express server entry point
├── config/            # Database configuration
├── controllers/       # Route controllers
├── models/            # Mongoose models
├── routes/            # API routes
├── middleware/        # Express middleware
├── utils/             # Utility functions
└── package.json       # Dependencies
```

## Installation
```bash
npm install
```

## How to Run

### Option 1: Using start-app.cmd (from root)
1. Go to the project root
2. Double-click `start-app.cmd`
3. MongoDB and server will start automatically

### Option 2: Manual startup
1. Start MongoDB (if not running)
2. Run the server:
```bash
node server.js
```
Server will run on port 5000

## API Endpoints

### Booking
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get single booking (admin)
- `PUT /api/bookings/:id` - Update booking (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Contact
- `POST /api/contact` - Submit enquiry
- `GET /api/contact` - Get all enquiries (admin)

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current admin (authenticated)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

## Environment Variables
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (default: development)
- `JWT_SECRET` - JWT secret for authentication
- `EMAIL_USER` - Email for notifications
- `EMAIL_PASS` - Email password
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port

## Admin Credentials
- Email: admin@achubridal.com
- Password: Admin@12345

## Dependencies
- express
- mongoose
- cors
- dotenv
- express-validator
- jsonwebtoken
- bcryptjs
- nodemailer
- morgan
