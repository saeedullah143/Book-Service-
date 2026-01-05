# 🚀 Backend Deployment on Vercel - Complete Guide

## 📁 Current Project Structure
```
backend/
├── api/
│   └── index.js          # Vercel serverless function entry point
├── src/
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Error handling
│   ├── utils/           # Helper functions
│   ├── app.js           # Express app with serverless DB connection
│   └── server.js        # Local development server
├── .env                 # Environment variables
├── index.js             # Alternative entry point
├── package.json         # Dependencies and scripts
└── vercel.json          # Vercel configuration
```

## 🔧 Key Files Configuration

### 1. `vercel.json` - Vercel Configuration
```json
{
  "functions": {
    "api/index.js": {
      "maxDuration": 10
    }
  }
}
```

### 2. `api/index.js` - Serverless Function Entry Point
```javascript
const app = require('../src/app');
module.exports = app;
```

### 3. `src/app.js` - Express App with Serverless DB Connection
```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/book.routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

// Database connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database on each request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api', bookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;
```

### 4. `package.json` - Dependencies
```json
{
  "name": "book-review-backend",
  "version": "1.0.0",
  "description": "Backend for Book Review Service",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## 🌐 Deployment Steps

### Step 1: Prepare Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare backend for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your repository
4. **Set Root Directory to `backend`**
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
6. Click "Deploy"

### Step 3: Environment Variables Setup
In Vercel dashboard → Project Settings → Environment Variables:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/bookreviews
NODE_ENV = production
```

## 🔗 API Endpoints After Deployment

Base URL: `https://your-backend.vercel.app`

### Available Routes:
- **Health Check**: `GET /health`
- **Books**:
  - `POST /api/books` - Create book
  - `GET /api/books` - Get all books (with pagination, search, sort)
  - `GET /api/books/:id` - Get single book
- **Reviews**:
  - `POST /api/books/:bookId/reviews` - Add review
  - `GET /api/books/:bookId/reviews` - Get book reviews

## 🧪 Testing Deployment

### 1. Health Check
```bash
curl https://your-backend.vercel.app/health
```
Expected Response:
```json
{"status":"OK","message":"Server is running"}
```

### 2. Test API Endpoints
```bash
# Get all books
curl https://your-backend.vercel.app/api/books

# Create a book
curl -X POST https://your-backend.vercel.app/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author","description":"Test Description","publishedYear":2024}'
```

## 🔧 Key Differences: Local vs Serverless

### Local Development (`src/server.js`)
- Persistent server process
- Single database connection
- Uses `app.listen()`

### Serverless (`api/index.js` + `src/app.js`)
- Function-based execution
- Database connection per request
- Exports Express app directly

## 🚨 Common Issues & Solutions

### Issue 1: 404 Route Not Found
**Cause**: Incorrect Vercel configuration
**Solution**: Ensure `vercel.json` points to `api/index.js`

### Issue 2: Database Connection Errors
**Cause**: MongoDB URI not set or incorrect
**Solution**: Verify `MONGODB_URI` in Vercel environment variables

### Issue 3: CORS Issues
**Cause**: Frontend domain not allowed
**Solution**: Update CORS configuration in `src/app.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue 4: Function Timeout
**Cause**: Long-running operations
**Solution**: Increase timeout in `vercel.json`:
```json
{
  "functions": {
    "api/index.js": {
      "maxDuration": 30
    }
  }
}
```

## 📊 Monitoring & Debugging

### View Logs
1. Go to Vercel dashboard
2. Select your project
3. Click "Functions" tab
4. View real-time logs

### Debug API Issues
```bash
# Check if API is responding
curl -I https://your-backend.vercel.app/health

# Test with verbose output
curl -v https://your-backend.vercel.app/api/books
```

## 🔄 Automatic Deployments

Every push to main branch triggers automatic deployment:
```bash
git add .
git commit -m "Update backend feature"
git push origin main
```

## 📈 Production Checklist

- ✅ Environment variables set in Vercel
- ✅ MongoDB Atlas database accessible
- ✅ CORS configured for frontend domain
- ✅ Health endpoint responding
- ✅ API endpoints working
- ✅ Error handling implemented
- ✅ Database connection optimized for serverless

## 🎯 Final URLs

After successful deployment:
- **Backend**: `https://your-backend.vercel.app`
- **Health Check**: `https://your-backend.vercel.app/health`
- **API Base**: `https://your-backend.vercel.app/api`

Your backend is now ready for production use with automatic scaling and global CDN distribution!