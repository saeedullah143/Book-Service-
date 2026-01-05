const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;

    // Validation
    if (!title || !author || !description || !publishedYear) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      publishedYear
    });

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all books with aggregated data
exports.getAllBooks = async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 10 } = req.query;

    // Build match stage for search
    let matchStage = {};
    if (search) {
      matchStage = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Build sort stage
    let sortStage = { createdAt: -1 }; // Default: newest books first
    
    if (sort === 'rating') {
      sortStage = { avgRating: -1, createdAt: -1 };
    } else if (sort === 'newest') {
      sortStage = { latestReviewDate: -1, createdAt: -1 };
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const books = await Book.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book',
          as: 'reviewsData'
        }
      },
      {
        $addFields: {
          avgRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviewsData' }, 0] },
              then: { $avg: '$reviewsData.rating' },
              else: 0
            }
          },
          reviewCount: { $size: '$reviewsData' },
          latestReview: {
            $cond: {
              if: { $gt: [{ $size: '$reviewsData' }, 0] },
              then: {
                $arrayElemAt: [
                  {
                    $sortArray: {
                      input: '$reviewsData',
                      sortBy: { createdAt: -1 }
                    }
                  },
                  0
                ]
              },
              else: null
            }
          },
          latestReviewDate: {
            $cond: {
              if: { $gt: [{ $size: '$reviewsData' }, 0] },
              then: { $max: '$reviewsData.createdAt' },
              else: null
            }
          }
        }
      },
      {
        $project: {
          title: 1,
          author: 1,
          description: 1,
          publishedYear: 1,
          avgRating: { $round: ['$avgRating', 1] },
          reviewCount: 1,
          latestReview: {
            $cond: {
              if: '$latestReview',
              then: {
                reviewerName: '$latestReview.reviewerName',
                comment: '$latestReview.comment',
                rating: '$latestReview.rating',
                createdAt: '$latestReview.createdAt'
              },
              else: null
            }
          },
          createdAt: 1
        }
      },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limitNum }
    ]);

    // Get total count for pagination
    const totalBooks = await Book.countDocuments(matchStage);
    const totalPages = Math.ceil(totalBooks / limitNum);

    res.status(200).json({
      success: true,
      count: books.length,
      totalBooks,
      totalPages,
      currentPage: pageNum,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }

    const book = await Book.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book',
          as: 'reviewsData'
        }
      },
      {
        $addFields: {
          avgRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviewsData' }, 0] },
              then: { $avg: '$reviewsData.rating' },
              else: 0
            }
          },
          reviewCount: { $size: '$reviewsData' }
        }
      },
      {
        $project: {
          title: 1,
          author: 1,
          description: 1,
          publishedYear: 1,
          avgRating: { $round: ['$avgRating', 1] },
          reviewCount: 1,
          createdAt: 1
        }
      }
    ]);

    if (!book || book.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};