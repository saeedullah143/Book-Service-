
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const reviewController = require('../controllers/review.controller');

// Book routes
router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

// Review routes
router.post('/books/:bookId/reviews', reviewController.addReview);
router.get('/books/:bookId/reviews', reviewController.getReviewsByBook);

module.exports = router;
