import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Books
export const getAllBooks = (params = {}) => {
  return api.get('/books', { params });
};

export const getBookById = (id) => {
  return api.get(`/books/${id}`);
};

export const createBook = (bookData) => {
  return api.post('/books', bookData);
};

// Reviews
export const getReviewsByBook = (bookId) => {
  return api.get(`/books/${bookId}/reviews`);
};

export const addReview = (bookId, reviewData) => {
  return api.post(`/books/${bookId}/reviews`, reviewData);
};

export default api;