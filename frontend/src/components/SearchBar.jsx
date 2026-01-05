import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, sortOption, onSortChange }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-btn" 
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>

      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="">Sort by: Default</option>
        <option value="rating">Sort by: Highest Rating</option>
        <option value="newest">Sort by: Newest Review</option>
      </select>
    </div>
  );
};

export default SearchBar;