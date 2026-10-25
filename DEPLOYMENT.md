# Deployment Guide - Achu Bridal Studio

This guide explains how to deploy the Achu Bridal Studio project:
- **Frontend**: Vercel (static site)
- **Backend**: Render (Node.js/Express with MongoDB Atlas)

---

## Prerequisites

1. GitHub account with your code pushed
2. MongoDB Atlas account (free tier)
3. Render account (free tier)
4. Vercel account (free tier)

---

## Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/achu-bridal.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up (free)
3. Connect your GitHub account

### 2.2 Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `achu-bridal-backend` (or any name you prefer)
- **Region**: Singapore (closest to India) or Oregon
- **Branch**: `main`

**Build & Deploy:**
- **Runtime**: Node
- **Build Command**: `cd backend/server && npm install`
- **Start Command**: `cd backend/server && node server.js`

**Advanced Settings:**
- **Environment Variables** (click **Advanced** → **Add Environment Variable**):

```
MONGO_URI=mongodb+srv://Niranjan:Nir%40nj%40n%23007@cluster0.xqslfgd.mongodb.net/achu_bridal?retryWrites=true&w=majority
JWT_SECRET=achu-bridal-secret-key-2024-secure
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
```

### 2.3 Deploy
1. Click **Create Web Service**
2. Wait for deployment (2-3 minutes)
3. Once deployed, copy your backend URL:
   - Example: `https://achu-bridal-backend.onrender.com`

### 2.4 Test Backend
Visit: `https://your-backend-url.onrender.com/`
You should see: `{"success":true,"message":"Achu Bridal Studio API is running"...}`

---

## Step 3: Update Frontend API URL

### 3.1 Update frontend/index.html
Replace line 335:
```javascript
const PROD_API = "https://your-backend.onrender.com/api";
```
With your actual Render backend URL.

### 3.2 Update frontend/admin.html
Replace line 186:
```javascript
const PROD_API = "https://your-backend.onrender.com/api";
```
With your actual Render backend URL.

### 3.3 Commit and Push Changes
```bash
git add frontend/index.html frontend/admin.html
git commit -m "Update production API URL"
git push
```

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up (free)
3. Connect your GitHub account

### 4.2 Import Project
1. Click **Add New** → **Project**
2. Select your GitHub repository
3. Configure:

**Framework Preset**: Other
**Root Directory**: `./`
**Build Command**: (leave empty)
**Output Directory**: `frontend`

### 4.3 Environment Variables (Optional)
Not needed for frontend-only deployment.

### 4.4 Deploy
1. Click **Deploy**
2. Wait for deployment (1-2 minutes)
3. Copy your frontend URL:
   - Example: `https://achu-bridal.vercel.app`

---

## Step 5: Verify Deployment

### Test Frontend
1. Open your Vercel frontend URL
2. Try submitting a booking form
3. Check if data appears in MongoDB Atlas

### Test Admin Panel
1. Open: `https://your-frontend-url.vercel.app/admin.html`
2. Login with:
   - Email: `admin@achubridal.com`
   - Password: `Admin@12345`
3. Check if you can view bookings

---

## MongoDB Atlas Network Access

Make sure your MongoDB Atlas allows connections from anywhere:

1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Click **Confirm**

---

## Troubleshooting

### Backend fails to start on Render
- Check build logs in Render dashboard
- Verify environment variables are set correctly
- Ensure MONGO_URI has URL-encoded special characters

### Frontend can't connect to backend
- Verify PROD_API URL is correct in frontend files
- Check browser console for CORS errors
- Ensure backend is running on Render

### MongoDB connection errors
- Verify MONGO_URI format
- Check MongoDB Atlas cluster status
- Ensure IP whitelist allows all IPs (0.0.0.0/0)

---

## Cost Summary

- **Render (Backend)**: FREE (Web Service free tier)
- **Vercel (Frontend)**: FREE (Hobby plan)
- **MongoDB Atlas**: FREE (M0 cluster)
- **Total**: $0/month

---

## Architecture

```
User Browser
    ↓
Vercel (Frontend - Static HTML/JS)
    ↓ (API calls)
Render (Backend - Node.js/Express)
    ↓
MongoDB Atlas (Database)
```

---

## URLs After Deployment

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Admin Panel**: `https://your-project.vercel.app/admin.html`
- **API Health**: `https://your-backend.onrender.com/`
- **API Bookings**: `https://your-backend.onrender.com/api/bookings`
