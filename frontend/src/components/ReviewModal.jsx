import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ bookId, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    reviewerName: '',
    rating: 5,
    comment: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.reviewerName.trim()) {
      newErrors.reviewerName = 'Name is required';
    } else if (formData.reviewerName.trim().length < 2) {
      newErrors.reviewerName = 'Name must be at least 2 characters';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    } else if (formData.comment.trim().length < 3) {
      newErrors.comment = 'Comment must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(bookId, {
        reviewerName: formData.reviewerName.trim(),
        rating: formData.rating,
        comment: formData.comment.trim()
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Your Review</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="reviewerName">Your Name *</label>
            <input
              type="text"
              id="reviewerName"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.reviewerName ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.reviewerName && (
              <span className="error-message">{errors.reviewerName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating *</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="star-label">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={() => setFormData(prev => ({ ...prev, rating: star }))}
                    disabled={isLoading}
                  />
                  <span className={`star ${formData.rating >= star ? 'selected' : ''}`}>
                    ★
                  </span>
                </label>
              ))}
              <span className="rating-text">{formData.rating} / 5</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your thoughts about this book..."
              rows="5"
              className={errors.comment ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.comment && (
              <span className="error-message">{errors.comment}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;