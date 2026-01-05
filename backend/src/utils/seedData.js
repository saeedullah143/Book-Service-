const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Book');
const Review = require('../models/Review');

dotenv.config();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    publishedYear: 1925
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    publishedYear: 1960
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
    publishedYear: 1949
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    publishedYear: 1813
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A controversial novel about teenage rebellion and alienation in post-war America.",
    publishedYear: 1951
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert books
    const books = await Book.insertMany(sampleBooks);
    console.log('📚 Books inserted');

    // Add sample reviews
    const reviews = [
      {
        book: books[0]._id,
        reviewerName: "Alice Johnson",
        rating: 5,
        comment: "A masterpiece! Fitzgerald's writing is absolutely beautiful and the story is timeless."
      },
      {
        book: books[0]._id,
        reviewerName: "Bob Smith",
        rating: 4,
        comment: "Great read, highly recommend. The symbolism is incredible."
      },
      {
        book: books[1]._id,
        reviewerName: "Carol White",
        rating: 5,
        comment: "Powerful and moving story that everyone should read. Changed my perspective."
      },
      {
        book: books[1]._id,
        reviewerName: "David Brown",
        rating: 5,
        comment: "An important book that deals with serious themes in an accessible way."
      },
      {
        book: books[2]._id,
        reviewerName: "Emma Davis",
        rating: 4,
        comment: "Scary how relevant this book still is today. Orwell was ahead of his time."
      },
      {
        book: books[3]._id,
        reviewerName: "Frank Wilson",
        rating: 4,
        comment: "Witty and charming. Austen's character development is superb."
      }
    ];

    await Review.insertMany(reviews);
    console.log('⭐ Reviews inserted');

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Created ${books.length} books and ${reviews.length} reviews`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();