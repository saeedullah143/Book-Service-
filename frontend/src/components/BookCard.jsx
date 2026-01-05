import React from 'react';
import { IoEyeSharp, IoCreateSharp } from 'react-icons/io5';
import './BookCard.css';

const BookCard = ({ book, onViewReviews, onAddReview }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="book-card">
      <div className="book-header">
        <h3 className="book-title">{book.title}</h3>
        <span className="book-year">{book.publishedYear}</span>
      </div>
      
      <p className="book-author">by {book.author}</p>
      <p className="book-description">{book.description}</p>

      <div className="book-rating">
        <div className="stars">
          {renderStars(book.avgRating || 0)}
        </div>
        <span className="rating-text">
          {book.avgRating > 0 ? `${book.avgRating} / 5` : 'No ratings yet'}
        </span>
        <span className="review-count">({book.reviewCount || 0} reviews)</span>
      </div>

      {book.latestReview && (
        <div className="latest-review">
          <p className="review-label">Latest Review:</p>
          <p className="review-comment">"{book.latestReview.comment}"</p>
          <p className="review-meta">
            - {book.latestReview.reviewerName} 
            ({new Date(book.latestReview.createdAt).toLocaleDateString()})
          </p>
        </div>
      )}

      <div className="book-actions">
        <button 
          className="btn btn-secondary" 
          onClick={() => onViewReviews(book._id)}
        >
          <IoEyeSharp /> View Reviews
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => onAddReview(book._id)}
        >
          <IoCreateSharp /> Add Review
        </button>
      </div>
    </div>
  );
};

export default BookCard;