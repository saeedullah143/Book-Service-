const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Review must belong to a book']
  },
  reviewerName: {
    type: String,
    required: [true, 'Reviewer name is required'],
    trim: true,
    maxlength: [50, 'Reviewer name cannot exceed 50 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [3, 'Comment must be at least 3 characters'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Index for querying reviews by book
reviewSchema.index({ book: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);