const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Book');
const Review = require('../models/Review');

dotenv.config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear all data
    await Book.deleteMany({});
    await Review.deleteMany({});
    
    console.log('🗑️ All books and reviews cleared from database');
    console.log('✨ Database is now clean and ready for fresh data');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();