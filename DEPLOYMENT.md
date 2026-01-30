# 🚀 Deployment Guide

## Backend Deployment (Render)

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git remote add origin https://github.com/yourusername/homemitra.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: homemitra-backend
   - **Root Directory**: server
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Environment**: Node

### 3. Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://agentabi07_db_user:Jai29Abi@cluster0.q6djm88.mongodb.net/homemitra?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Get Backend URL
Copy your Render URL: `https://homemitra-backend-xxxx.onrender.com`

---

## Frontend Deployment (Vercel)

### 1. Update API Configuration
Replace `your-render-backend-url` in:
- `client/src/config/api.js`
- `vercel.json`

With your actual Render URL.

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: client
   - **Build Command**: npm run build
   - **Output Directory**: build

### 3. Deploy
Click "Deploy" and wait for completion.

---

## 🔧 Quick Setup Commands

```bash
# 1. Install dependencies
npm run install-all

# 2. Update API URLs with your Render backend URL
# Edit: client/src/config/api.js
# Edit: vercel.json

# 3. Commit changes
git add .
git commit -m "Update API URLs for production"
git push

# 4. Deploy backend to Render (via dashboard)
# 5. Deploy frontend to Vercel (via dashboard)
```

## 📱 Access Your App
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Admin Panel**: https://your-app.vercel.app/admin

## 🔑 Admin Credentials
- Email: admin@homemitra.com
- Password: admin123