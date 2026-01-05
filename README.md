# 📚 Book Review Service

> A complete full-stack book review system built with Node.js, Express, MongoDB, and React. Professional-grade application demonstrating modern development practices with enterprise-level UI/UX.

## 🎨 Design System

- **Primary Color:** #0f3053 (Blue Zodiac)
- **Secondary Color:** #712674 (Eminence)
- **Modern UI:** Glassmorphism effects, gradients, and smooth animations
- **Responsive Design:** Mobile-first approach with professional styling

---

## 📁 Project Structure

```
book-review-service/
├── backend/              # Node.js REST API
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Error handling
│   │   └── utils/        # Helper functions
│   ├── .env             # Environment variables
│   └── package.json
├── frontend/            # React UI
│   ├── src/
│   │   ├── api/         # API calls
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Main pages
│   │   └── utils/       # Helper functions
│   └── package.json
├── screenshots/         # Application screenshots
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (free)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd book-review-service
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

4. **Seed Database (Optional)**
```bash
cd ../backend
node src/utils/seedData.js
```

5. **Start Backend**
```bash
npm run dev
```

6. **Start Frontend** (in new terminal)
```bash
cd ../frontend
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

### 🌐 Deploy to Vercel

For production deployment, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete setup guide.

## 📡 API Endpoints

### Books
- `POST /api/books` - Create a new book
- `GET /api/books` - Get all books (with pagination, search, and sort)
- `GET /api/books/:id` - Get single book by ID

### Reviews
- `POST /api/books/:bookId/reviews` - Add review to a book
- `GET /api/books/:bookId/reviews` - Get all reviews for a book

## 📝 API Examples

### Create a Book
```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel about the Jazz Age",
  "publishedYear": 1925
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel about the Jazz Age",
    "publishedYear": 1925,
    "createdAt": "2024-01-05T20:30:00.000Z",
    "updatedAt": "2024-01-05T20:30:00.000Z"
  }
}
```

### Get All Books (with Pagination)
```bash
GET /api/books
GET /api/books?search=gatsby
GET /api/books?sort=rating
GET /api/books?page=1&limit=6
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "totalBooks": 25,
  "totalPages": 5,
  "currentPage": 1,
  "data": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A classic American novel about the Jazz Age",
      "publishedYear": 1925,
      "avgRating": 4.5,
      "reviewCount": 2,
      "latestReview": {
        "reviewerName": "Alice Johnson",
        "comment": "A masterpiece! Fitzgerald's writing is beautiful.",
        "rating": 5,
        "createdAt": "2024-01-05T20:35:00.000Z"
      },
      "createdAt": "2024-01-05T20:30:00.000Z"
    }
  ]
}
```

### Get Single Book
```bash
GET /api/books/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel about the Jazz Age",
    "publishedYear": 1925,
    "avgRating": 4.5,
    "reviewCount": 2,
    "createdAt": "2024-01-05T20:30:00.000Z"
  }
}
```

### Add a Review
```bash
POST /api/books/:bookId/reviews
Content-Type: application/json

{
  "reviewerName": "John Doe",
  "rating": 5,
  "comment": "Excellent book! Highly recommend."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7b4b4b4b4b4b4b4b4b4b4",
    "book": "60f7b3b3b3b3b3b3b3b3b3b3",
    "reviewerName": "John Doe",
    "rating": 5,
    "comment": "Excellent book! Highly recommend.",
    "createdAt": "2024-01-05T20:35:00.000Z",
    "updatedAt": "2024-01-05T20:35:00.000Z"
  }
}
```

## 🧪 Testing the API

### Quick Test Script
```bash
cd backend
node quick-test.js
```

### Using curl

**Create a Book:**
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "publishedYear": 1925
  }'
```

**Get All Books with Pagination:**
```bash
curl "http://localhost:5000/api/books?page=1&limit=6"
```

**Search Books:**
```bash
curl "http://localhost:5000/api/books?search=gatsby"
```

**Sort by Rating:**
```bash
curl "http://localhost:5000/api/books?sort=rating"
```

## ✨ Key Features

### Backend
✅ **MongoDB Aggregation** - Efficient queries with rating calculations  
✅ **Pagination Support** - Page-based navigation with configurable limits  
✅ **Advanced Search** - Search by title and author with regex  
✅ **Multiple Sort Options** - Sort by rating, newest review, or creation date  
✅ **Input Validation** - Comprehensive error handling  
✅ **RESTful API Design** - Clean, consistent endpoints  
✅ **CORS Enabled** - Frontend integration ready  

### Frontend
✅ **Modern React Architecture** - Hooks, functional components  
✅ **Professional UI/UX** - Glassmorphism, gradients, animations  
✅ **React Icons Integration** - Consistent iconography  
✅ **Real-time Search** - Debounced search with instant results  
✅ **Advanced Pagination** - Smart page navigation with ellipsis  
✅ **Professional Loading States** - Custom spinner components  
✅ **Form Validation** - Real-time validation with error messages  
✅ **Responsive Design** - Mobile-first approach  
✅ **Toast Notifications** - Stylish success/error messages  
✅ **Modal System** - Professional modal dialogs  

### UI/UX Highlights
✅ **Two-Color Design System** - Blue Zodiac + Eminence  
✅ **Consistent Typography** - CSS custom properties for fonts  
✅ **Glassmorphism Effects** - Modern blur and transparency  
✅ **Smooth Animations** - Cubic-bezier transitions  
✅ **Professional Cards** - Hover effects and shadows  
✅ **Custom Components** - Year dropdown, pagination, spinners  

## 🏗️ Architecture Highlights

- **Separation of Concerns:** Controllers, routes, and models clearly separated
- **Scalable Structure:** Easy to add new features and endpoints
- **Error Handling:** Comprehensive error handling throughout the application
- **Clean Code:** Follows industry best practices and conventions
- **Professional UI:** Modern, responsive design with smooth interactions
- **Component Reusability:** Modular React components
- **State Management:** Efficient React hooks usage
- **API Integration:** Clean separation between frontend and backend

## 📸 Screenshots

### Main Features
- **Book Listing Page** - Professional grid layout with search and pagination
- **Add Book Modal** - Clean form with custom year dropdown
- **Add Review Modal** - Star rating system with validation
- **Toast Notifications** - Stylish success/error messages
- **Responsive Design** - Mobile and desktop views
- **Loading States** - Professional spinner animations

*Screenshots are available in the `/screenshots` folder*

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Build for Production
```bash
cd frontend
npm run build
```

## 📦 Dependencies

### Backend
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Icons** - Icon library
- **CSS Custom Properties** - Design system

## 🎯 Technical Achievements

This project demonstrates:
- **Full-stack Development** with modern technologies
- **Database Design** with proper relationships and aggregations
- **API Development** following REST principles
- **Frontend Development** with React best practices
- **Professional UI/UX Design** with modern aesthetics
- **Responsive Web Design** principles
- **Component Architecture** and reusability
- **State Management** with React hooks
- **Error Handling** and validation
- **Performance Optimization** techniques

## 📄 License

MIT License

---

**Built with ❤️ using modern web technologies**