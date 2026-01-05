# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- MongoDB Atlas database
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Deploy Backend

1. **Push your code to Git repository**
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

2. **Deploy Backend on Vercel**
- Go to [vercel.com](https://vercel.com) and sign in
- Click "New Project"
- Import your repository
- Set **Root Directory** to `backend`
- Add Environment Variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `NODE_ENV`: `production`
- Click "Deploy"

3. **Note your backend URL** (e.g., `https://your-backend.vercel.app`)

## Step 2: Deploy Frontend

1. **Create frontend environment file**
```bash
cd frontend
cp .env.example .env
```

2. **Update .env with your backend URL**
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

3. **Deploy Frontend on Vercel**
- Click "New Project" again
- Import the same repository
- Set **Root Directory** to `frontend`
- Add Environment Variables:
  - `VITE_API_URL`: `https://your-backend.vercel.app/api`
- Click "Deploy"

## Step 3: Configure Custom Domains (Optional)

1. **Backend Domain**
- Go to your backend project settings
- Add custom domain (e.g., `api.yourdomain.com`)

2. **Frontend Domain**
- Go to your frontend project settings
- Add custom domain (e.g., `yourdomain.com`)

3. **Update Frontend Environment**
- Update `VITE_API_URL` to use your custom backend domain
- Redeploy frontend

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookreviews
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

## Automatic Deployments

Vercel automatically deploys when you push to your main branch:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

## Troubleshooting

### Backend Issues
- Check Vercel function logs
- Verify MongoDB connection string
- Ensure all dependencies are in package.json

### Frontend Issues
- Check browser console for API errors
- Verify VITE_API_URL is correct
- Test API endpoints directly

### CORS Issues
Your backend already has CORS enabled, but if you face issues:
```javascript
// In backend/src/app.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## Production URLs
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **API Health**: `https://your-backend.vercel.app/health`

## Commands Summary

```bash
# Deploy backend
cd backend
git add .
git commit -m "Deploy backend"
git push origin main

# Deploy frontend
cd frontend
echo "VITE_API_URL=https://your-backend.vercel.app/api" > .env
git add .
git commit -m "Deploy frontend"
git push origin main
```

## 🎉 Success!
Your book review service is now live on Vercel with automatic deployments!