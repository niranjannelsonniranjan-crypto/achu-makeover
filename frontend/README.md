# Achu Bridal Studio - Frontend

## Overview
This is the frontend for the Achu Bridal Studio website. It contains the HTML files for the main website and admin panel.

## Files
- `index.html` - Main website with responsive design
- `admin.html` - Admin panel for managing bookings
- `package.json` - Frontend dependencies

## How to Run

### Option 1: Open Directly
1. Open `index.html` in your web browser
2. The site will load with all features

### Option 2: Using Serve (for development)
```bash
npm install -g serve
npm run serve
```
Then visit: http://localhost:3000

## Features
- Responsive design (mobile-friendly)
- 20 services displayed
- Booking form
- Contact form
- WhatsApp integration
- Beautiful UI

## Backend Connection
The frontend connects to the backend API at:
- Local: `http://localhost:5000/api`
- The backend must be running for forms to work

## Deployment
The frontend is deployed on Vercel at:
https://achu-makeover.vercel.app
