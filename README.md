# Achu Bridal Studio

Luxury Bridal Makeup Studio in Trichy, Tamil Nadu.

## 🚀 Deployment Strategy (Free Tier Compatible)

Since Vercel free plan has limitations with backend APIs, we use a split deployment:

- **Frontend**: Vercel (static HTML/CSS/JS) - FREE
- **Backend API**: Render (Node.js server) - FREE
- **Database**: MongoDB Atlas - FREE

### Step 1: Deploy Backend API on Render

1. Go to https://render.com and create a free account
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `niranjannelsonniranjan-crypto/achu-makeover`
4. Configure:
   - **Name**: achu-makeover-api
   - **Branch**: main
   - **Root Directory**: server
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/achu-bridal?retryWrites=true&w=majority
   NODE_ENV=production
   JWT_SECRET=your-random-secret-string
   EMAIL_USER=your-email@gmail.com (optional)
   EMAIL_PASS=your-app-password (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   ```
6. Click "Deploy Web Service"
7. Wait for deployment - you'll get a URL like: `https://achu-makeover-api.onrender.com`

### Step 2: Update Frontend API URL

1. Edit `index.html` line 339:
   ```javascript
   const LIVE_API = "https://achu-makeover-api.onrender.com/api";
   ```
2. Commit and push changes to GitHub

### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com and open your project
2. The deployment should trigger automatically
3. If not, click "Redeploy"
4. Your site will be at: https://achu-makeover.vercel.app

### MongoDB Setup (Free Tier)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create a database user with username/password
5. Network Access → Whitelist IP: `0.0.0.0/0` (allows all IPs)
6. Get your connection string from "Connect" → "Connect your application"
7. Use this in Render's MONGO_URI environment variable

### Email Setup (Optional - for booking notifications)

1. Create a Gmail account
2. Enable 2-factor authentication
3. Generate an App Password at https://myaccount.google.com/apppasswords
4. Use the app password in EMAIL_PASS (not your regular password)

### Admin Credentials
Default admin login:
- Email: admin@achubridal.com
- Password: Admin@12345

## 📁 Project Structure
```
achu-bridal/
├── index.html              # Frontend (static HTML)
├── admin.html              # Admin panel
├── server/                 # Backend API
│   ├── server.js          # Express server
│   ├── config/            # Database config
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── middleware/        # Express middleware
├── render.yaml            # Render configuration (optional)
└── vercel.json           # Vercel configuration (minimal)
```

## 🛠️ Local Development

### Start MongoDB (if using local)
```bash
cd .tools/mongodb-win32-x86_64-windows-8.0.34/bin
mongod.exe --dbpath ../../mongodb-data --port 27017
```

### Start Server
```bash
cd server
npm install
npm run dev
```

Open `index.html` in your browser.

## 📱 Features
- Service booking system
- Contact form
- Admin panel for managing bookings
- Responsive design (mobile-friendly)
- Dynamic service loading from database
- Free tier deployment on Vercel + Render

## 💰 Cost Breakdown (All FREE)
- Vercel (Frontend): $0/month
- Render (Backend): $0/month (free tier)
- MongoDB Atlas (Database): $0/month (M0 free tier)
- **Total**: $0/month

## 🔧 Troubleshooting

### Backend not responding on Render?
- Render free tier spins down after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- This is normal for free tier

### Booking not working?
- Check Render dashboard for logs
- Verify MONGO_URI is correct
- Ensure MongoDB Atlas allows all IPs (0.0.0.0/0)

### Frontend not updating?
- Vercel auto-deploys on git push
- Check Vercel dashboard for deployment status
- Clear browser cache if needed
