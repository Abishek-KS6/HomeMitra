# 🚀 Separate Deployment Guide

## Backend Only (Render)

### Render Settings:
- **Repository**: Your GitHub repo
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node.js

### Environment Variables:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://agentabi07_db_user:Jai29Abi@cluster0.q6djm88.mongodb.net/homemitra?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-32-chars-long
```

## Frontend Only (Vercel)

### Vercel Settings:
- **Repository**: Your GitHub repo  
- **Root Directory**: `client`
- **Framework**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Update API URL

After backend deployment, update:
`client/src/config/api.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-actual-render-url.onrender.com';
```