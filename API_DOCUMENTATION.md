# 📡 API Documentation - Complete Reference

## 🚀 Base URL
```
http://localhost:5000/api
```

## 📚 Books Endpoints

### 1. Create Book
**POST** `/books`

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald", 
  "description": "A classic American novel about the Jazz Age",
  "publishedYear": 1925
}
```

**Response (201):**
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

### 2. Get All Books
**GET** `/books`

**Query Parameters:**
- `search` - Search by title or author
- `sort` - Sort options: `rating`, `newest`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Examples:**
```bash
GET /books
GET /books?search=gatsby
GET /books?sort=rating
GET /books?sort=newest
GET /books?page=2&limit=5
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "totalBooks": 25,
  "totalPages": 3,
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

### 3. Get Single Book
**GET** `/books/:id`

**Response (200):**
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

## ⭐ Reviews Endpoints

### 1. Add Review
**POST** `/books/:bookId/reviews`

**Request Body:**
```json
{
  "reviewerName": "John Doe",
  "rating": 5,
  "comment": "Excellent book! Highly recommend."
}
```

**Response (201):**
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

### 2. Get Book Reviews
**GET** `/books/:bookId/reviews`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60f7b4b4b4b4b4b4b4b4b4b4",
      "reviewerName": "John Doe", 
      "rating": 5,
      "comment": "Excellent book! Highly recommend.",
      "createdAt": "2024-01-05T20:35:00.000Z"
    },
    {
      "_id": "60f7b5b5b5b5b5b5b5b5b5b5",
      "reviewerName": "Jane Smith",
      "rating": 4,
      "comment": "Great read, very engaging.",
      "createdAt": "2024-01-05T20:30:00.000Z"
    }
  ]
}
```

## 🚨 Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "All fields are required"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Book not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 🧪 Testing Examples

### Using curl
```bash
# Create a book
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author", 
    "description": "A test book",
    "publishedYear": 2024
  }'

# Get all books
curl http://localhost:5000/api/books

# Search books
curl "http://localhost:5000/api/books?search=test"

# Sort by rating
curl "http://localhost:5000/api/books?sort=rating"

# Add review
curl -X POST http://localhost:5000/api/books/BOOK_ID/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "reviewerName": "Test User",
    "rating": 5,
    "comment": "Great book!"
  }'
```

### Using JavaScript/Axios
```javascript
// Create book
const book = await axios.post('/api/books', {
  title: 'New Book',
  author: 'Author Name',
  description: 'Book description',
  publishedYear: 2024
});

// Get books with search
const books = await axios.get('/api/books?search=gatsby&sort=rating');

// Add review
const review = await axios.post(`/api/books/${bookId}/reviews`, {
  reviewerName: 'User Name',
  rating: 5,
  comment: 'Amazing book!'
});
```

## 🔍 Advanced Features

### Search Capabilities
- **Title Search**: Partial matches, case-insensitive
- **Author Search**: Partial matches, case-insensitive
- **Combined Search**: Searches both title and author

### Sorting Options
- **Default**: Newest books first
- **Rating**: Highest average rating first
- **Newest Review**: Books with most recent reviews first

### Performance Features
- **MongoDB Indexes**: Optimized for search and queries
- **Aggregation Pipeline**: Efficient data retrieval
- **Pagination**: Handles large datasets efficiently