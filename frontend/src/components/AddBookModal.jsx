import React, { useState } from 'react';
import YearDropdown from './YearDropdown';
import './ReviewModal.css'; // Reusing the same styles

const AddBookModal = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: new Date().getFullYear()
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.publishedYear || formData.publishedYear < 1900 || formData.publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Please select a valid publication year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        publishedYear: parseInt(formData.publishedYear)
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          <h2>Add New Book</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Book Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className={errors.title ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={errors.author ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.author && (
                <span className="error-message">{errors.author}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="publishedYear">Publication Year *</label>
            <YearDropdown
              value={formData.publishedYear}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.publishedYear ? 'error' : ''}
            />
            {errors.publishedYear && (
              <span className="error-message">{errors.publishedYear}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description..."
              rows="4"
              className={errors.description ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
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
              {isLoading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;