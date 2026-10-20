# 📧 Formspree Setup Guide - 5 Minutes to Working Forms

## ✅ What I've Already Done:

I've updated both forms to use Formspree:
- ✅ Booking form now uses Formspree
- ✅ Contact form now uses Formspree
- ✅ Removed backend API JavaScript
- ✅ No database needed
- ✅ Forms will send emails directly

## 🚀 Step-by-Step: Set Up Formspree (5 Minutes)

### Step 1: Create Formspree Account
1. Go to: https://formspree.io
2. Click **"Sign Up"** (top right)
3. Sign up with your email or Google account
4. Verify your email if needed

### Step 2: Create Booking Form
1. After logging in, click **"New Form"** button
2. **Form Name**: Enter "Achu Bridal Booking"
3. **Email**: Enter your email (e.g., contact@achubridalstudio.com)
4. Click **"Create Form"**

### Step 3: Get Your Form URL
Formspree will show you a URL like:
```
https://formspree.io/f/xabc123def
```

**Copy this URL!** (You'll need it)

### Step 4: Update Booking Form in index.html
1. Open `index.html` in a text editor
2. Go to line 246 (the booking form)
3. Find: `action="https://formspree.io/f/YOUR_FORMSPREE_ID"`
4. Replace `YOUR_FORMSPREE_ID` with your actual ID from Step 3

**Example:**
- Before: `action="https://formspree.io/f/YOUR_FORMSPREE_ID"`
- After: `action="https://formspree.io/f/xabc123def"`

### Step 5: Create Contact Form (Optional - Same Process)
1. In Formspree, click **"New Form"** again
2. **Form Name**: Enter "Achu Bridal Contact"
3. **Email**: Same email as before
4. Click **"Create Form"**
5. Copy the new URL
6. Update line 291 in index.html (contact form)

### Step 6: Test the Forms
1. Open `index.html` in your browser
2. Go to Booking section
3. Fill in the form and submit
4. Check your email - you should receive the booking!

### Step 7: Deploy to Vercel
1. Push changes to GitHub
2. Vercel will auto-deploy
3. Forms will work on your live site!

## 📝 What to Update in index.html:

### Line 246 (Booking Form):
```html
<form class="form-box" action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Line 291 (Contact Form):
```html
<form class="form-box" action="https://formspree.io/f/YOUR_ID" method="POST">
```

Replace `YOUR_ID` with your actual Formspree form IDs.

## ✅ After Setup:

- ✅ Booking forms send to your email
- ✅ Contact forms send to your email
- ✅ No backend needed
- ✅ No database needed
- ✅ Works on Vercel immediately
- ✅ FREE (Formspree free tier: 50 submissions/month)

## 💡 Important Notes:

### Formspree Free Tier:
- 50 submissions per month
- Perfect for starting
- Can upgrade if needed

### Email Notifications:
- You'll receive every booking in your email
- Email includes all form fields
- Professional and reliable

### Spam Protection:
- Formspree has built-in spam protection
- No need to worry about spam submissions

## 🎯 Summary:

1. Create Formspree account (2 minutes)
2. Create forms (2 minutes)
3. Update form URLs in index.html (1 minute)
4. Test and deploy!

**Total time: 5 minutes!**

## 🆘 Need Help?

If you get stuck:
1. Share the Formspree URL you got
2. I'll help you update the code
3. Or share any error messages

Once you get your Formspree IDs, let me know and I'll update the code for you!
