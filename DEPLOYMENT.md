# StudyBuddy Deployment Guide

## 🚀 Quick Deployment Steps

### Backend (Railway)
1. Go to https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub repo
4. Select: ByteNotes repository
5. Set Environment Variables:
   - PORT: 5000
   - JWT_SECRET: hackathon_secret_key_2024_secure
   - HF_TOKEN: your_hugging_face_token_here
   - NODE_ENV: production
6. Deploy

### Frontend (Vercel)
1. Go to https://vercel.com
2. Login with GitHub
3. New Project → Import ByteNotes repository
4. Settings:
   - Framework: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
5. Deploy

### Update API URL
After Railway deployment, copy your backend URL and update:
`frontend/services/api.ts` line 3 with your Railway URL

### Test Your App
1. Backend: https://your-app.up.railway.app
2. Frontend: https://your-app.vercel.app

## 🎯 Ready for Demo!

Your StudyBuddy app will be live and ready for your hackathon presentation!
