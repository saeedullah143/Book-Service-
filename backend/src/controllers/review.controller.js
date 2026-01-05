const Review = require('../models/Review');
const Book = require('../models/Book');
const mongoose = require('mongoose');

// Add a review to a book
exports.addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { reviewerName, rating, comment } = req.body;

    // Validate book ID
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Validate required fields
    if (!reviewerName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Reviewer name, rating, and comment are required'
      });
    }

    // Create review
    const review = await Review.create({
      book: bookId,
      reviewerName,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all reviews for a book
exports.getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Validate book ID
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Get reviews, sorted by newest first
    const reviews = await Review.find({ book: bookId })
      .sort({ createdAt: -1 })
      .select('reviewerName rating comment createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};