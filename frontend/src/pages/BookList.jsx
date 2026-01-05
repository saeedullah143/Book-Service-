import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../api/bookApi';
import { addReview, createBook } from '../api/bookApi';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import ReviewModal from '../components/ReviewModal';
import AddBookModal from '../components/AddBookModal';
import ViewReviewsModal from '../components/ViewReviewsModal';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { IoBookSharp } from 'react-icons/io5';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedBookForReviews, setSelectedBookForReviews] = useState(null);
  const [toast, setToast] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0
  });

  const fetchBooks = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = { 
        page: Number(page), 
        limit: 6 
      };
      if (searchTerm) params.search = searchTerm;
      if (sortOption) params.sort = sortOption;

      const response = await getAllBooks(params);
      setBooks(response.data.data);
      setPagination({
        currentPage: response.data.currentPage || Number(page),
        totalPages: response.data.totalPages || 1,
        totalBooks: response.data.totalBooks || 0
      });
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      fetchBooks(1);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, sortOption]);

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: Number(page) }));
    fetchBooks(Number(page));
  };

  const handleAddReview = async (bookId, reviewData) => {
    try {
      setIsSubmitting(true);
      await addReview(bookId, reviewData);
      setSelectedBookId(null);
      fetchBooks(pagination.currentPage);
      setToast({ message: 'Review added successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to add review. Please try again.', type: 'error' });
      console.error('Error adding review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      setIsSubmitting(true);
      await createBook(bookData);
      setShowAddBookModal(false);
      fetchBooks(1);
      setToast({ message: 'Book added successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to add book. Please try again.', type: 'error' });
      console.error('Error adding book:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewReviews = (bookId) => {
    setSelectedBookForReviews(bookId);
  };

  const totalReviews = books.reduce((sum, book) => sum + (book.reviewCount || 0), 0);
  const avgRating = books.length > 0 ? Math.round(books.reduce((sum, book) => sum + (book.avgRating || 0), 0) / books.length * 10) / 10 : 0;

  return (
    <div className="book-list-container">
      <header className="page-header">
        <h1>📚 Book Review Service</h1>
        <p>Discover, review, and share amazing books with the community</p>
        <button 
          className="add-book-btn"
          onClick={() => setShowAddBookModal(true)}
        >
          <IoBookSharp /> Add New Book
        </button>
      </header>

      <div className="search-section">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      {!loading && !error && books.length > 0 && (
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{pagination.totalBooks || books.length}</span>
            <span className="stat-label">Total Books</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalReviews}</span>
            <span className="stat-label">Total Reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{avgRating}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
          {pagination.totalPages > 1 && (
            <div className="stat-item">
              <span className="stat-number">{pagination.currentPage}/{pagination.totalPages}</span>
              <span className="stat-label">Pages</span>
            </div>
          )}
        </div>
      )}

      {loading && (
        <LoadingSpinner message="Loading your book collection..." />
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => fetchBooks(1)} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No books found</h3>
          {searchTerm ? (
            <>
              <p>No books match your search for "{searchTerm}". Try a different search term or add a new book.</p>
              <div className="empty-actions">
                <button onClick={() => setSearchTerm('')} className="btn btn-secondary">
                  Clear Search
                </button>
                <button onClick={() => setShowAddBookModal(true)} className="btn btn-primary">
                  Add New Book
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Start building your amazing book collection! Add your first book and begin sharing reviews.</p>
              <button onClick={() => setShowAddBookModal(true)} className="btn btn-primary btn-large">
                <IoBookSharp /> Add Your First Book
              </button>
            </>
          )}
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <div className="content-section">
            <div className="book-grid">
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onViewReviews={handleViewReviews}
                  onAddReview={setSelectedBookId}
                />
              ))}
            </div>
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {selectedBookId && (
        <ReviewModal
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
          onSubmit={handleAddReview}
          isLoading={isSubmitting}
        />
      )}

      {showAddBookModal && (
        <AddBookModal
          onClose={() => setShowAddBookModal(false)}
          onSubmit={handleAddBook}
          isLoading={isSubmitting}
        />
      )}

      {selectedBookForReviews && (
        <ViewReviewsModal
          bookId={selectedBookForReviews}
          onClose={() => setSelectedBookForReviews(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default BookList;