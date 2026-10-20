# Achu Bridal Studio - Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [How to Run the Project](#how-to-run-the-project)
5. [Services Offered](#services-offered)
6. [Responsive Design](#responsive-design)
7. [Backend Configuration](#backend-configuration)
8. [Booking System](#booking-system)
9. [Admin Panel](#admin-panel)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Contact Information](#contact-information)

---

## Project Overview

**Project Name:** Achu Bridal Studio  
**Location:** Trichy, Tamil Nadu  
**Type:** Bridal Makeup Studio Website  
**Version:** 1.0  
**Last Updated:** October 20, 2026

### Description
Achu Bridal Studio is a luxury bridal makeup studio in Trichy, Tamil Nadu, specializing in traditional and contemporary bridal looks. This project includes a responsive website with booking functionality, admin panel, and service management.

### Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local)
- **Hosting:** Vercel (Frontend), Local (Backend)

---

## Project Structure

```
achu-bridal/
├── index.html              # Main website (frontend)
├── admin.html              # Admin panel for managing bookings
├── start-app.cmd           # Script to start MongoDB and server
├── server/                 # Backend API
│   ├── server.js          # Express server entry point
│   ├── config/            # Database configuration
│   │   └── db.js         # MongoDB connection
│   ├── controllers/       # Route controllers
│   │   ├── adminController.js
│   │   ├── bookingController.js
│   │   ├── contactController.js
│   │   └── serviceController.js
│   ├── models/            # Mongoose models
│   │   ├── Admin.js
│   │   ├── Booking.js
│   │   ├── Contact.js
│   │   └── Service.js
│   ├── routes/            # API routes
│   │   ├── adminRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── contactRoutes.js
│   │   └── serviceRoutes.js
│   ├── middleware/        # Express middleware
│   │   ├── asyncHandler.js
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   ├── utils/             # Utility functions
│   │   └── sendEmail.js
│   └── package.json       # Backend dependencies
├── .tools/                # Local development tools
│   ├── mongodb-win32-x86_64-windows-8.0.34/
│   ├── mongodb-data/      # Local MongoDB data
│   ├── mongodb-logs/      # MongoDB logs
│   └── node/             # Local Node.js installation
├── package.json           # Root package.json
├── vercel.json           # Vercel configuration
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## Features

### Frontend Features
1. **Responsive Design**
   - Mobile hamburger menu (appears on screens < 768px)
   - 6 breakpoints for different screen sizes
   - Smooth scrolling navigation
   - Touch-friendly buttons and inputs

2. **Services Display**
   - 20 comprehensive services shown on front page
   - Each service with title and description
   - Beautiful card layout
   - Responsive grid system

3. **Booking Form**
   - Full name, phone, email fields
   - Service selection (3 options)
   - Date and time picker
   - Optional message field
   - Form validation
   - Success/error alerts

4. **Contact Form**
   - Name and phone fields
   - Message field
   - Form validation
   - WhatsApp integration

5. **Gallery**
   - 4 bridal makeup images
   - Responsive grid layout
   - Lazy loading for performance

6. **Additional Features**
   - WhatsApp floating button
   - Call-to-action sections
   - SEO meta tags
   - Footer with contact information

### Backend Features
1. **Booking API**
   - POST /api/bookings - Create booking
   - GET /api/bookings - Get all bookings (admin)
   - GET /api/bookings/:id - Get single booking (admin)
   - PUT /api/bookings/:id - Update booking (admin)
   - DELETE /api/bookings/:id - Delete booking (admin)

2. **Contact API**
   - POST /api/contact - Submit enquiry
   - GET /api/contact - Get all enquiries (admin)

3. **Admin API**
   - POST /api/admin/login - Admin authentication
   - GET /api/admin/me - Get current admin

4. **Service API**
   - GET /api/services - Get all services
   - POST /api/services - Create service (admin)
   - PUT /api/services/:id - Update service (admin)
   - DELETE /api/services/:id - Delete service (admin)

---

## How to Run the Project

### Prerequisites
- Windows operating system
- Local MongoDB installation (included in .tools folder)
- Local Node.js installation (included in .tools folder)

### Step 1: Start MongoDB (Local)
1. Open the project folder: `C:\New folder\Achu bridal`
2. Double-click `start-app.cmd`
3. The script will automatically:
   - Start MongoDB on port 27017
   - Start the Express server on port 5000
4. Keep the command window open while using the website

### Step 2: Open the Website
1. Open `index.html` in your web browser
2. Or navigate to: `http://localhost:5000` (if serving)
3. The website will load with all features

### Step 3: Access Admin Panel
1. Open `admin.html` in your web browser
2. Login with credentials:
   - Email: `admin@achubridal.com`
   - Password: `Admin@12345`
3. You can now manage bookings and enquiries

### Step 4: Stop the Server
1. Go to the command window where `start-app.cmd` is running
2. Press `Ctrl + C`
3. MongoDB and server will stop

---

## Services Offered

The studio offers 20 comprehensive services:

### Bridal Services
1. **Bridal Makeup**
   - Complete bridal makeup for wedding, reception, engagement
   - HD, Airbrush & Traditional techniques available

2. **Engagement Makeup**
   - Specialized makeup for engagement ceremonies
   - Long-lasting and photo-ready

3. **Reception Makeup**
   - Glamorous makeup for wedding reception
   - Bold and elegant looks

4. **Groom Makeup**
   - Groom makeup and grooming for wedding ceremonies
   - Natural and subtle enhancement

5. **Bridal Packages**
   - Complete bridal packages including makeup, hair and draping
   - All-in-one solution

6. **Family Makeup**
   - Makeup services for family members at weddings
   - Group booking available

7. **Trial Makeup**
   - Pre-wedding makeup trial to find your perfect look
   - Consultation included

### Party & Event Services
8. **Party Makeup**
   - Glamorous makeup for parties, sangeet, mehendi
   - Trendy and stylish

9. **Party Packages**
   - Party-ready makeup and styling packages
   - Perfect for special occasions

### Makeup Techniques
10. **HD Makeup**
    - High-definition makeup for photoshoots, portfolio and events
    - Camera-ready and flawless

11. **Airbrush Makeup**
    - Flawless, long-lasting airbrush makeup
    - Perfect coverage and lightweight feel

### Hair Services
12. **Hair Styling**
    - Professional hair styling for weddings, parties and events
    - Modern and traditional styles

13. **Bridal Hair**
    - Complete bridal hair styling including bun, braids and modern looks
    - Elaborate and elegant

14. **Saree Draping**
    - Expert saree draping in South Indian, North Indian and modern styles
    - Perfect pleats and pallu placement

### Skincare & Beauty
15. **Pre-Bridal Skincare**
    - Custom skincare packages for glowing skin before the wedding
    - Facial and treatment plans

16. **Facial Treatments**
    - Rejuvenating facials for radiant and healthy skin
    - Various skin types catered

17. **Threading**
    - Precision threading for clean and sharp eyebrows
    - Professional and painless

18. **Waxing**
    - Full body waxing services for smooth skin
    - Gentle and effective

19. **Manicure & Pedicure**
    - Luxury hand and foot care treatments
    - Relaxing and beautifying

### Traditional Services
20. **Mehandi**
    - Traditional and modern mehandi designs for brides
    - Intricate and artistic

---

## Responsive Design

The website is fully responsive with 6 breakpoints:

### 1. Large Desktop (1400px+)
- Large fonts (38px headings)
- Spacious layouts
- Maximum impact

### 2. Desktop (1200px - 1399px)
- Standard desktop layout
- Balanced spacing
- Optimal readability

### 3. Tablet (768px - 1024px)
- Wrapped navigation
- Adjusted font sizes
- Touch-friendly

### 4. Large Phone (600px - 767px)
- Mobile hamburger menu appears
- Stacked layouts
- Single-column forms
- Optimized touch targets

### 5. Small Phone (480px - 599px)
- Compact fonts
- Tighter spacing
- Minimal design

### 6. Extra Small Phone (<360px)
- Ultra-compact layout
- Smallest fonts
- Essential elements only

### Mobile Features
- Hamburger menu with toggle animation
- Menu slides down when clicked
- Closes when clicking links or outside
- Smooth scroll behavior
- Hover effects disabled on touch devices

---

## Backend Configuration

### MongoDB Connection
- **Host:** Local MongoDB (127.0.0.1)
- **Port:** 27017
- **Database:** achu-bridal
- **Location:** .tools/mongodb-data

### Server Configuration
- **Port:** 5000
- **Environment:** Development
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose

### API Endpoints

#### Booking Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get single booking (admin only)
- `PUT /api/bookings/:id` - Update booking (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

#### Contact Endpoints
- `POST /api/contact` - Submit enquiry
- `GET /api/contact` - Get all enquiries (admin only)

#### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current admin (authenticated)

#### Service Endpoints
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Authentication
- **Method:** JWT (JSON Web Tokens)
- **Token Storage:** LocalStorage
- **Expiration:** Configurable
- **Protected Routes:** Admin routes

---

## Booking System

### Booking Process

1. **User Submits Booking**
   - Fills out booking form
   - Selects service (Bridal, Party, or HD Makeup)
   - Chooses date and time
   - Adds optional message
   - Submits form

2. **Backend Processing**
   - Validates input
   - Saves to MongoDB
   - Sends email notification (if configured)
   - Returns success message

3. **Admin Management**
   - Admin logs in to admin panel
   - Views all bookings
   - Can confirm or delete bookings
   - Can update booking details

### Booking Fields
- **Name** (required, max 80 characters)
- **Phone** (required, validated format)
- **Email** (required, validated email)
- **Service** (required, enum: Bridal, Party, HD Makeup)
- **Date** (required, must be future date)
- **Time** (required)
- **Message** (optional, max 500 characters)
- **Status** (auto-set to 'pending')

### Booking Status
- **Pending** - Initial status
- **Confirmed** - After admin approval

### Email Notifications
- Booking requests sent to studio email
- Includes all booking details
- Formatted HTML email
- Configured via environment variables

---

## Admin Panel

### Admin Credentials
- **Email:** admin@achubridal.com
- **Password:** Admin@12345

### Admin Features

#### Dashboard
- Statistics overview
- Total bookings count
- Pending bookings count
- Confirmed bookings count
- Messages count

#### Bookings Management
- View all bookings
- Filter by status (All, Pending, Confirmed)
- Confirm pending bookings
- Delete bookings
- View booking details
- WhatsApp integration for customer contact

#### Messages Management
- View all enquiries
- Delete messages
- WhatsApp integration

#### Authentication
- Secure login with JWT
- Session management
- Auto-logout on token expiration

### Admin Panel Layout
- Responsive design
- Table-based data display
- Mobile-friendly (hides Service column on tablet)
- Action buttons for each booking
- Status badges (pending/confirmed)

---

## Deployment

### Current Deployment
- **Frontend:** Vercel (https://achu-makeover.vercel.app)
- **Backend:** Local only (runs on port 5000)
- **Database:** Local MongoDB

### Vercel Deployment
- **Automatic:** Triggered on git push to main branch
- **Configuration:** vercel.json
- **Build:** Static HTML hosting
- **Custom Domain:** achu-makeover.vercel.app

### Local Deployment
- **MongoDB:** Included in .tools folder
- **Node.js:** Included in .tools folder
- **Startup:** start-app.cmd script
- **Port:** 5000

### Environment Variables
Currently no environment variables needed for local deployment.

### Git Repository
- **Platform:** GitHub
- **URL:** https://github.com/niranjannelsonniranjan-crypto/achu-makeover
- **Branch:** main

---

## Troubleshooting

### MongoDB Won't Start
**Problem:** MongoDB fails to start  
**Solution:**
1. Check if port 27017 is already in use
2. Delete .tools/mongodb-data folder to reset database
3. Check .tools/mongodb-logs for error messages
4. Restart start-app.cmd

### Server Won't Start
**Problem:** Express server fails to start  
**Solution:**
1. Check if port 5000 is already in use
2. Run `cd server && npm install` to ensure dependencies
3. Check server logs for errors
4. Verify MongoDB is running first

### Booking Form Not Working
**Problem:** Form submission fails  
**Solution:**
1. Ensure server is running (port 5000)
2. Check browser console for errors
3. Verify MongoDB is connected
4. Check network tab in browser dev tools

### Mobile Menu Not Working
**Problem:** Hamburger menu doesn't open  
**Solution:**
1. Check if JavaScript is enabled
2. Verify browser compatibility
3. Check console for JavaScript errors
4. Ensure CSS is loaded correctly

### Responsive Design Issues
**Problem:** Layout breaks on certain screen sizes  
**Solution:**
1. Clear browser cache (Ctrl+F5)
2. Test in different browsers
3. Check viewport meta tag
4. Verify CSS is loaded

### Admin Panel Login Fails
**Problem:** Cannot login to admin panel  
**Solution:**
1. Verify credentials: admin@achubridal.com / Admin@12345
2. Check if server is running
3. Verify MongoDB connection
4. Check if JWT_SECRET is set

### Vercel Deployment Issues
**Problem:** Site not updating on Vercel  
**Solution:**
1. Verify git push was successful
2. Check Vercel dashboard for deployment status
3. Review deployment logs for errors
4. Manual redeploy if needed

---

## Contact Information

### Studio Details
- **Name:** Achu Bridal Studio
- **Location:** Thillai Nagar, Trichy, Tamil Nadu
- **Phone:** +91 78069 86448
- **Email:** contact@achubridalstudio.com

### Social Media
- **Instagram:** Instagram
- **Facebook:** Facebook
- **Pinterest:** Pinterest

### WhatsApp
- **Direct Chat:** https://wa.me/917806986448
- **Floating Button:** Available on website

---

## File Details

### index.html
- **Size:** ~25 KB
- **Purpose:** Main website frontend
- **Sections:** Hero, Services, Gallery, Booking, Contact, CTA, Footer
- **Features:** Responsive design, mobile menu, booking form, contact form

### admin.html
- **Size:** ~22 KB
- **Purpose:** Admin panel for managing bookings
- **Features:** Dashboard, booking management, message management, authentication

### server/server.js
- **Purpose:** Express server entry point
- **Port:** 5000
- **Features:** API routing, error handling, MongoDB connection

### server/models/Booking.js
- **Purpose:** Booking data model
- **Fields:** name, phone, email, service, date, time, message, status
- **Validation:** Required fields, length limits

### server/models/Contact.js
- **Purpose:** Contact enquiry model
- **Fields:** name, phone, message
- **Validation:** Required fields

### server/models/Admin.js
- **Purpose:** Admin user model
- **Fields:** name, email, password
- **Security:** Password hashed with bcrypt

### server/models/Service.js
- **Purpose:** Service catalog model
- **Fields:** title, price, description, category, imageUrl, isActive
- **Features:** Dynamic service loading

---

## Development Notes

### Code Style
- JavaScript: Vanilla ES6+
- CSS: Custom CSS with responsive breakpoints
- HTML5: Semantic markup
- No frameworks used

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lazy loading for images
- Minimal JavaScript
- Optimized CSS
- No external dependencies for frontend

### Security
- Password hashing with bcrypt
- JWT authentication for admin
- Input validation with express-validator
- SQL injection prevention (MongoDB)
- XSS prevention with HTML escaping

---

## Summary

Achu Bridal Studio is a complete bridal makeup studio website with:
- ✅ Responsive design for all devices
- ✅ 20 comprehensive services displayed
- ✅ Booking system with 3 service options
- ✅ Admin panel for management
- ✅ Local MongoDB database
- ✅ Express.js backend API
- ✅ Beautiful and modern UI
- ✅ Mobile-friendly navigation
- ✅ WhatsApp integration
- ✅ SEO optimized

The project is designed to be run locally for full functionality, with the frontend deployed on Vercel for easy access. All booking and admin features require the local backend to be running via start-app.cmd.

---

## Quick Reference

### Start Project
```
Double-click: start-app.cmd
Open in browser: index.html
```

### Admin Login
```
Email: admin@achubridal.com
Password: Admin@12345
```

### Stop Project
```
Press: Ctrl + C in command window
```

### Live Site
```
https://achu-makeover.vercel.app
```

### GitHub Repository
```
https://github.com/niranjannelsonniranjan-crypto/achu-makeover
```

---

**Document Version:** 1.0  
**Last Updated:** October 20, 2026  
**Author:** Devin AI Assistant
