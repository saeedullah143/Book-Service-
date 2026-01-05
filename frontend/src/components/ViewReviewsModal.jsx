import React, { useState, useEffect } from 'react';
import { getReviewsByBook, getBookById } from '../api/bookApi';
import './ReviewModal.css';

const ViewReviewsModal = ({ bookId, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reviewsResponse, bookResponse] = await Promise.all([
          getReviewsByBook(bookId),
          getBookById(bookId)
        ]);
        setReviews(reviewsResponse.data.data);
        setBook(bookResponse.data.data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>All Reviews</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {loading && (
          <div className="review-form" style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
            <p>Loading reviews...</p>
          </div>
        )}

        {error && (
          <div className="review-form" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#d32f2f' }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="review-form">
            {book && (
              <div style={{ marginBottom: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1a1a1a' }}>{book.title}</h3>
                <p style={{ margin: '0', color: '#666', fontStyle: 'italic' }}>by {book.author}</p>
                {book.avgRating > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="stars">
                      {renderStars(Math.round(book.avgRating))}
                    </div>
                    <span style={{ fontWeight: '600' }}>{book.avgRating}/5</span>
                    <span style={{ color: '#666' }}>({book.reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            )}

            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>📭 No reviews yet</p>
                <p style={{ color: '#666' }}>Be the first to review this book!</p>
              </div>
            ) : (
              <div>
                <h4 style={{ marginBottom: '16px', color: '#1a1a1a' }}>
                  {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
                </h4>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {reviews.map((review) => (
                    <div key={review._id} style={{ 
                      padding: '16px', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '8px', 
                      marginBottom: '12px',
                      background: 'white'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="stars">
                            {renderStars(review.rating)}
                          </div>
                          <span style={{ fontWeight: '600' }}>{review.rating}/5</span>
                        </div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 8px 0', lineHeight: '1.5' }}>{review.comment}</p>
                      <p style={{ margin: '0', color: '#666', fontSize: '0.875rem', fontWeight: '500' }}>
                        - {review.reviewerName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReviewsModal;