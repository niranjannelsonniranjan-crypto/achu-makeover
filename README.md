# Achu Bridal Studio

Luxury Bridal Makeup Studio in Trichy, Tamil Nadu.

## 🚀 Deployment on Vercel

### Prerequisites
1. MongoDB Atlas account (free tier available)
2. Vercel account
3. Git repository connected to Vercel

### Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/achu-bridal?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### MongoDB Setup
1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist IP `0.0.0.0/0` (allows all IPs for Vercel)
5. Get your connection string and replace in MONGO_URI

### Email Setup (Optional)
For booking notifications:
1. Create a Gmail account
2. Enable 2-factor authentication
3. Generate an App Password
4. Use the app password in EMAIL_PASS

### Deployment Steps
1. Push this code to your Git repository
2. Import the repository in Vercel
3. Add environment variables
4. Deploy!

### Admin Credentials
Default admin login (you can change in seedServices.js):
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
├── package.json           # Root package.json for Vercel
└── vercel.json           # Vercel configuration
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
