# 🚀 Deployment Guide

## Production Deployment Options

### Option 1: Heroku (Recommended for Demo)

#### Backend Deployment
1. Create Heroku app:
```bash
heroku create your-book-review-api
```

2. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set NODE_ENV=production
```

3. Deploy:
```bash
git subtree push --prefix backend heroku main
```

#### Frontend Deployment
1. Update API URL in `frontend/src/api/bookApi.js`:
```javascript
const API_BASE_URL = 'https://your-book-review-api.herokuapp.com/api';
```

2. Deploy to Netlify or Vercel:
```bash
cd frontend
npm run build
# Upload dist folder to Netlify
```

### Option 2: AWS (Production Ready)

#### Backend (AWS Elastic Beanstalk)
1. Install EB CLI
2. Initialize and deploy:
```bash
cd backend
eb init
eb create production
eb deploy
```

#### Frontend (AWS S3 + CloudFront)
1. Build the app:
```bash
cd frontend
npm run build
```

2. Upload to S3 and configure CloudFront

### Option 3: Docker (Any Platform)

#### Create Dockerfiles

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 5000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/bookreviews
      - NODE_ENV=production
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Frontend
Update `API_BASE_URL` in `src/api/bookApi.js` to your deployed backend URL.

## Pre-deployment Checklist

- [ ] MongoDB Atlas database created and configured
- [ ] Environment variables set correctly
- [ ] API endpoints tested
- [ ] Frontend builds successfully
- [ ] CORS configured for production domain
- [ ] Error handling tested
- [ ] Database seeded with sample data

## Monitoring & Maintenance

1. **Health Checks**: Use `/health` endpoint
2. **Logging**: Implement proper logging in production
3. **Database Backups**: Set up automated MongoDB backups
4. **SSL Certificates**: Ensure HTTPS is configured
5. **Performance Monitoring**: Use tools like New Relic or DataDog

## Scaling Considerations

1. **Database**: Use MongoDB Atlas for automatic scaling
2. **Backend**: Implement horizontal scaling with load balancers
3. **Frontend**: Use CDN for static asset delivery
4. **Caching**: Implement Redis for frequently accessed data